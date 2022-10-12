import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Folders } from 'src/app/akita/models/folders.model';
import { FoldersQuery } from 'src/app/akita/query/folders.query';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FolderNewComponent } from '../folders/components/folder-new/folder-new.component';
import { HandlerService } from '../handler/handler.service';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  folders$: Observable<Folders[]>;
  user = {
    name: "",
    email: ""
  }

  constructor(private authService: AuthenticationService,
    private handlerService: HandlerService,
    private query: FoldersQuery,
    private modalCtrl: ModalController) {


  }

  ngOnInit() {
    //  alert("ngOnInit")
    this.authService.currentOwner.subscribe(result => {
      console.log(".....SIDEBAR", result);
      if (result) {
        this.folders$ = this.query.getFolders$;
        this.user.name = this.authService.currentOwnerValue.name;
        this.user.email = this.authService.currentOwnerValue.email;

      }
    })



  }
  ionViewWillEnter() {
    //  alert("ionViewWillEnter")
   
  }

  

}
