import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { Documentos, file } from '../../akita/models/documents.model';
import { DocumentsQuery } from '../../akita/query/documents.query';
import { DocumentService } from '../../akita/service/documents.service';
import { MenuController, ModalController, NavController, Platform } from '@ionic/angular';
import { DocumentNewComponent } from './components/document-new/document-new.component'
import { first } from 'rxjs/operators';
import { FoldersQuery } from '../../akita/query/folders.query';
import { UIService } from '../../services/ui.service';
import { CertificadoService } from './documents.service';
import { HandlerService } from '../handler/handler.service';

@Component({
  selector: 'page-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  documentos$: Observable<Documentos[]>;
  loaded = false;
  wordToSearch = "";
  nameFolder = "";
  idFolder$;
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
    private handlerService: HandlerService) { }

  
 
  ngOnInit() {
    
   this.refresh();
   
    this.documentsService.searchDocument("");
    //console.log(this.documentos$);

    this.loaded = true;
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
  refresh(){
    this.handlerService.getFolders();
    this.handlerService.getDocuments();
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
