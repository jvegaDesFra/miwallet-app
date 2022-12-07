import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isPlatform, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { first, last } from 'rxjs/operators';
import { FoldersService } from '../akita/service/folders.service';
import { CategoriesServices } from '../modules/folders/categories.services';
import { CreamedicLoginRequest, CreamedicLoginResponse, CreamedicService } from '../services/creamedic.service';
import { AuthenticationService } from './authentication.service';
import { InterfazService } from './interfaz.service';

export enum loginType {
  Normal = 0,
  Google = 1,
  Facebook = 2
}
@Injectable({
  providedIn: 'root'
})
export class ExternalLoginService {


  creamedic: Observable<CreamedicLoginResponse>;
  creamedicResponse: CreamedicLoginRequest = {
    email: "",
    password: ""
  }
  constructor(private creamedicService: CreamedicService,
    private interfazService: InterfazService,
    private authService: AuthenticationService,
    private catService: CategoriesServices,
    private folderService: FoldersService,
    private navController: NavController,
    private http: HttpClient



  ) {
    this.creamedic = this.creamedicService.Login(this.creamedicResponse);

  }

  LoginCreamedic(): Promise<boolean> {
    return new Promise<any>((resolve, reject) => {
      this.creamedicService.Login(this.creamedicResponse)
        .pipe(first())
        .subscribe({
          next: (result) => {

            if (result.oK) {
              //se guarda el usuario en MW
              this.LoginMW().then(loginMW => {
                if (loginMW) {
                  this.authService.setCurrentTokenValue = result.token;
                  this.authService.setCurrentId = result.user._id;
                  this.navController.navigateRoot("/documents")
                  resolve(true);
                  return;
                } else {
                  this.interfazService.presentToast("No se puede iniciar sesion, intente mas tarde", "error");
                  resolve(false)
                }

              });
            } else {
              resolve(false)
            }
          },
          error: resultLoginCreamedic => {
            let messageError = resultLoginCreamedic.error.err.message ? resultLoginCreamedic.error.err.message : "MW: No es posible conectarse al servidor, intente de nuevo mas tarde";
            this.interfazService.presentToast(messageError, "error");

            resolve(false)

          }
        })
    })

  }
  LoginMW(): Promise<boolean> {
    return new Promise<any>((resolve) => {
      this.authService.authenticate(this.creamedicResponse)
        .pipe(first())
        .subscribe({
          next: (userInfo) => {
            console.log(userInfo);

            if (userInfo.result == false) {
              alert("")
              this.interfazService.presentToast(userInfo.message, "error")
              //return;
              resolve(false);
            }
            this.catService
              .getCAtegories(this.authService.currentOwnerValue.id)
              .pipe(first())
              .subscribe({
                next: (res) => {
                  res.forEach(element => {
                    this.folderService.add(element.categoria, element.color, element.id);
                  });
                  resolve(true);
                },
                error: (error) => { },
              });

          },
          error: error => {
            resolve(false);
            //console.log(error);
            // loader.dismiss();
            //let messageError = error.error.message ? error.error.message : "No es posible conectarse al servidor, intente de nuevo mas tarde";

            //this.interfazService.presentToast(messageError, "error")
          }
        });

    })
  }
  LoginMWGoogle(email: string, name: string, lastname:string): Promise<boolean> {
    return new Promise<any>((resolve) => {

      this.authService.authenticateGoogle(email)
        .pipe(first())
        .subscribe({
          next: (userInfo) => {
            console.log(userInfo);

            if (userInfo.result == false) {
              //alert("")
              if (!(userInfo.message == "No existe el usuario")) {
                this.interfazService.presentToast(userInfo.message, "error");
                resolve(false);
              } else {
                
                this.creamedicService.registerSocial({
                  email: email,
                  nombre: name,
                  apellido: lastname,
                  celular: ""
                  
                })
                  .pipe(first())
                  .subscribe({
                    next: (res) => {
                      this.authService.register({
                        email: email,
                        name: name,
                        lastname: lastname,
                        password: "Creamedic_2022",
                        passwordConfirm: "Creamedic_2022",
                        phone: ""
                      })
                      .pipe(first())
                      .subscribe({
                        next: (userInfo) => {
                          //c console.log(userInfo);
                          
                          if (userInfo.result) {
                            //this.interfazService.presentToast("Correo registrado, active su cuenta para continuar", "dark");
                            resolve(true);
                          } else {
                            this.interfazService.presentToast(userInfo.message, "warning");
                          }
                        },
                        error: error => {
                          //loader.dismiss();
                         // let messageError = error.error.message ? error.error.message : "No es posible conectarse al servidor, intente de nuevo mas tarde";
                         let messageError = "Problemas de sincronización, intente mas tarde";
                          this.interfazService.presentToast(messageError, "error")
                        }
                      });
                    },
                    error: (error) => { },
                  });

              }



              //return;

            }
            this.catService
              .getCAtegories(this.authService.currentOwnerValue.id)
              .pipe(first())
              .subscribe({
                next: (res) => {
                  this.folderService
                  res.forEach(element => {
                    this.folderService.add(element.categoria, element.color, element.id);
                  });
                  resolve(true);
                },
                error: (error) => { },
              });

          },
          error: error => {
            console.log(error);

            resolve(false);
            //console.log(error);
            // loader.dismiss();
            //let messageError = error.error.message ? error.error.message : "No es posible conectarse al servidor, intente de nuevo mas tarde";

            //this.interfazService.presentToast(messageError, "error")
          }
        });

      return;
      if (isPlatform('android')) {

      } else if (isPlatform('ios')) {

      } else {

        this.authService.authenticateGoogle(this.creamedicResponse)
          .pipe(first())
          .subscribe({
            next: (userInfo) => {
              console.log(userInfo);

              if (userInfo.result == false) {
                alert("")
                this.interfazService.presentToast(userInfo.message, "error")
                //return;
                resolve(false);
              }
              this.catService
                .getCAtegories(this.authService.currentOwnerValue.id)
                .pipe(first())
                .subscribe({
                  next: (res) => {
                    res.forEach(element => {
                      this.folderService.add(element.categoria, element.color, element.id);
                    });
                    resolve(true);
                  },
                  error: (error) => { },
                });

            },
            error: error => {
              resolve(false);
              //console.log(error);
              // loader.dismiss();
              //let messageError = error.error.message ? error.error.message : "No es posible conectarse al servidor, intente de nuevo mas tarde";

              //this.interfazService.presentToast(messageError, "error")
            }
          });
      }


    })
  }
  LoginMWFacebook(): Promise<boolean> {
    return new Promise<any>((resolve) => {
      this.authService.authenticateFacebook(this.creamedicResponse)
        .pipe(first())
        .subscribe({
          next: (userInfo) => {
            console.log(userInfo);

            if (userInfo.result == false) {
              alert("")
              this.interfazService.presentToast(userInfo.message, "error")
              //return;
              resolve(false);
            }
            this.catService
              .getCAtegories(this.authService.currentOwnerValue.id)
              .pipe(first())
              .subscribe({
                next: (res) => {
                  res.forEach(element => {
                    this.folderService.add(element.categoria, element.color, element.id);
                  });
                  resolve(true);
                },
                error: (error) => { },
              });

          },
          error: error => {
            resolve(false);
            //console.log(error);
            // loader.dismiss();
            //let messageError = error.error.message ? error.error.message : "No es posible conectarse al servidor, intente de nuevo mas tarde";

            //this.interfazService.presentToast(messageError, "error")
          }
        });

    })
  }

