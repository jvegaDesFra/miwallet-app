import { Component } from '@angular/core';
import { Folders } from '../app/akita/models/folders.model';
import { FoldersQuery } from '../app/akita//query/folders.query';
import { FoldersService } from '../app/akita//service/folders.service';
import { persistState} from '@datorama/akita'
import { Observable } from 'rxjs';
import { ModalController, MenuController, NavController  } from '@ionic/angular';
import { FolderNewComponent } from './modules/folders/components/folder-new/folder-new.component';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AuthenticationService } from './services/authentication.service';
import { CategoriesServices } from './modules/folders/categories.services';
import { first } from 'rxjs/operators';
import { HandlerService } from './modules/handler/handler.service';
import { Filesystem } from '@capacitor/filesystem';


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

  user = {
    name: "",
    email: ""
  }
  folders$: Observable<Folders[]>;
  constructor(private service : FoldersService,
    private query: FoldersQuery,
    private modalCtrl: ModalController,
    public menuCtrl: MenuController,
    private authService: AuthenticationService,
    private catService: CategoriesServices,
    private handlerService: HandlerService,
    private navController: NavController,
    ) {
      
      this.menuCtrl.enable(false);
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({ color: "#ffffff" })
      //
      console.log(this.authService.currentOwnerValue);
      this.getInfoLogged();
     // console.log(this.authService.currentOwnerValue);
      
    //  alert(this.authService.currentOwnerValue)
      //TODO: Cambiar por un servicio verificador
      if(this.authService.currentOwnerValue){
        this.handlerService.getFolders();
      }
    }

  trackByFn(index, param) {
    return param.id;
  }
  getInfoLogged(){
    if(this.authService.currentOwnerValue){
      this.user.name = this.authService.currentOwnerValue.name;
      this.user.email = this.authService.currentOwnerValue.email;
      //this.GetService();
    }
  }
 
  

  ngOnInit() {
   
   
    //persistState();
    this.folders$ = this.query.getFolders$;  
   // this.menuCtrl.enable(true)
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
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
}
