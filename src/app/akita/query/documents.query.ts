import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { DocumentState, DocumentStore } from '../state/documents.store';

@Injectable({
  providedIn: 'root'
})
export class DocumentsQuery extends QueryEntity<DocumentState> {

  getDocuments$ = this.selectAll();

  constructor(protected docu: DocumentStore) {
    super(docu);
  }

}