  //user:any
  LoginGoogleCreamedic(email: string, name: string, lastname:string) {
    //let data = {
    //  idToken: user.authentication.idToken,
    //  email: user.email,
    //  id: user.id
    //}
    if (isPlatform('android')) {
      this.creamedicService.googleSuccess(email)
        .pipe(first())
        .subscribe({
          next: (res) => {
            console.log(res);

          },
          error: (error) => {
            //crear nueva cuenta 
            //let plugin = {
            //  "result": true,
            //  "token": "gUQhMq3vq7daw1PmT4eavQQpmjdc2IVIqIHebyVtt45ML2nH",
            //  "name": "JOSE VEGA",
            //  "email": "jose.juan.vega13@outlook.com",
            //  "id": 694
            //}
            //this.authService.setNewSession(plugin);
            console.log(email);

            this.LoginMWGoogle(email, name, lastname).then(loginCreamedicGoogle => {
              console.log(loginCreamedicGoogle);

              if (loginCreamedicGoogle) {
                //this.authService.setCurrentTokenValue = result.token;
                this.navController.navigateRoot("/documents")
                // resolve(true);
                return;
              } else {
                this.interfazService.presentToast("No se puede iniciar sesion, intente mas tarde", "error");
                //   resolve(false)
              }

            });
          },
        });

    } else {


      this.LoginMWGoogle(email, name, lastname).then(loginCreamedicGoogle => {
        if (loginCreamedicGoogle) {
          //this.authService.setCurrentTokenValue = result.token;
          this.navController.navigateRoot("/documents")
          // resolve(true);
          return;
        } else {
          this.interfazService.presentToast("No se puede iniciar sesion, intente mas tarde", "error");
          //   resolve(false)
        }

      });
    }
  }

  LoginFacebookCreamedic(user: any) {
    //let data = {
    //  idToken: user.authentication.idToken,
    //  email: user.email,
    //  id: user.id
    //}
    this.LoginMWFacebook().then(loginCreamedicGoogle => {
      if (loginCreamedicGoogle) {
        //this.authService.setCurrentTokenValue = result.token;
        this.navController.navigateRoot("/documents")
        // resolve(true);
        return;
      } else {
        this.interfazService.presentToast("No se puede iniciar sesion, intente mas tarde", "error");
        //   resolve(false)
      }

    });
  }

  login(type: loginType): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      switch (type) {
        case loginType.Normal:
          resolve(true);
          break;
        case loginType.Facebook:
          resolve(false);
          break;
        case loginType.Google:
          resolve(false);
          break;

        default:
          break;
      }
      resolve(true);
    })
  }
  register(type: loginType): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      switch (type) {
        case loginType.Normal:
          resolve(false);
          break;
        case loginType.Facebook:
          resolve(false);
          break;
        case loginType.Google:
          resolve(false);
          break;

        default:
          break;
      }
      resolve(true);
    })
  }
  //creamedics(){
  //  let loginCreamedic:CreamedicLoginRequest = {
  //
  //  }; 
  //  this.creamedicService.Login(loginCreamedic)
  //  .pipe(first())
  //  .subscribe({
  //    next: (result) => {
  //      //se guarda el token de creamedic
  //      //this.authService.setCurrentTokenValue = result.token;
  //   
  //     
  //    },
  //    error: error => {
  //      console.log(error);
  //     // loader.dismiss();
  //      let messageError = error.error.err.message ? error.error.err.message : "No es posible conectarse al servidor, intente de nuevo mas tarde";
  //      this.interfazService.presentToast(messageError, "error")
  //    }
  //  })
  //}
}
