import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { userRegister } from '../akita/models/user.model';
import { InterfazService } from '../services/interfaz.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  data :userRegister = {};
  constructor(private modalController: ModalController,
    private interfazService: InterfazService) { }

  ngOnInit() {
  }
  CloseModal(return_) {
    this.modalController.dismiss(return_);
   // this.interfazService.dismissLoading();
  }
  Save(form) {
    //console.log(this.data);
    return
    this.interfazService.loader("Creando Cuenta").then(loader => {
      // this.loading =loader;
      loader.present();
      this.interfazService.presentToast("Correo registrado, active su cuenta para continuar", "dark");
      loader.dismiss();
      
      
    });  
  }

}
