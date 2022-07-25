import { Injectable } from '@angular/core';
import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Folders } from '../models/folders.model';
 
export interface FoldersState extends EntityState<Folders, string> {
 folders: Array<Folders>
}
 
export function createInitialName(): FoldersState {
  return {
    folders: []
  };
}
 
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'folders' })
export class FoldersStore extends EntityStore<FoldersState> {
    FoldersState
  constructor() {
    super(createInitialName());
  }
 
 // setName(name: string) {
 //   this.update({name});
 // }
 //
 // resetName() {
 //   this.update(createInitialNameState());
 // }
 
}

//import {Store, StoreConfig} from '@datorama/akita';
//import {Injectable} from "@angular/core";
//
//export interface Action {
//}
//
//export interface ActionsState {
//    actions: Array<Action>
//}
//
//export function createInitialState (): ActionsState {
//    return  {
//        actions: []
//    };
//}
//
//@Injectable({ providedIn: 'root' })
//@StoreConfig({name: 'actions'})
//export class ActionsStore extends Store<ActionsState> {
//    constructor(){
//        super(createInitialState());
//    }
//}
//
