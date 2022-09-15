export class Environments {
    
    public static islocal = false;
    public static enableHelp = true;
    
    public static local = "https://192.168.1.193/wallet.mifastpass.com.mx/app";
    public static production = "https://wallet.creamedicdigital.mx/app";  
    
  
    public static ENDPOINT = Environments.islocal
      ? Environments.local
      : Environments.production; 
    
  
    public static API_ENDPOINT = `${Environments.ENDPOINT}/api`; 

  }