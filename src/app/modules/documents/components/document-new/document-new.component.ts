import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FoldersQuery } from '../../../../akita/query/folders.query';
import { Folders } from '../../../../akita/models/folders.model';
import { DocumentService } from '../../../../akita/service/documents.service';
import write_blob from 'capacitor-blob-writer';
import { Filesystem, Directory, FilesystemDirectory, FilesystemEncoding } from '@capacitor/filesystem';
import { file } from 'src/app/akita/models/documents.model';

const APP_DIRECTORY = Directory.Documents;
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
    private documentsService : DocumentService) { }

  ngOnInit() {
    this.folders$ = this.query.getFolders$; 
    console.log("APP_DIRECTORY", APP_DIRECTORY);

 //  this.loadDocumentos();
  //this.fileRead();
  }
  async loadDocumentos(){
    const folderContent = await Filesystem.readdir({
      directory: APP_DIRECTORY,
      path: ""
    });
    folderContent.files.map(file => {
     console.log(file);
     Filesystem.getUri({
      directory: APP_DIRECTORY,
      path: file
     }).then(pathFile => {
        console.log(pathFile);
        
     })
    });
  }
  async fileRead() {
    let contents = await Filesystem.readFile({
      path: 'IMG_20220707_192256.jpg',
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
    console.log("Read file", contents);
  }
  CloseModal(return_) {
  
    this.modalController.dismiss(return_);
  }
  currentFolder = undefined;
  nombre:string = "";
  handleChange(ev) {
    console.log(ev.target);
    
    this.currentFolder = ev.target.value;

    console.log(this.currentFolder);
    
  }
  save(){
    write_blob({
      directory: APP_DIRECTORY,
      path: `${this.selectedFile.name}`,
      blob: this.selectedFile.blob,
      on_fallback(error) {
        console.error('error: ', error);
      }
    }).then(result=>{
      console.log(result);
      this.documentsService.add(this.nombre, this.currentFolder.id, this.selectedFile, result, this.currentFolder.color);
      this.CloseModal(null);
    });
  
  }
  compareWith(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  selectedFile: file | undefined;
  deleteFile(){
    this.selectedFile  = undefined;
  }
  async fileSelected($event) {
    const selected = $event.target.files[0];
    console.log(selected);
    this.selectedFile = {
      type: selected.type,
      name : selected.name,
      size : selected.size,
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
    }).then(result=>{
      console.log(result);
      
    });
 
   
  }
  addFile() {
    this.uploader.nativeElement.click();
  }
}
