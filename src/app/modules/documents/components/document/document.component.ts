import { Component, Input, OnInit } from '@angular/core';
import { Documentos } from '../../../../akita/models/documents.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  @Input() document: Documentos;
  constructor() { }

  ngOnInit() {}

}
