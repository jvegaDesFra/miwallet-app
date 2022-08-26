import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


import { AuthenticationService } from '../services/authentication.service';
import { Environments } from '../../environments/env.constant';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser = this.authenticationService.currentOwnerValue;     
        const isLoggedIn = currentUser && currentUser.token; 
        const isApiUrl = request.url.startsWith(Environments.API_ENDPOINT);         
            
       
        if (isLoggedIn && isApiUrl) {    
            
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
           
        }

        return next.handle(request);
    }
}