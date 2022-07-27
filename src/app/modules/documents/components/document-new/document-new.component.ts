import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FoldersQuery } from '../../../../akita/query/folders.query';
import { Folders } from '../../../../akita/models/folders.model';
import { DocumentService } from '../../../../akita/service/documents.service';

@Component({
  selector: 'app-document-new',
  templateUrl: './document-new.component.html',
  styleUrls: ['./document-new.component.scss'],
})
export class DocumentNewComponent implements OnInit {
  folders$: Observable<Folders[]>;
  constructor(private modalController: ModalController,
    private query: FoldersQuery,
    private documentsService : DocumentService) { }

  ngOnInit() {
    this.folders$ = this.query.getFolders$; 
  }
  CloseModal(return_) {
  
    this.modalController.dismiss(return_);
  }
  currentFolder;
  nombre:string = "";
  handleChange(ev) {
    this.currentFolder = ev.target.value;

    console.log(this.currentFolder);
    
  }
  save(){
    this.documentsService.add(this.nombre, this.currentFolder);
    this.CloseModal(null);
  }
  compareWith(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
