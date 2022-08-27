import { Component, Input, OnInit } from '@angular/core';
import { DocumentService } from '../../../../akita/service/documents.service';
import { Documentos } from '../../../../akita/models/documents.model';
import { isPlatform, ModalController } from '@ionic/angular';
import { Directory, Filesystem } from '@capacitor/filesystem';
//const APP_DIRECTORY = Directory.Documents;
const APP_DIRECTORY = Directory.Data;
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { UIService } from '../../../../services/ui.service';
import { DocumentSendComponent } from '../document-send/document-send.component';
import { CertificadoService } from '../../documents.service';
import { first } from 'rxjs/operators';
import { Share } from '@capacitor/share';
import { HandlerService } from 'src/app/modules/handler/handler.service';
export enum StatusFile {
  Local = "local",
  Cloud = "cloud",
  NotFound = "notFound",
  Download = "download"
};
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})

export class DocumentComponent implements OnInit {
  @Input() document: Documentos;
  existeFile: boolean = false;
  StatusFile:StatusFile;
  constructor(private handleService: HandlerService,
    private certService: CertificadoService,
    private documentsService: DocumentService, private fileOpener: FileOpener, private ui: UIService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.existFile().then(result => {
      this.existeFile = result;
    });
  }

  getIcon(type: StatusFile) {
    let icon = "";
    switch (type) {
      case StatusFile.Local:
        icon = "cloud-upload";
        break;
      case StatusFile.Cloud:
        icon = "cloud";
        break;
      case StatusFile.NotFound:
        icon = "warning";
        break;
      case StatusFile.Download:
        icon = "cloud-download";
        break;
      default:
        break;
    }
    return icon;
  }
  get StateFile() {
    let result: StatusFile;
    if (this.existeFile && this.document.sync == 0) {
      result = StatusFile.Local;
    }
    if (this.existeFile && this.document.sync == 1) {
      result = StatusFile.Cloud;
    }
    if (!this.existeFile && this.document.sync == 0) {
      result = StatusFile.NotFound;
    }
    if (!this.existeFile && this.document.sync == 1) {
      result = StatusFile.Download;
    }
    return result
  }

  async delete(document) {
    console.log(document);
    // return;

    this.ui.presentAlertConfirm("", "¿Desea eliminar el archivo " + this.document.title + "?",
      (ok) => {
        this.ui.loader("").then(loader => {
          loader.present();
          this.certService
            .delete(document.id)
            .pipe(first())
            .subscribe({
              next: async (res) => {
                //console.log(res);
                // if (res.result) {
                Filesystem.deleteFile({
                  path: document.file.name,
                  directory: APP_DIRECTORY
                }).then(result => {
                  console.log("DELETED ", result);
                }).catch(error => {
                  console.log("Error ", error);
                })

                this.documentsService.delete(document.id);
                // }
                loader.dismiss();
              },
              error: (error) => {
                loader.dismiss();
              },
            });
        })


      },
      (error) => console.log(error))
  }

  async share(document) {
    console.log(document);


    Filesystem.getUri({
      directory: APP_DIRECTORY,
      path: document.file.name,
    }).then(url_ => {
      console.log("----URI---", url_);
      Share.share({
        title: "documento",
        // text: document.title,
        url: url_.uri,
        dialogTitle: 'Share with buddies',
      }).then(share => {
        console.log(share);

      }).catch(error => {
        console.log(error);

      });
    })


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
      //console.log(role);

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

  //Pasar a un service 
  existFile(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      Filesystem.readFile({
        directory: APP_DIRECTORY,
        path: this.document.file.name,
      }).then(readFile => {
        resolve(true);

      }).catch(error => {
        resolve(false)

      })
    })

  }

  openFile() {
    // console.log(this.document.filePath);

    Filesystem.getUri({
      directory: APP_DIRECTORY,
      path: this.document.file.name,
    }).then(url_ => {
      console.log("----URI---", url_);
      this.fileOpener.open(url_.uri, this.document.file.type)
        .then(() => console.log('File is opened'))
        .catch(e => {
          this.ui.presentToast("No se encuentra el archivo en el dispositivo", "warning", "alert-circle")
          console.log('Error opening file', e)
        });
    })

  }
  async openFile2(name) {
    // //console.log(isPlatform('android'));

    //if (isPlatform('hybrid')) {
    //  // Get the URI and use our Cordova plugin for preview
    //  const file_uri = await Filesystem.getUri({
    //    directory: APP_DIRECTORY,
    //    path: name
    //  });
    //
    //  //this.previewAnyFile.preview(file_uri.uri)
    //  //  .then((res: any) => //console.log(res))
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

  async sync_file(state:StatusFile ) {
    console.log(state);
    switch (state) {
      case StatusFile.Local:
        console.log("subiedno");
        this.existFile().then(async exist=>{
          if(exist){
            const file = await Filesystem.readFile({
              directory: APP_DIRECTORY,
              path: this.document.file.name
            });
            const blob = this.b64toBlob(file.data, this.document.file.type);
            const blobUrl = URL.createObjectURL(blob);
            console.log("blob", blob);
            console.log("blobUrl", blobUrl);
            this.certService.sync(blob, this.document.id)
            .pipe(first())
            .subscribe({
              next: (res) => {
                console.log(res);
                  if(res.result){
                    this.handleService.getDocuments();
                  }
              },
              error: (error) => {
      
              },
            });
          }
       })
        
        break;
      case StatusFile.Cloud:
       this.ui.presentToast("Archivo respaldado", "green", "cloud")
        break;
      case StatusFile.NotFound:
        
        break;
      case StatusFile.Download:
        console.log("descargando");
        break;
      default:
        break;
    }
    
    //return;
    
   // Filesystem.getUri({
   //   directory: APP_DIRECTORY,
   //   path: this.document.file.name,
   // }).then(url_ => {
//
//
   // })
   // console.log(this.document);

  

   


   
  }
  // }
}
