import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
export enum AlertType {
  OK = "ok",
  CANCEL = "cancel"
}

@Injectable({
  providedIn: 'root'
})



export class UIService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController) { }

  loading: any;

  GetCustomClassType(type: string) {
    //console.log(type);
    return type.toLocaleLowerCase() == "error" ? "custom-class-toast-error" : "custom-class-toast-ok";
  }
  loader(message: string) {
    return this.loadingController.create({
      //cssClass: 'my-custom-class-loading',
      //message: message, 
      //translucent: true,       
      //duration: 2000
    })
  }


  async presentToast(message: string, color: string = "", icon: string = "", position: any = 'bottom', duration: number = 4000) {
    //console.log('toast');

    const toast = await this.toastController.create({
      message: message,
      color: color,
      icon: icon,
      // color: color == "error" ? "danger" : color,
      duration: duration,
      //cssClass: this.GetCustomClassType(type),
      position: position
    });
    toast.present();
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class-alert',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: message,
      buttons: ['Cancel', 'Open Modal']
    });

    await alert.present();
  }

  async presentAlertCustom(message, buttons, cssClass = "") {
    const alert = await this.alertController.create({
      cssClass: cssClass,
      //header: 'Alert',
      //subHeader: 'Subtitle',
      message: message,
      buttons: buttons
    });

    await alert.present();
  }

  async presentAlertConfirm(message:string, header: string = "", callBackOK, callBackCancel) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            callBackCancel(AlertType.CANCEL)
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            callBackOK(AlertType.OK);
          },
        },
      ],
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
