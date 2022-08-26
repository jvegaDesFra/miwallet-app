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
    folders : false,
    documents: false,
    permissions: false
  } 


  constructor(
    private navController: NavController,
    private handlerService: HandlerService) { }

  ngOnInit() {
    this.load();
    

  }

  async load(){
    this.data.folders = await this.handlerService.getFolders();
    this.data.documents = await this.handlerService.getDocuments(true);
  }

 

  entrar(){
    this.navController.navigateRoot('/documents')
  }

}
