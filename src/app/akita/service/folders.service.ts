import { Injectable } from '@angular/core';
import { create, Folders } from '../models/folders.model';
import { FoldersStore } from '../state/folders.store';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {

  constructor(private sStore: FoldersStore) {
  }


  add(title: string, color: string, id: string) {
    const add = create(title, color, id);
    
    this.sStore.add(add);
  }

  delete(id: string) {
    this.sStore.remove(id);
  }



  //setName(name: string) {
  //  this.documentStore.set(name);
  //}
//
  //resetName() {
  //  this.documentStore.resetName();
  //}

}