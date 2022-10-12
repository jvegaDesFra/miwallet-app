import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { InterfazService } from 'src/app/services/interfaz.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(private modalController: ModalController,
    private interfaze: InterfazService,
    private auth: AuthenticationService) { }

  ngOnInit() { }
  CloseModal(return_) {

    this.modalController.dismiss(return_);
  }
  deleteAccount() {
    this.interfaze.presentAlertCustom("¿Esta seguro que desea eliminar su cuenta?", [{
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {

      },
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {
        this.interfaze.presentAlertCustom("Confirmar eliminación de cuenta", [{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
    
          },
        },
        {
          text: 'CONFIRMAR',
          role: 'confirm',
          handler: () => {
            this.modalController.dismiss();
            this.auth.logout();
            this.interfaze.presentToast("Cuenta eliminada correctamente", "warning")
          },
        },])
      },
    },])
  }
}
