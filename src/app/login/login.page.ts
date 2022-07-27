import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { user, userRequest } from '../akita/models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { InterfazService } from '../services/interfaz.service';

import { RegisterPage } from "../register/register.page";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  request : userRequest = {
    email: "jose.juan.vega@outlook.com",
    password: "1234"
  }
  constructor(private interfazService: InterfazService,
    private authService: AuthenticationService,
    private navController: NavController,
    private modalController: ModalController ) { }

  ngOnInit() {
  }
  get validForm() {
    return (this.request.email != "" && this.request.password != "");
  }

  async submitForm(form) {   
    this.interfazService.loader("Procesando").then(loader => {
      loader.present();  
      this.authService.authenticate(this.request)
        .pipe(first())
        .subscribe({
            next: (userInfo) => {
                console.log(userInfo);
                
                loader.dismiss();
               
                if(userInfo == null){
                  this.interfazService.presentToast("Usuarioy contraseña incorrecta", "error", 400, "error")
                  return;
                }
                this.navController.navigateRoot("/documents")  
            },
            error: error => {              
                console.log(error);
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
          console.log(data)
          //this.OpenActivation(data.data.email);
        }
  
      });
      return await modal.present();
    }
}
