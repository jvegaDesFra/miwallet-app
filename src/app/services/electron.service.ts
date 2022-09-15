import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronHelperService {

  constructor(private electronService: ElectronService) { }


  async OpenFile(filename:string){
    let result = await this.electronService.ipcRenderer.invoke('open-file-mw', filename);
    console.log(result);
    
    return result;
  }

  async SaveFile(filename: string, fileBase64:string){
    let result = await this.electronService.ipcRenderer.invoke('save-file-mw', filename, fileBase64);
    console.log(result);
    return result;
  }

  async ExistFile(filename:string){
    let result = await this.electronService.ipcRenderer.invoke('exist-file-mw', filename);
    console.log(result);
    
    return result;
  }

  isElectronApp(){
    return this.electronService.isElectronApp;
  }
}
