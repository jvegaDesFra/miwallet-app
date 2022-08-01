import { Injectable } from '@angular/core';
import { createDocument, Documentos } from '../models/documents.model';
import { DocumentStore } from '../state/documents.store';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private documentStore: DocumentStore) {
  }


  add(title: string, idFolder: string) {
    const todo = createDocument(title, idFolder);
    console.log(todo);
    
    this.documentStore.add(todo);
  }

  delete(id: string) {
    this.documentStore.remove(id);
  }

  complete({ id, completed }: Documentos) {
    this.documentStore.update(id, { completed });
  }

  updateFolder(idFolder){
    this.documentStore.update({
      idFolder
    })
  }
  //setName(name: string) {
  //  this.documentStore.set(name);
  //}
//
  //resetName() {
  //  this.documentStore.resetName();
  //}

}