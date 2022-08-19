import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentService } from '../../../../akita/service/documents.service';
import { Folders } from '../../../../akita/models/folders.model';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss'],
})
export class FoldersComponent implements OnInit {
  @Input() folders: Folders[];
  constructor(private documentService: DocumentService,
    private menuController: MenuController,) { }

  ngOnInit() {}
  setFolder(){
    //alert(this.folder.id)
    this.documentService.updateFolder(0);
    this.menuController.close()
 // this.documentQuery.setDocumentosByFolder(this.folder.id);
}
}
