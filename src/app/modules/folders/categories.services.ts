import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Environments } from '../../../environments/env.constant';


@Injectable({
  providedIn: 'root'
})
export class CategoriesServices {

  constructor(private http: HttpClient) {
  }

  getCAtegories(id) {
    return this.http
      .get<any>(`${Environments.API_ENDPOINT}/categories/get.php?id=${id}`)
      .pipe(
        map((list) => {
          return list;
        })
      );
  }
  add(nombre, color, id_usuario) {
    const body = new HttpParams()
            .set('categoria',nombre)
            .set('color', color)
            .set('id_usuario',id_usuario )   
    return this.http
      .post<any>(`${Environments.API_ENDPOINT}/categories/add.php`, body)
      .pipe(
        map((result) => {
          //console.log(result);
          
          return result;
        })
      );
  }
  delete(id_categoria, id_usuario) {
    const body = new HttpParams()
            .set('categoria',id_categoria)
          
            .set('id_usuario',id_usuario )   
    return this.http
      .post<any>(`${Environments.API_ENDPOINT}/categories/delete.php`, body)
      .pipe(
        map((result) => {
          //console.log(result);
          
          return result;
        })
      );
  }
}