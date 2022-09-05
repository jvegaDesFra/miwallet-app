import { Component, OnInit } from '@angular/core';

import { Filesystem } from '@capacitor/filesystem';
import { NavController } from '@ionic/angular';
import { HandlerService } from './handler.service';

@Component({
  selector: 'app-handler',
  templateUrl: './handler.page.html',
  styleUrls: ['./handler.page.scss'],
})
export class HandlerPage implements OnInit {

  data = {
    folders: false,
    documents: false,
    permissions: false,
    permissions_procesado: false
  }


  constructor(
    private navController: NavController,
    private handlerService: HandlerService) { }

  ngOnInit() {
    this.load();


    Filesystem.checkPermissions().then(result => {
      if (!(result.publicStorage == 'granted')) {
        this.requestPermissions();
      } else {
        this.data.permissions = true;
      }
    })
  }

  requestPermissions() {
    Filesystem.requestPermissions().then(permiso => {
      if (permiso.publicStorage == 'granted') {
        this.data.permissions = true;
        this.data.permissions_procesado = false;
      } else {
        this.data.permissions_procesado = true;
      }
      //console.log(permiso);
    })
  }

  async load() {
    this.data.folders = await this.handlerService.getFolders();
    this.data.documents = await this.handlerService.getDocuments(true);
  }



  entrar() {
    this.navController.navigateRoot('/documents')
  }

}
