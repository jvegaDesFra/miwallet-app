import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Environments } from '../../../environments/env.constant';
import { first } from 'rxjs/operators';
import { DocumentService } from '../../akita/service/documents.service';
import { file } from '../../akita/models/documents.model';
import { FoldersService } from '../../akita/service/folders.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CertificadoService } from '../documents/documents.service';
import { CategoriesServices } from '../folders/categories.services';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {
    route: string = "";
    routeAndroid: string = "file:///data/user/0/com.miwallet.fastpass/files/";//"file:///storage/emulated/0/Documents/";
    routeIos: string = "file:///storage/emulated/0/Documents/";
  constructor(private catService: CategoriesServices,
    private authService: AuthenticationService,
    private fService : FoldersService,
    private certService: CertificadoService,
    private documentsService: DocumentService) {
  }

  getFolders(): Promise<boolean>{
    return new Promise<boolean>((resolve, reject)=>{
        this.catService
        .getCAtegories(this.authService.currentOwnerValue.id)
        .pipe(first())
        .subscribe({
          next: (res) => {   
            //console.log(res);
            res.forEach(element => {
              this.fService.add(element.categoria, element.color , element.id);
            });
            resolve(true);
          },
          error: (error) => {
            resolve(false);
          },
        });
    })
   
  }

  getDocuments(isFirst: boolean = false): Promise<boolean>{
    return new Promise<boolean>((resolve, reject)=>{
        this.certService
        .getDocuments(this.authService.currentOwnerValue.id)
        .pipe(first())
        .subscribe({
          next: (res) => {
            //console.log(res);
            res.forEach(element => {
               // console.log(element);
                
              let type = this.getType(element.filename);
            
              
              let file: file = {
                blob: undefined,
                name: element.filename,
                size: 0,
                type: type
              }
              this.documentsService.add(element.title, element.id, file, this.route + element.filename, element.color, element.id_document, element.sync);

              this.documentsService.updateSync(element.id_document,  element.sync);
    
            });
            resolve(true);
          },
          error: (error) => {
            resolve(false);
          },
        });
    })
    
  }
  getType(filename: string) {
    let ext = filename.substring(filename.lastIndexOf('.') + 1);
    let result = "";
    switch (ext) {
      case "png":
        result = "image/png";
        break;
      case "gif":
        result = "image/gif";
        break;
      case "jpg":
        result = "image/jpeg";
        break;
      case "pdf":
        result = "application/pdf";
        break;
      case "xlsx":
        result = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;
      case "pptx":
        result = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;
      case "docx":
        result = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        break;
      default:
        break;
    }

    return result;
  }
}