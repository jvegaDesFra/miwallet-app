import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class InterfazService {

  constructor(
    private toastController: ToastController, 
    private alertController: AlertController,
    private loadingController: LoadingController) { }

  loading:any;

 GetCustomClassType(type:string){
   //console.log(type);   
   return type.toLocaleLowerCase() == "error" ? "custom-class-toast-error" : "custom-class-toast-ok";
 }
 loader(message:string){
  return this.loadingController.create({
    cssClass: 'my-custom-class-loading',
    //message: message, 
    //translucent: true,       
    //duration: 2000
  })
 }

 

 // presentLoading(message):Promise<any>{
 //   //this.dismissLoading();
//
 //   this.loading = null;
 //   return new Promise<any>((resolve, reject)=>{
 //     this.loadingController.create({
 //       cssClass: 'my-custom-class-loading',
 //       message: message,        
 //       //duration: 2000
 //     }).then((res) => {
 //       ////console.log(res);       
 //       res.present();
 //       resolve(res);
 //     });
 //     //await this.loading.present();
 //   })    
 // }

 // dismissLoading(){
 //   this.loadingController.getTop().then(hasloading => {
 //     //console.log(hasloading);
 //     
 //     if (hasloading) {
 //     this.loadingController.dismiss();
 //      }
 // })
 //   //this.loadingController.dismiss().then((res)=>{
 //   //  //console.log("loading dismissed", res)
 //   //}).catch((error)=>{
 //   //  //console.log("error", error);
 //   //  
 //   //})
 // }

  async presentToast(message:string,color:string = "", duration:number = 4000, position = 'bottom') {
    //console.log('toast');
    
    const toast = await this.toastController.create( {
      message: message,      
      color: color == "error" ? "danger" : color,
      duration: duration,
     // cssClass: this.GetCustomClassType(type),
      position: 'bottom'
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

  async presentAlertCustom(message, buttons, cssClass="") {
    const alert = await this.alertController.create({
      cssClass: cssClass,
      //header: 'Alert',
      //subHeader: 'Subtitle',
      message: message,
      buttons: buttons
    });

    await alert.present();
  }

}
