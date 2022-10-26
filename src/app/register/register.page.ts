import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { userRegister } from '../akita/models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { InterfazService } from '../services/interfaz.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ElectronHelperService } from '../services/electron.service';
import { CreamedicRegisterRequest, CreamedicRegisterResponse, CreamedicService } from '../services/creamedic.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  data: userRegister = {
    email: "jose.juan.vega2@outlook.com",
    name: "jose",
    lastname: "vega",
    password: "1234567890",
    passwordConfirm: "1234567890",
    phone: "7711223322"
  };
  //data: userRegister = {
  //  email: "",
  //  name: "",
  //  lastname: "",
  //  password: "",
  //  passwordConfirm: "",
  //  phone: ""
  //};
  constructor(private modalController: ModalController,
    private interfazService: InterfazService,
    private auth: AuthenticationService,
    private iab: InAppBrowser,
    public electron: ElectronHelperService,
    private creamedicService: CreamedicService) { }

  ngOnInit() {
    // this.openPDF();
  }
  public openPDF() {
    let urlSite = "https://wallet.mifastpass.com.mx/AVISO-DE-PRIVACIDAD_FAST_PASS_2022.pdf";
    if (this.electron.isElectronApp()) {
      this.electron.OpenExternal(urlSite);
    } else {
      this.iab.create(urlSite, '_system', 'location=yes');
    }

  }
  CloseModal(return_) {
    this.modalController.dismiss(return_);
    // this.interfazService.dismissLoading();
  }
  get validaNombre() {
    return this.data.name != "" && !(/^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/).test(this.data.name)
  }
  get validaApellido() {
    return this.data.lastname != "" && !(/^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/).test(this.data.lastname)
  }
  get validaEmail() {
    return this.data.email != "" && !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(this.data.email)
  }
  get validaPassword() {
    return this.data.password != "" && this.data.password.length < 8;
  }
  get validaPassword2() {
    return this.data.passwordConfirm != "" && this.data.passwordConfirm != this.data.password;
  }
  RegisterCreamedic(): Promise<any> {
    return new Promise<any>((resolve, reject) => {

    })
  }
  Save(form) {
    if (this.validaEmail && this.validaPassword && this.validaNombre && this.validaPassword2) {
      return;
    }

    //console.log(this.data);
    // return
    this.interfazService.loader("Creando Cuenta").then(loader => {
      loader.present();
      let request: CreamedicRegisterRequest = {
        apellido: this.data.lastname,
        celular: this.data.phone,
        email: this.data.email,
        nombre: this.data.name,
        password: this.data.password
      }
      this.creamedicService.Register(request).pipe(first())
        .subscribe({
          next: (response: CreamedicRegisterResponse) => {
            this.auth.register(this.data)
            .pipe(first())
            .subscribe({
              next: (userInfo) => {
                //c console.log(userInfo);
                loader.dismiss();
                if (userInfo.result) {
                  this.interfazService.presentToast("Correo registrado, active su cuenta para continuar", "dark");
                  this.CloseModal(null);
                } else {
                  this.interfazService.presentToast(userInfo.message, "warning");
                }
              },
              error: error => {
                loader.dismiss();
               // let messageError = error.error.message ? error.error.message : "No es posible conectarse al servidor, intente de nuevo mas tarde";
               let messageError = "Problemas de sincronización, intente mas tarde";
                this.interfazService.presentToast(messageError, "error")
              }
            });
          },
          error: (err: any) => {
            console.log(err);
            
            loader.dismiss();
            let messageError = err.error.err.message ? err.error.err.message : "No es posible conectarse al servidor, intente de nuevo mas tarde";
            this.interfazService.presentToast(messageError, "error")
          }

        })
      
    });
  }

}
