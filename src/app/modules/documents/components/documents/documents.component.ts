import { Component, Input, OnInit } from '@angular/core';
import { Documentos } from 'src/app/akita/models/documents.model';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  @Input() documents: Documentos[];
  constructor() { }

  ngOnInit() {}

  trackByFn(index, documento) {
    return documento.id;
  }

}
