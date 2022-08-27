import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Environments } from '../../../environments/env.constant';


@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  constructor(private http: HttpClient) {
  }

  sync(file, id_documento) {
    const formData: FormData = new FormData();

    formData.append('cf', file);

    formData.append('id_documento', id_documento);
    return this.http
      .post<any>(`${Environments.API_ENDPOINT}/documents/sync.php`, formData)
      .pipe(
        map((result) => {
          //console.log(result);

          return result;
        })
      );
  }

  add(nombre, id_categoria, id_usuario, file) {
    const formData: FormData = new FormData();
    formData.append('id', '');
    formData.append('nc', nombre);
    formData.append('cert', "false");
    formData.append('tp', id_categoria);
    formData.append('llave', '');
    //formData.append('t', "BH/Ji54KYad)AwC$Qhyj8kIvc(RAwDh1FTjEuK8c6a52my0n" );
    formData.append('em', "false");
    formData.append('cf', file);
    formData.append('tt', "n");
    formData.append('ac', "subirCertificadoNuevo");
    formData.append('id_usuario_get', id_usuario);
    return this.http
      .post<any>(`${Environments.API_ENDPOINT}/documents/add.php`, formData)
      .pipe(
        map((result) => {
          //console.log(result);

          return result;
        })
      );
  }
  getDocuments(id) {
    return this.http
      .get<any>(`${Environments.API_ENDPOINT}/documents/get.php?id_usuario_get=${id}`)
      .pipe(
        map((list) => {
          return list;
        })
      );
  }
  delete(id_documento) {
    const body = new HttpParams()
      .set('id', id_documento)
    return this.http
      .post<any>(`${Environments.API_ENDPOINT}/documents/delete.php`, body)
      .pipe(
        map((result) => {
          //console.log(result);

          return result;
        })
      );
  }


  download(urlEncode: string) {
    return this.http.get(
      `${Environments.ENDPOINT}/pdf/CERT_API.php?${urlEncode}`,
      {
        responseType: 'blob',
      }
    )
      .pipe(
        map((fileBlob: Blob) => {
          //console.log(result);

          return fileBlob;
        })
      );
  }

  updateSyncDownload(){
    return this.http.get(
      `${Environments.ENDPOINT}/documents/updateSync.php}`
    )
      .pipe(
        map((result) => {
          //console.log(result);

          return result;
        })
      );
  }
}