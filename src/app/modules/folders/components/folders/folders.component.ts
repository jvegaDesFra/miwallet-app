import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Folders } from '../../../../akita/models/folders.model';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss'],
})
export class FoldersComponent implements OnInit {
  @Input() folders: Folders[];
  constructor() { }

  ngOnInit() {}
 
}
