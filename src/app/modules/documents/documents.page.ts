import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { Documentos, file } from '../../akita/models/documents.model';
import { DocumentsQuery } from '../../akita/query/documents.query';
import { DocumentService } from '../../akita/service/documents.service';
import { isPlatform, MenuController, ModalController, NavController, Platform } from '@ionic/angular';
import { DocumentNewComponent } from './components/document-new/document-new.component'
import { first } from 'rxjs/operators';
import { FoldersQuery } from '../../akita/query/folders.query';
import { UIService } from '../../services/ui.service';
import { CertificadoService } from './documents.service';
import { HandlerService } from '../handler/handler.service';
import { Socket } from 'ngx-socket-io';
import { Device } from '@capacitor/device';
import { Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'page-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  documentos$: Observable<Documentos[]>;
  loaded = true;
  wordToSearch = "";
  nameFolder = "";
  idFolder$;
  isWeb = !(isPlatform('android') || isPlatform('ios'));

  constructor(private documentsService: DocumentService,
    private documentQuery: DocumentsQuery,
    private auth: AuthenticationService,
    private navController: NavController,
    private modalCtrl: ModalController,
    private menuController: MenuController,
    private folderQuery: FoldersQuery,
    private ui: UIService,
    private certService: CertificadoService,
    private platform: Platform,
    private handlerService: HandlerService,
    private socket: Socket) { 
      this.loaded = true;
    }


  interval;
  ngOnDestroy() {
    //  this.Socket_emit("GetInfoDriver:ID:OUT", null)
    clearInterval(this.interval);
  }
  ionViewDidEnter() {
    this.socket.connect();
    this.socket.fromEvent('logout').subscribe(id => {
      console.log("FromEvent", id);
      this.auth.logout();
      this.ui.presentToast("Se ha iniciado sesion en otro dispositivo",'warning')
    });
    
  }

  
  ngOnInit() {
    Filesystem.checkPermissions().then(result => {
      if (!(result.publicStorage == 'granted')) {
        this.navController.navigateRoot("/handler")
      }
    })

 //   console.log("ngOnInit", this.auth);

    this.loaded = true;
    this.refresh().then(loaded=>{
      Device.getId().then(id => {
     //   console.log(id);
        this.socket.connect();
        this.socket.emit('latido', this.auth.currentOwnerValue.id, this.auth.currentOwnerValue.token, id.uuid);
        this.interval = setInterval(() => {
          this.socket.connect();
          this.socket.emit('latido', this.auth.currentOwnerValue.id, this.auth.currentOwnerValue.token, id.uuid);
          if (!this.auth.currentOwnerValue) {
            clearInterval(this.interval);
          }
        }, 3000);
      })
    });
    
    this.documentsService.searchDocument("");
    //console.log(this.documentos$);

    
    this.documentos$ = this.documentQuery.getDocs$;
    this.menuController.enable(true);
    this.idFolder$ = this.documentQuery.selectVisibilityFilter$;
    //console.log(this.idFolder$);

    this.documentQuery.selectVisibilityFilter$.subscribe(idFolder => {
      //console.log(idFolder);
      this.folderQuery.getNameFolder(idFolder.idFolder || "0").subscribe(folder => {
        //console.log(folder);
        this.nameFolder = folder.length ? folder.shift().name : "Todos";
        
      })
    })
    // 

    //  this.openModal();
  }
  handleRefresh(event) {
    //setTimeout(() => {
      // Any calls to load data go here
      this.refresh().then(()=>{
        event.target.complete();
      });
      
    //}, 2000);
  };

  delete(id) {
    this.ui.presentAlertConfirm("¿Desea eliminar el archivo?", "",
      (ok) => this.documentsService.delete(id),
      (error) => console.log(error))
  }

  logout() {
    this.auth.logout();
    this.navController.navigateRoot("/login")
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: DocumentNewComponent,
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
  refresh():Promise<any> {
    return new Promise<any>((resolve, reject)=>{
      this.handlerService.getFolders().then(loaded=>{
        this.handlerService.getDocuments().then(loaded=>{
          if(loaded){
            this.loaded = false;
            resolve(true);
          }
        });
      });
    })
    
  }
  lsFilter = [];
  lsData = [];
  countReg: number = 0;
  filterList(evt) {

    //this.lsPostFilter = this.lsPosts;
    const searchTerm = evt.srcElement.value;
    this.documentsService.searchDocument(searchTerm);
    return;
    //  //console.log(this.wordToSearch)
    if (!searchTerm) {
      this.lsFilter = this.lsData;
    } else {
      //console.log(searchTerm, this.lsFilter)
      // this.postService.Search(searchTerm).then(result => {
      //   //console.log(searchTerm);
      //   this.lsFilter = result;
      //   this.countReg = this.lsfFilter.length;
      // })
      this.lsFilter = this.lsData.filter(currentGoal => {
        if (currentGoal.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;

      });

    }
  }


}
