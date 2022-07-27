import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InterfazService } from '../services/interfaz.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private modalController: ModalController,
    private interfazService: InterfazService) { }

  ngOnInit() {
  }
  CloseModal(return_) {
    this.modalController.dismiss(return_);
   // this.interfazService.dismissLoading();
  }
  Save(form) {
    this.interfazService.loader("Creando Cuenta").then(loader => {
      // this.loading =loader;
      loader.present();
      this.interfazService.presentToast("Correo registrado, active su cuenta para continuar", "dark");
      loader.dismiss();
      
      
    });  
  }

}
