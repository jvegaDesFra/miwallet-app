export class Environments {
    public static ApiEndPoint = "http://localhost/WSApiRestaurants/";
    public static ApiEndPointCore = "https://v-pos.azurewebsites.net";
    
    public static islocal = true;
    public static enableHelp = true;
    
    public static local = "http://192.168.1.203/API";
    public static production = "https://v-pos.azurewebsites.net";  
    
  
    public static ENDPOINT = Environments.islocal
      ? Environments.local
      : Environments.production; 
    
  
    public static API_ENDPOINT = `${Environments.ENDPOINT}/api`;  
  }