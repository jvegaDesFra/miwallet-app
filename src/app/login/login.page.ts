import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { user, userRequest } from '../akita/models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { InterfazService } from '../services/interfaz.service';

import { RegisterPage } from "../register/register.page";
import { FoldersService } from '../akita/service/folders.service';
import { CategoriesServices } from '../modules/folders/categories.services';
import { RecoverPage } from '../recover/recover.page';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //request : userRequest = {
  //  email: "jose.juan.vega@outlook.com",
  //  password: "1234567890"
  //}
  request: userRequest = {
    email: "",
    password: ""
  }
  constructor(private interfazService: InterfazService,
    private authService: AuthenticationService,
    private navController: NavController,
    private modalController: ModalController,
    private folderService: FoldersService,
    private menuController: MenuController,
    private catService: CategoriesServices,
  ) {

  }

  ngOnInit() {
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
  async submitForm(form) {
    if (this.validaEmail && this.validaPassword) {
      return;
    }
    this.interfazService.loader("Procesando").then(loader => {
      loader.present();
      this.authService.authenticate(this.request)
        .pipe(first())
        .subscribe({
          next: (userInfo) => {
            //console.log(userInfo);

            loader.dismiss();

            if (userInfo.result == false) {
              this.interfazService.presentToast(userInfo.message, "error")
              return;
            }
            this.catService
              .getCAtegories(this.authService.currentOwnerValue.id)
              .pipe(first())
              .subscribe({
                next: (res) => {
                  //console.log(res);
                  res.forEach(element => {
                    this.folderService.add(element.categoria, element.color, element.id);
                  });

                  
                },
                error: (error) => {

                },
              });
            //this.folderService.add("Inicio","", "0")
         //   this.navController.navigateRoot("/handler")
            this.navController.navigateRoot("/documents")
          },
          error: error => {
            //console.log(error);
            loader.dismiss();
            this.interfazService.presentToast(error.error.message, "error")
          }
        });
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
