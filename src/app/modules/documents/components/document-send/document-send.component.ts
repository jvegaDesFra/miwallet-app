import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Documentos } from '../../../../akita/models/documents.model';
import { UIService } from '../../../../services/ui.service';

@Component({
  selector: 'app-document-send',
  templateUrl: './document-send.component.html',
  styleUrls: ['./document-send.component.scss'],
})
export class DocumentSendComponent implements OnInit {
  email:string = "";
  @Input() document: Documentos;
  constructor(private modalController: ModalController,
    private ui: UIService) { }
  
  ngOnInit() {
    console.log(this.document);
  }
  send(){
    this.ui.presentToast("Documento enviado por correo", "green", "mail")
    this.CloseModal(null);
  }
  CloseModal(return_) {
    this.modalController.dismiss(return_);
  }
}
