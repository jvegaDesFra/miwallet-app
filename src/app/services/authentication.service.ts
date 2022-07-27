import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
//import { Menu, MenuGeneral, MenuList, SubmenuList } from "../_models/menu";
// { SubMenus, User, UserInfo } from "../_models/user";
import { Environments } from "../../environments/env.constant";
import { user } from "../akita/models/user.model";


@Injectable({ providedIn: "root" })
export class AuthenticationService {
    private currentOwnerSubject: BehaviorSubject<user>;
    public currentOwner: Observable<user>;


    constructor(private http: HttpClient) {
        this.currentOwnerSubject = new BehaviorSubject<user>(
            JSON.parse(localStorage.getItem("currentOwner") || 'null')
        );
        this.currentOwner = this.currentOwnerSubject.asObservable();

    }

    public get currentOwnerValue(): user {
        return this.currentOwnerSubject.value;
    }





    authenticate(data: any) {
        // return this.http.post<any>(`${Environments.API_ENDPOINT}/users/authenticate`, data).pipe(
        //     map((userInfo) => {
        //         console.log(userInfo);
        //         localStorage.setItem("currentOwner", JSON.stringify(userInfo)); 
        //         this.currentOwnerSubject.next(userInfo);
        //         return userInfo;
        //     })
        // )

        if (data.email == "jose.juan.vega@outlook.com" && data.password == "1234") {
            let user: user = {
                correo: "jose.juan.vega@outlook.com",
                id: 1,
                lastname: "vega",
                name: "jose"
            }
            localStorage.setItem("currentOwner", JSON.stringify(user)); 
            this.currentOwnerSubject.next(user);
            return of(user)
        } else {
            
            return of(null)
        }
    }



    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem("currentOwner");
        this.currentOwnerSubject.next({});
    }

}
