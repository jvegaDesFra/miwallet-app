import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { userRegister } from '../akita/models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { InterfazService } from '../services/interfaz.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //data: userRegister = {
  //  email: "jose.juan.vega@outlook.com",
  //  name: "jose vega",
  //  password: "1234567",
  //  passwordConfirm: "1234567"
  //};
  data: userRegister = {
    email: "",
    name: "",
    password: "",
    passwordConfirm: ""
  };
  constructor(private modalController: ModalController,
    private interfazService: InterfazService,
    private auth: AuthenticationService,
    private iab: InAppBrowser) { }

  ngOnInit() {
   // this.openPDF();
  }
  public openPDF() {
    this.iab.create('https://wallet.mifastpass.com.mx/AVISO-DE-PRIVACIDAD_FAST_PASS_2022.pdf', '_system', 'location=yes');
  }
  CloseModal(return_) {
    this.modalController.dismiss(return_);
    // this.interfazService.dismissLoading();
  }
  get validaNombre(){
    return this.data.name != "" && !(/^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/).test(this.data.name)
  }
  get validaEmail(){
    return this.data.email != "" && !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(this.data.email)
  }
  get validaPassword(){
    return this.data.password != "" && this.data.password.length < 8;
  }
  get validaPassword2(){
    return this.data.passwordConfirm != "" && this.data.passwordConfirm != this.data.password;
  }
  Save(form) {
    if(this.validaEmail && this.validaPassword && this.validaNombre && this.validaPassword2){
      return;
    }

    //console.log(this.data);
    // return
    this.interfazService.loader("Creando Cuenta").then(loader => {
      loader.present();
      this.auth.register(this.data)
        .pipe(first())
        .subscribe({
          next: (userInfo) => {
            console.log(userInfo);
            loader.dismiss();
            if (userInfo.result) {
              this.interfazService.presentToast("Correo registrado, active su cuenta para continuar", "dark");
              this.CloseModal(null);
            } else {
              this.interfazService.presentToast(userInfo.message, "warning");

            }

          },
          error: error => {
            //console.log(error);

            loader.dismiss();
          }
        });
      // this.loading =loader;




    });
  }

}
