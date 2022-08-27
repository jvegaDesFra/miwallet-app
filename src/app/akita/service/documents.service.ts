import { Injectable } from '@angular/core';
import { createDocument, Documentos, file } from '../models/documents.model';
import { DocumentsQuery } from '../query/documents.query';
import { DocumentStore } from '../state/documents.store';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private documentStore: DocumentStore, private documentQuery: DocumentsQuery) {
  }


  add(title: string, idFolder: string, fileurl: file, filePath: string, folderColor: string, id_document: string, sync: number) {
    const todo = createDocument(title, idFolder, fileurl, filePath, folderColor, id_document, sync);
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

  updateSync(id,sync){
    console.log("update", id, sync);
    
    this.documentStore.update(id, { sync });
  }
  searchDocument(text){
    this.documentStore.update({
      text
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