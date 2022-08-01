import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { FoldersState, FoldersStore } from '../state/folders.store';

@Injectable({
  providedIn: 'root'
})
export class FoldersQuery extends QueryEntity<FoldersState> {

  getFolders$ = this.selectAll();

  constructor(protected store: FoldersStore) {
    super(store);
  }

  getCountDocuments(){
    this.store.getValue()
  }

}