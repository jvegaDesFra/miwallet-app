import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { InterfazService } from '../services/interfaz.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  email: string = "";
  constructor(private modalController: ModalController,
    private interfazService: InterfazService,
    private auth: AuthenticationService) { }

  ngOnInit() {
  }
  get validaEmail(){
    return this.email != "" && !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(this.email)
  }
  get validForm() {
    return (this.email != "");
  }
  send(){
    if(this.validaEmail){
      return;
    }

    this.interfazService.loader("Creando Cuenta").then(loader => {
      loader.present();
      this.auth.recover(this.email)
        .pipe(first())
        .subscribe({
          next: (userInfo) => {
            console.log(userInfo);
            loader.dismiss();
            if (userInfo.result) {
              this.interfazService.presentToast(userInfo.message, "dark");
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

  CloseModal(return_) {
    this.modalController.dismiss(return_);
    // this.interfazService.dismissLoading();
  }
}
