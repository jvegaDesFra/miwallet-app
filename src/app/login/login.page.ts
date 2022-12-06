import { Component, OnInit } from '@angular/core';
import { isPlatform, MenuController, ModalController, NavController, Platform } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { user, userRequest } from '../akita/models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { InterfazService } from '../services/interfaz.service';

import { RegisterPage } from "../register/register.page";
import { FoldersService } from '../akita/service/folders.service';
import { CategoriesServices } from '../modules/folders/categories.services';
import { RecoverPage } from '../recover/recover.page';
import { Device } from '@capacitor/device';
import { CreamedicLoginRequest, CreamedicLoginResponse, CreamedicService } from '../services/creamedic.service';

import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

import { ExternalLoginService } from '../services/external-login.service';
import { Observable } from 'rxjs';

export enum loginType {
  Normal = 0,
  Google = 1,
  Facebook = 2
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  request: userRequest = {
    email: "jose.juan.vega13@outlook.com",
    password: "1234567890"
  }
  // request: userRequest = {
  //   email: "",
  //   password: ""
  // }

  isWeb = !(isPlatform('android') || isPlatform('ios'));



  constructor(private interfazService: InterfazService,
    private authService: AuthenticationService,
    private navController: NavController,
    private modalController: ModalController,
    private folderService: FoldersService,
    private menuController: MenuController,
    private catService: CategoriesServices,
    private creamedicService: CreamedicService,
    private externalLoginService: ExternalLoginService,
    private platform: Platform
  ) {




  }






  async ngOnInit() {


   


    if (this.isWeb) {
     
      await GoogleAuth.initialize();
     
    }

    // this.login(loginType.Normal);

    // GoogleAuth.initialize();
    this.menuController.enable(false);

    // Device.getInfo().then(info=>{
    //   console.log(info);
    //   
    // })
    // Device.getId().then(id=>{
    //   console.log(id);
    //   
    // })
    //
    // Device.getBatteryInfo().then(id=>{
    //   console.log(id);
    //   
    // })
    // this.OpenRegisterPage();
    //this.OpenRecoverPage();
  }




  async signFacebook(){
    if (!(this.platform.is('android') && this.platform.is('ios'))) {  
      
      this.externalLoginService.LoginFacebookCreamedic(null);
      //this.navController.navigateRoot("/documents")
    }

  }
  async signIn() {

    if (this.isWeb) {  
      //await GoogleAuth.signOut();   
      let user = await GoogleAuth.signIn().then(ok=>{
        console.log("OK", user);
        //valida usuario en google
        this.externalLoginService.LoginGoogleCreamedic(user);
      }).catch(error=>{
        console.log("OK", user);
      });
     
      //this.navController.navigateRoot("/documents")
    }


    // await GoogleAuth.initialize();

  //  let user = await GoogleAuth.signIn();
  //  console.log(user);
  //  GoogleAuth.signIn().then(result => {
  //    console.log("OK", result);
  //  }, (error: any) => {
  //    if (error.code == "12501") {
  //      this.interfazService.presentToast("Inicio de sesión cancelado por el usuario")
  //    }
  //    if (error.code == "12500") {
  //      this.interfazService.presentToast("Inicio de sesión no soportado por el dispositivo")
  //    }
  //  });
//

  }
  ionViewWillEnter() {
    //this.menuController.enable(false);
  }
  get validForm() {
    return (this.request.email != "" && this.request.password != "");
  }
  get validaEmail() {
    return this.request.email != "" && !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(this.request.email)
  }
  get validaPassword() {
    return this.request.password != "" && this.request.password.length < 8;
  }
  tryesToConnect: number = 0;
  showRecoverPassword: boolean = false;



  async submitForm(form) {

    if (this.validaEmail && this.validaPassword) {
      return;
    }

    this.tryesToConnect++;
    console.log(this.tryesToConnect);

    if (this.tryesToConnect == 2) {
      this.showRecoverPassword = true;
    }

    this.interfazService.loader("Procesando").then(async loader => {
      loader.present();
      this.externalLoginService.creamedicResponse = this.request;
      await this.externalLoginService.LoginCreamedic();
      loader.dismiss();
    })


    return;

    if (this.validaEmail && this.validaPassword) {
      return;
    }
    this.interfazService.loader("Procesando").then(loader => {
      loader.present();
      let loginCreamedic: CreamedicLoginRequest = {
        email: this.request.email,
        password: this.request.password
      }
      this.tryesToConnect++;
      console.log(this.tryesToConnect);

      if (this.tryesToConnect == 3) {
        this.showRecoverPassword = true;
      }

      this.authService.authenticate(this.request)
        .pipe(first())
        .subscribe({
          next: (userInfo) => {
            loader.dismiss();

            if (userInfo.result == false) {
              this.interfazService.presentToast(userInfo.message, "error")
              //return;
            }
            this.catService
              .getCAtegories(this.authService.currentOwnerValue.id)
              .pipe(first())
              .subscribe({
                next: (res) => {
                  res.forEach(element => {
                    this.folderService.add(element.categoria, element.color, element.id);
                  });
                },
                error: (error) => { },
              });
            this.navController.navigateRoot("/documents")
          },
          error: error => {
            console.log(error);
            loader.dismiss();
            //let messageError = error.error.message ? error.error.message : "No es posible conectarse al servidor, intente de nuevo mas tarde";
            let messageError = "Error de sincronizacion, intente de nuevo mas tarde";
            this.interfazService.presentToast(messageError, "error")
          }
        });

      this.creamedicService.Login(loginCreamedic)
        .pipe(first())
        .subscribe({
          next: (result) => {
            //se guarda el token de creamedic
            this.authService.setCurrentTokenValue = result.token;


          },
          error: error => {
            console.log(error);
            loader.dismiss();
            let messageError = error.error.err.message ? error.error.err.message : "No es posible conectarse al servidor, intente de nuevo mas tarde";
            this.interfazService.presentToast(messageError, "error")
          }
        })

    })
  };
  async OpenRegisterPage() {
    const modal = await this.modalController.create({
      component: RegisterPage,
      //backdropDismiss: false,
      //swipeToClose: true,
      componentProps: {
      }
    });

    modal.onDidDismiss().then(data => {
      if (data.data != "close" && data.role == undefined) {
        //console.log(data)
        //this.OpenActivation(data.data.email);
      }

    });
    return await modal.present();
  }

  async OpenRecoverPage() {
    const modal = await this.modalController.create({
      component: RecoverPage,
      //backdropDismiss: false,
      //swipeToClose: true,
      componentProps: {
      }
    });

    modal.onDidDismiss().then(data => {
      if (data.data != "close" && data.role == undefined) {
        //console.log(data)
        //this.OpenActivation(data.data.email);
      }

    });
    return await modal.present();
  }
}
