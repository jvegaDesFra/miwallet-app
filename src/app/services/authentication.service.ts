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

@Injectable({ providedIn: "root" })
export class AuthenticationService {
    private currentOwnerSubject: BehaviorSubject<user>;
    public currentOwner: Observable<user>;

    private currentTokenCreamedic: BehaviorSubject<string>;
    public currentToken: Observable<string>;


    constructor(private http: HttpClient, private navController: NavController, private socket: Socket) {
        this.currentOwnerSubject = new BehaviorSubject<user>(
            JSON.parse(localStorage.getItem("currentOwner") || 'null')
        );
        this.currentOwner = this.currentOwnerSubject.asObservable();

        this.currentTokenCreamedic = new BehaviorSubject<string>(
            JSON.parse(localStorage.getItem("jwtoken" || 'null'))
        );
        this.currentToken = this.currentTokenCreamedic.asObservable();
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
    authenticate(data: any) {
        const body = new HttpParams()
            .set('email', data.email)
            .set('pasw', data.password)
        return this.http.post<any>(`${Environments.API_ENDPOINT}/login.php`, body).pipe(
            map((userInfo) => {
                //console.log(userInfo);

                if(userInfo.result){
                    localStorage.setItem("currentOwner", JSON.stringify(userInfo));
                    this.currentOwnerSubject.next(userInfo);
                    
                }
                return userInfo;
               


            })
        )

        // if (data.email == "jose.juan.vega@outlook.com" && data.password == "1234") {
        //     let user: user = {
        //         correo: "jose.juan.vega@outlook.com",
        //         id: 1,
        //         lastname: "vega",
        //         name: "jose"
        //     }
        //     localStorage.setItem("currentOwner", JSON.stringify(user)); 
        //     this.currentOwnerSubject.next(user);
        //     return of(user)
        // } else {
        //     
        //     return of(null)
        // }
    }//



    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem("currentOwner");
        this.currentOwnerSubject.next({});
        this.socket.disconnect();
        this.navController.navigateRoot('/login')
       // this.router.navigate(['/login']);
       
    }

}
