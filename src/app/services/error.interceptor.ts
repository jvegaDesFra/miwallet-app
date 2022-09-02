import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { UIService } from './ui.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private ui:UIService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            
            if (err.status === 401) {
               // alert("Token Expirado")
                // auto logout if 401 response returned from api
               this.authenticationService.logout();
               this.ui.presentToast("Se ha iniciado sesion en otro dispositivo",'warning')
              
               //this.app.display = true;
                //location.reload(true);
            }

            const error = err.error.message || err.statusText || err.err.er;
            
            
            return throwError(err);
        }))
    }
}