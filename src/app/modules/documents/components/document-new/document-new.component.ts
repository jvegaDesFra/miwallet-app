import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FoldersQuery } from '../../../../akita/query/folders.query';
import { Folders } from '../../../../akita/models/folders.model';
import { DocumentService } from '../../../../akita/service/documents.service';
import write_blob from 'capacitor-blob-writer';
import { Filesystem, Directory, FilesystemDirectory, FilesystemEncoding, Encoding } from '@capacitor/filesystem';
import { file } from '../../../../akita/models/documents.model';
import { UIService } from '../../../../services/ui.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { CertificadoService } from '../../documents.service';
import { first } from 'rxjs/operators';
import { HandlerService } from '../../../handler/handler.service';

//const APP_DIRECTORY = Directory.Documents;
const APP_DIRECTORY = Directory.Data;
@Component({
  selector: 'app-document-new',
  templateUrl: './document-new.component.html',
  styleUrls: ['./document-new.component.scss'],
})
export class DocumentNewComponent implements OnInit {
  folders$: Observable<Folders[]>;
  dirBase = '';
  @ViewChild('filepicker') uploader: ElementRef;
  constructor(private modalController: ModalController,
    private query: FoldersQuery,
    private documentsService: DocumentService,
    private ui: UIService,
    private auth: AuthenticationService,
    private certService: CertificadoService,
    private handler: HandlerService
  ) { }
  get validForm() {


    return this.nombre != "" && this.currentFolder && this.selectedFile;
  }
  ngOnInit() {
    this.folders$ = this.query.getFolders$;
    //console.log("APP_DIRECTORY", APP_DIRECTORY);

    //  this.loadDocumentos();
    //this.fileRead();
  }
  async loadDocumentos() {
    const folderContent = await Filesystem.readdir({
      directory: APP_DIRECTORY,
      path: ""
    });
    folderContent.files.map(file => {
      //console.log(file);
      Filesystem.getUri({
        directory: APP_DIRECTORY,
        path: file
      }).then(pathFile => {
        //console.log(pathFile);

      })
    });
  }
  async fileRead() {
    let contents = await Filesystem.readFile({
      path: 'IMG_20220707_192256.jpg',
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
    //console.log("Read file", contents);
  }
  CloseModal(return_) {

    this.modalController.dismiss(return_);
  }
  currentFolder = undefined;
  nombre: string = "";
  handleChange(ev) {
    //console.log(ev.target);

    this.currentFolder = ev.target.value;

    //console.log(this.currentFolder);

  }
  save() {
   


    this.ui.loader("").then(loader => {
      loader.present();
      this.certService.add(this.nombre, this.currentFolder.id, this.auth.currentOwnerValue.id, this.selectedFile.blob)
        .pipe(first())
        .subscribe({
          next: (res) => {

            write_blob({
              directory: APP_DIRECTORY,
              path: `${this.selectedFile.name}`,
              blob: this.selectedFile.blob,
              on_fallback(error) {
                console.error('error: ', error);
              }
            })
              .then((result: any) => {
                console.log(result);
                let ext = this.selectedFile.name.substring(this.selectedFile.name.lastIndexOf('.') + 1);
                let newfilename = result
                Filesystem.rename({
                  directory: APP_DIRECTORY,
                  toDirectory: APP_DIRECTORY,
                  from: this.selectedFile.name,
                  to: res.hash + "_." + ext
                }).then(rename => {
                  console.log(rename);
                  console.log(result);
                  this.handler.getDocuments();
                  //this.documentsService.add(this.nombre, this.currentFolder.id, this.selectedFile, result, this.currentFolder.color, "", 0);
                  loader.dismiss();
                  this.ui.presentToast("Se ha guardado el archivo", "green", 'checkmark-circle');
                  this.CloseModal(null);
                })



              });
          },
          error: (error) => {

          },
        });

    })


  }
  compareWith(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  selectedFile: file | undefined;
  deleteFile() {
    this.selectedFile = undefined;
  }
  getBase64(file) {
    
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("test", reader);
        resolve(reader.result)
      };
      reader.onerror = error => reject(error);
    });
  }

  base64File: any;
  async fileSelected($event) {
    const selected = $event.target.files[0];
    //console.log(selected);
    this.selectedFile = {
      type: selected.type,
      name: selected.name,
      size: selected.size,
      blob: selected
    }

    return;
    let mimetype = selected.type;
    let name = selected.name;
    let size = selected.size;

    write_blob({
      directory: APP_DIRECTORY,
      path: `${selected.name}`,
      blob: selected,
      on_fallback(error) {
        console.error('error: ', error);
      }
    }).then(result => {
      //console.log(result);

    });


  }
  addFile() {
    this.uploader.nativeElement.click();
  }
}
