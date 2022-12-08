import { isPlatform } from "@ionic/angular";

export class Environments {
    
    public static islocal = true;
    public static enableHelp = true;
    
    //public static local = "https://192.168.1.193/wallet.mifastpass.com.mx/app";
    public static local = "http://localhost/miwallet";
    public static production = "https://wallet.creamedicdigital.mx/app"; 
    
    //192.168.1.203
    //172.20.10.2
    public static ENDPOINTANDROID = Environments.islocal ? 'http://172.20.10.2/miwallet' : Environments.production;
    
  
    public static ENDPOINT = Environments.islocal
      ?  Environments.local
      : Environments.production; 
    

    
    public static API_ENDPOINT = isPlatform('android') ? Environments.ENDPOINTANDROID: `${Environments.ENDPOINT}`; 
    
    constructor(){
      console.log(Environments.API_ENDPOINT);
      console.log(isPlatform('android'));
      
    }
  }

  export const firebaseConfig = {
    apiKey: "AIzaSyAYEu6Jk642JHKKtSC5galMO67lZfyUjdA",
    authDomain: "mi-wallet-medic.firebaseapp.com",
    databaseURL: "",
    projectId: "mi-wallet-medic",
    storageBucket: "mi-wallet-medic.appspot.com",
    messagingSenderId: "129703565669",
    appId: "1:129703565669:web:99046cad8c7a4099fea98c",
    measurementId: ""
  }