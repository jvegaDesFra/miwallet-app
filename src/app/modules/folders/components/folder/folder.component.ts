import { Component, Input, OnInit } from '@angular/core';
import { Folders } from '../../../../akita/models/folders.model';
import { FoldersService } from '../../../../../app/akita//service/folders.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {
  @Input() folder: Folders;
  constructor(private service : FoldersService) { }

  ngOnInit() {}
  deleted(id){
    this.service.delete(id);
  }
}
