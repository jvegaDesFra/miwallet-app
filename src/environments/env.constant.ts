import { isPlatform } from "@ionic/angular";

export class Environments {
    
    public static islocal = true;
    public static enableHelp = true;
    
    //public static local = "https://192.168.1.193/wallet.mifastpass.com.mx/app";
    public static local = "http://localhost/miwallet";
    public static production = "https://wallet.creamedicdigital.mx/app"; 
    
    public static ENDPOINTANDROID = Environments.islocal ? 'http://192.168.1.203/miwallet' : Environments.production;
    
  
    public static ENDPOINT = Environments.islocal
      ?  Environments.local
      : Environments.production; 
    

    
    public static API_ENDPOINT = isPlatform('android') ? Environments.ENDPOINTANDROID: `${Environments.ENDPOINT}`; 
    
    constructor(){
      console.log(Environments.API_ENDPOINT);
      console.log(isPlatform('android'));
      
    }
  }