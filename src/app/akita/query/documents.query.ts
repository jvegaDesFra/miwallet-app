import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { combineLatest, Observable } from 'rxjs';
import { Documentos } from '../models/documents.model';
import { DocumentState, DocumentStore } from '../state/documents.store';

@Injectable({
  providedIn: 'root'
})
export class DocumentsQuery extends QueryEntity<DocumentState> {
  selectVisibilityFilter$ = this.select(state => state.idFolder);
  
  getDocuments$: Observable<Documentos[]> = this.selectAll();
  getDocs$ = combineLatest(this.selectVisibilityFilter$ ,this.selectAll(),this.getDocumentsByFolder2);

  constructor(protected docu: DocumentStore) {
    super(docu);
  }

  getDocumentsByFolder2(idFolder, documents):Documentos[]{
    console.log("getDocumentsByFolder2", idFolder,documents );
    
    if(idFolder!=""){
      return documents.filter(d=>d.idFolder == idFolder);
    } else {
      return documents;
    }
 
  }

  getDocumentsByFolder (idFolder){
    return this.selectAll({filterBy: (doc=> doc.idFolder == idFolder)});
  }
}