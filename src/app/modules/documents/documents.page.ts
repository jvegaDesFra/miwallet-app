import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Documentos } from '../../akita/models/documents.model';
import { DocumentsQuery } from '../../akita/query/documents.query';
import { DocumentService } from '../../akita/service/documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  documentos$: Observable<Documentos[]>;
  constructor(    private documentsService : DocumentService,
    private documentQuery: DocumentsQuery) { }

  ngOnInit() {
    this.documentos$ = this.documentQuery.getDocuments$;
    console.log( this.documentos$ );
    

    this.documentsService.add("ejemplo")
    this.documentsService.add("ejemplo2")
    this.documentsService.add("ejemplo3")
  }

  trackByFn(index, todo) {
    return todo.id;
  }

  delete(id){
    this.documentsService.delete(id);
  }

}
