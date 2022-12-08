import { Component } from '@angular/core';
import { Folders } from '../app/akita/models/folders.model';
import { FoldersQuery } from '../app/akita//query/folders.query';
import { FoldersService } from '../app/akita//service/folders.service';
import { persistState} from '@datorama/akita'
import { Observable } from 'rxjs';
import { ModalController, MenuController, NavController, Platform  } from '@ionic/angular';
import { FolderNewComponent } from './modules/folders/components/folder-new/folder-new.component';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AuthenticationService } from './services/authentication.service';
import { CategoriesServices } from './modules/folders/categories.services';
import { first } from 'rxjs/operators';
import { HandlerService } from './modules/handler/handler.service';
import { Filesystem } from '@capacitor/filesystem';
import { SettingsComponent } from './modules/settings/settings.component';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  isOpen: boolean  = false;
 
  folders$: Observable<Folders[]>;
  constructor(private service : FoldersService,
    private query: FoldersQuery,
    private modalCtrl: ModalController,
    public menuCtrl: MenuController,
    private authService: AuthenticationService,
    private catService: CategoriesServices,
    private handlerService: HandlerService,
    private navController: NavController,
    private platform: Platform,
    ) {
      
     // this.menuCtrl.enable(false);

      if(this.platform.is("android") || this.platform.is("ios")){
        if(StatusBar){
          StatusBar.setStyle({ style: Style.Light });
          if(this.platform.is("android")){
            StatusBar.setBackgroundColor({ color: "#ffffff" })
          }
         
        }
        
      }

      
      
 
    }


  ngOnInit() {
    this.authService.currentOwner.subscribe((result:any) => {
      //console.log(".....SIDEBAR", result);
     
      if (result) {
        if(result.result){
          this.isOpen = true;
        }
       

      } else {
        this.isOpen = false;
      }
    })
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    
  }
  openMenu(){
    
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: FolderNewComponent,
      //presentingElement: document.querySelector('.ion-page')
      //initialBreakpoint:0.5,
      //breakpoints: [0.5, 0.75]
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //console.log(role);
      
    }
  }

  async openSettings() {
    this.menuCtrl.close();
    const modal = await this.modalCtrl.create({
      component: SettingsComponent,
      //presentingElement: document.querySelector('.ion-page')
      initialBreakpoint: 0.5,
      breakpoints: [0.25, 0.5],
      backdropDismiss: true,
      canDismiss: true
      // backdropBreakpoint: 0.5
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //console.log(role);

    }
  }
}
