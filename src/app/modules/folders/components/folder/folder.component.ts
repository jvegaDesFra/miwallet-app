import { Component, Input, OnInit } from '@angular/core';
import { Folders } from '../../../../akita/models/folders.model';
import { FoldersService } from '../../../../../app/akita//service/folders.service';
import { DocumentsQuery } from '../../../../akita/query/documents.query';
import { DocumentService } from '../../../../akita/service/documents.service';
import { MenuController } from '@ionic/angular';
import { UIService } from '../../../../services/ui.service';
import { CategoriesServices } from '../../categories.services';
import { AuthenticationService } from '../../../../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {
  @Input() folder: Folders;
  countFiles;
  constructor(private service : FoldersService,
    private documentQuery: DocumentsQuery,
    private documentService: DocumentService,
    private menuController: MenuController,
    private ui: UIService,
    private catService: CategoriesServices,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.documentQuery.getDocumentsByFolder(this.folder.id).subscribe(data=>{
      this.countFiles = data.length
    });
    //console.log(this.countFiles );
    
  }
  deleted(id){
    this.ui.presentAlertConfirm("Al borrarla se eliminarán todos los archivos relacionados","¿Desea eliminar la categoria?",
    (ok) => {
 
      this.catService
      .delete(id, this.authService.currentOwnerValue.id)
      .pipe(first())
      .subscribe({
        next: (res) => {   
          if(res.result){
            let otros = this.documentQuery.getDocumentsByFolderObject(id);
            //console.log(otros);
            otros.forEach(item=>{
              this.documentService.delete(item.id);
            })      
            this.service.delete(id);    
            this.documentService.updateFolder(0);
          } else {
            this.ui.presentToast("Se encontro un errro al eliminar la categoria")
          }
         
         
          
        },
        error: (error) => {
          
        },
      });
    
    }, 
    (error) => console.log(error))
    ;
  }
  setFolder(){
      //alert(this.folder.id)
      this.documentService.updateFolder(this.folder.id);
      this.menuController.close()
   // this.documentQuery.setDocumentosByFolder(this.folder.id);
  }
}
