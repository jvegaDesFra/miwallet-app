import { Component, Input, OnInit } from '@angular/core';
import { DocumentService } from '../../../../akita/service/documents.service';
import { Documentos } from '../../../../akita/models/documents.model';
import { isPlatform, ModalController } from '@ionic/angular';
import { Directory, Filesystem } from '@capacitor/filesystem';
const APP_DIRECTORY = Directory.Documents;
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { UIService } from '../../../../services/ui.service';
import { DocumentSendComponent } from '../document-send/document-send.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  @Input() document: Documentos;
  constructor(private documentsService: DocumentService, private fileOpener: FileOpener, private ui: UIService, private modalCtrl: ModalController) { }

  ngOnInit() {
   
  }

  delete(id) {
    this.ui.presentAlertConfirm("", "¿Desea eliminar el archivo " + this.document.title + "?",
      (ok) => this.documentsService.delete(id),
      (error) => console.log(error))
  }
  async openSend() {
    const modal = await this.modalCtrl.create({
      component: DocumentSendComponent,
      componentProps: {
        document: this.document
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(role);

    }
  }
  open(url) {
    window.open(url, "_system");
  }
  b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  openFile() {
    this.fileOpener.open(this.document.filePath, this.document.file.type)
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error opening file', e));
  }
  async openFile2(name) {
    // console.log(isPlatform('android'));

    //if (isPlatform('hybrid')) {
    //  // Get the URI and use our Cordova plugin for preview
    //  const file_uri = await Filesystem.getUri({
    //    directory: APP_DIRECTORY,
    //    path: name
    //  });
    //
    //  //this.previewAnyFile.preview(file_uri.uri)
    //  //  .then((res: any) => console.log(res))
    //  //  .catch((error: any) => console.error(error));
    //} else {
    // Browser fallback to download the file
    const file = await Filesystem.readFile({
      directory: APP_DIRECTORY,
      path: name
    });

    const blob = this.b64toBlob(file.data, '');
    const blobUrl = URL.createObjectURL(blob);

    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = blobUrl;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(blobUrl);
    a.remove();
  }
  // }
}
