import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
//import { Menu, MenuGeneral, MenuList, SubmenuList } from "../_models/menu";
// { SubMenus, User, UserInfo } from "../_models/user";
import { Environments } from "../../environments/env.constant";
import { user } from "../akita/models/user.model";
import { NavController } from "@ionic/angular";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { UIService } from "./ui.service";
import { Socket } from 'ngx-socket-io';

import { resetStores } from "@datorama/akita";
import { DocumentStore } from "../akita/state/documents.store";
import { FoldersStore } from "../akita/state/folders.store";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
    private currentOwnerSubject: BehaviorSubject<user>;
    public currentOwner: Observable<user>;

    private currentTokenCreamedic: BehaviorSubject<string>;
    public currentToken: Observable<string>;

    private currentIDCreamedic: BehaviorSubject<string>;
    public currentID: Observable<string>;


    constructor(
        private docStore: DocumentStore,
        private folStore: FoldersStore,
        private http: HttpClient, private navController: NavController, private socket: Socket) {
        this.currentOwnerSubject = new BehaviorSubject<user>(
            JSON.parse(localStorage.getItem("currentOwner") || 'null')
        );
        this.currentOwner = this.currentOwnerSubject.asObservable();

        this.currentTokenCreamedic = new BehaviorSubject<string>(
            JSON.parse(localStorage.getItem("jwtoken" || 'null'))
        );
        this.currentToken = this.currentTokenCreamedic.asObservable();

        this.currentIDCreamedic = new BehaviorSubject<string>(
            JSON.parse(localStorage.getItem("cremedic" || 'null'))
        );

        this.currentID = this.currentIDCreamedic.asObservable();
    }

    public get currentOwnerValue(): user {
        return this.currentOwnerSubject.value;
    }

    public get currentTokenValue(): string {
        return this.currentTokenCreamedic.value;
    }

    public set setCurrentTokenValue(value: string){
        let token = {
            token: value
        }
        localStorage.setItem("jwtoken", JSON.stringify(token));
        this.currentTokenCreamedic.next(value);
    }

    public set setCurrentId(value: string){
        let id = {
            id: value
        }
        localStorage.setItem("creamedic", JSON.stringify(id));
        this.currentIDCreamedic.next(value);
    }



    recover(data) {
        const body = new HttpParams()
            .set('correo', data)
           
        return this.http.post<any>(`${Environments.API_ENDPOINT}/recover.php`, body).pipe(
            map((userInfo) => {
                //console.log(userInfo);

                return userInfo;
            })
        )
    }

    register(data) {
        const body = new HttpParams()
            .set('email', data.email)
            .set('nombre', data.name + " " + data.lastname)
            .set('password1', data.password)
            .set('password2', data.password)
        return this.http.post<any>(`${Environments.API_ENDPOINT}/register.php`, body).pipe(
            map((userInfo) => {
                //console.log(userInfo);

                return userInfo;
            })
        )
    }
    setNewSession(userInfo: any){
        this.currentOwnerSubject.next(userInfo);
    }
    authenticateGoogle(email: any) {
        const body = new HttpParams()
            .set('email', email)
           // .set('pasw', data.password)
        return this.http.post<any>(`${Environments.API_ENDPOINT}/google.php`, body).pipe(
            map((userInfo) => {
                //console.log(userInfo);

                if(userInfo.result){
                    localStorage.setItem("currentOwner", JSON.stringify(userInfo));
                    this.currentOwnerSubject.next(userInfo);
                    
                }
                return userInfo;
               


            })
        )

       
    }//
    authenticateFacebook(data: any) {
        const body = new HttpParams()
        .set('email', data.email)
        .set('pasw', data.password)
    return this.http.get<any>(`http://localhost:3001/login/facebook/mw`).pipe(
        map((userInfo) => {
                //console.log(userInfo);

                if(userInfo.result){
                    localStorage.setItem("currentOwner", JSON.stringify(userInfo));
                    this.currentOwnerSubject.next(userInfo);
                    
                }
                return userInfo;
               


            })
        )

       
    }//
     
    authenticate(data: any) {
        const body = new HttpParams()
            .set('email', data.email)
            .set('pasw', data.password)
        return this.http.post<any>(`${Environments.API_ENDPOINT}/login.php`, body).pipe(
            map((userInfo) => {
                console.log(userInfo);

                if(userInfo.result){
                    localStorage.setItem("currentOwner", JSON.stringify(userInfo));
                    this.currentOwnerSubject.next(userInfo);
                    
                }
                return userInfo;
               


            })
        )

       
    }//



    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem("currentOwner");
        localStorage.removeItem("creamedic");
        localStorage.removeItem("jwtoken");
        this.currentOwnerSubject.next({});
        this.currentIDCreamedic.next("{}");
        this.currentTokenCreamedic.next("");
        this.docStore.reset();
        this.folStore.reset();
        //resetStores(); 
        this.socket.disconnect();
        this.navController.navigateRoot('/login')
       // this.router.navigate(['/login']);
       
    }

}
