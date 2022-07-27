import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { Documentos } from '../../akita/models/documents.model';
import { DocumentsQuery } from '../../akita/query/documents.query';
import { DocumentService } from '../../akita/service/documents.service';
import { ModalController, NavController } from '@ionic/angular';
import { DocumentNewComponent } from './components/document-new/document-new.component'
import { first } from 'rxjs/operators';

  @Component({
  selector: 'page-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  documentos$: Observable<Documentos[]>;
  loaded = false;
  wordToSearch = "";
  constructor(    private documentsService : DocumentService,
    private documentQuery: DocumentsQuery,
    private auth: AuthenticationService,
    private navController: NavController,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    
    console.log( this.documentos$ );
    


    setTimeout(() => {
      this.loaded = true;
      this.documentQuery.getDocuments$.subscribe(data=>{
        this.documentos$ = of(data);
        this.lsData = data;
        this.lsFilter = data;
      });
    }, 2000);

   // this.openModal();
  }

 

  delete(id){
    this.documentsService.delete(id);
  }

  logout(){
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
      console.log(role);
      
    }
  }
  lsFilter = [];
  lsData = [];
  countReg: number = 0;
  filterList(evt) {

    //this.lsPostFilter = this.lsPosts;
    const searchTerm = evt.srcElement.value;
    
    //  console.log(this.wordToSearch)
    if (!searchTerm) {
      this.lsFilter = this.lsData;
    } else {
      console.log(searchTerm, this.lsFilter)
      // this.postService.Search(searchTerm).then(result => {
      //   console.log(searchTerm);
      //   this.lsFilter = result;
      //   this.countReg = this.lsfFilter.length;
      // })
       this.lsFilter = this.lsData.filter(currentGoal => {
          console.log(currentGoal);
          
         if (currentGoal.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
           return true;
         }
         return false;
      
       });

    }
  }


}
