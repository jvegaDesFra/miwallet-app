import { Component, Input, OnInit } from '@angular/core';
import { Folders } from '../../../../akita/models/folders.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {
  @Input() folder: Folders;
  constructor() { }

  ngOnInit() {}

}
