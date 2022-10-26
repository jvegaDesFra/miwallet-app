import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Environments } from 'src/environments/env.constant';

export class CreamedicRegisterRequest {
  email?: string;
  password?: string;
  nombre?: string;
  apellido?: string;
  celular?: string;
}

export class userSaveDB {
  role?: string;
  state?: boolean;
  google?: boolean;
  facebook?: boolean;
  codigoPais?: number;
  fechaCreacion?: Date;
  _id?: string;
  email?: string;
  nombre?: string;
  apellido?: string;
  __v?: number;
}
export class error {
  message?: string;
}
export class CreamedicRegisterResponse {
  ok?: boolean;
  userSaveDB?: userSaveDB;
  err?: error;
}

export class CreamedicLoginRequest {
  email?: string;
  password?: string;
}
export class user {
  role?: string;
  state?: boolean;
  google?: boolean;
  facebook?: boolean;
  codigoPais?: number;
  fechaCreacion?: Date;
  _id?: string;
  email?: string;
  nombre?: string;
  apellido?: string;
  __v?: string;
  uid?: string;
}
export class CreamedicLoginResponse {
  oK?: boolean;
  ok?: boolean;
  user?: user;
  token?: string;
  err?: error;
}



@Injectable({
  providedIn: 'root'
})
export class CreamedicService {

  url: string = "https://services.creamedicdigital.mx";
  constructor(private http: HttpClient) { }


  Register(request: CreamedicRegisterRequest) {
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded'
    }
    const body = new HttpParams()
      .set('email', request.email)
      .set('password', request.password)
      .set('nombre', request.nombre)
      .set('apellido', request.apellido)
      .set('celular', request.celular)

    return this.http
      .post<any>(`${this.url}/registro`, body, { headers })
      .pipe(
        map((response: CreamedicRegisterResponse) => {
          return response;
        })
      );
  }

  Login(request: CreamedicLoginRequest) {
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded'
    }
    const body = new HttpParams()
      .set('email', request.email)
      .set('password', request.password)

    return this.http
      .post<any>(`${this.url}/login`, body, { headers })
      .pipe(
        map((response: CreamedicLoginResponse) => {
          return response;
        })
      );
  }
}
