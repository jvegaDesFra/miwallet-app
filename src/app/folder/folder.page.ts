import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Documentos } from '../akita/models/documents.model';
import { DocumentsQuery } from '../akita/query/documents.query';
import { DocumentService } from '../akita/service/documents.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  documentos$: Observable<Documentos[]>;
  constructor(private activatedRoute: ActivatedRoute,
    private documentsService : DocumentService,
    private documentQuery: DocumentsQuery) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.documentos$ = this.documentQuery.getDocuments$;
    //console.log( this.documentos$ );
    

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
