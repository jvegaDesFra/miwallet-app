import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { Documentos } from '../../akita/models/documents.model';
import { DocumentsQuery } from '../../akita/query/documents.query';
import { DocumentService } from '../../akita/service/documents.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'page-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  documentos$: Observable<Documentos[]>;
  constructor(    private documentsService : DocumentService,
    private documentQuery: DocumentsQuery,
    private auth: AuthenticationService,
    private navController: NavController) { }

  ngOnInit() {
    this.documentos$ = this.documentQuery.getDocuments$;
    console.log( this.documentos$ );
    

    this.documentsService.add("ejemplo")
    this.documentsService.add("ejemplo2")
    this.documentsService.add("ejemplo3")
  }

 

  delete(id){
    this.documentsService.delete(id);
  }

  logout(){
    this.auth.logout();
    this.navController.navigateRoot("/login")
  }

}
