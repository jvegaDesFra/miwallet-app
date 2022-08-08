import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { combineLatest, Observable } from 'rxjs';
import { Documentos } from '../models/documents.model';
import { DocumentState, DocumentStore } from '../state/documents.store';

@Injectable({
  providedIn: 'root'
})
export class DocumentsQuery extends QueryEntity<DocumentState> {
  selectVisibilityFilter$ = this.select(state => state);
  //selectTextFilter$ = this.select(state=> state.text);

  getDocuments$: Observable<Documentos[]> = this.selectAll();
  getDocs$ = combineLatest(this.selectVisibilityFilter$, this.selectAll(), this.getDocumentsByFolder2);

  constructor(protected docu: DocumentStore) {
    super(docu);
  }

  getDocumentsByFolder2(filters, documents): Documentos[] {
    if(filters.text != ""){
      return documents.filter(d=> d.title.indexOf(filters.text)  > -1 )
    }    
    if (filters.idFolder != "0") {
      return documents.filter(d => d.idFolder == filters.idFolder);
    }
    return documents;
  }

  getDocumentsByFolder(idFolder) {
    if (idFolder == '0')
      return this.selectAll();

    return this.selectAll({ filterBy: (doc => doc.idFolder == idFolder) });
  }
  getDocumentsByFolderObject(idFolder) {
    if (idFolder == '0')
      return this.selectAll();

    return this.getAll({ filterBy: (doc => doc.idFolder == idFolder) });
  }
}