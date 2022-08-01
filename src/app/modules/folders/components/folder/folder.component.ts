import { Component, Input, OnInit } from '@angular/core';
import { Folders } from '../../../../akita/models/folders.model';
import { FoldersService } from '../../../../../app/akita//service/folders.service';
import { DocumentsQuery } from '../../../../akita/query/documents.query';
import { DocumentService } from 'src/app/akita/service/documents.service';
import { MenuController } from '@ionic/angular';

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
    private menuController: MenuController) { }

  ngOnInit() {
    this.documentQuery.getDocumentsByFolder(this.folder.id).subscribe(data=>{
      this.countFiles = data.length
    });
    console.log(this.countFiles );
    
  }
  deleted(id){
    this.service.delete(id);
  }
  setFolder(){
    
      this.documentService.updateFolder(this.folder.id);
      this.menuController.close()
   // this.documentQuery.setDocumentosByFolder(this.folder.id);
  }
}
