import { Injectable } from '@angular/core';
import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Documentos } from '../models/documents.model';
 
export interface DocumentState extends EntityState<Documentos, string> {
 documents: Array<Documentos>,
 idFolder: string
}
 
export function createInitialName(): DocumentState {
  return {
    idFolder: "",
    documents: []
  };
}
 
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'documents' })
export class DocumentStore extends EntityStore<DocumentState> {
 
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
