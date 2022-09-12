import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentsPageRoutingModule } from './documents-routing.module';

import { DocumentsPage } from './documents.page';
import { DocumentsComponent } from "./components/documents/documents.component";
import { DocumentComponent } from "./components/document/document.component";
import { DocumentNewComponent } from "./components/document-new/document-new.component";
import { DocumentSendComponent } from "./components/document-send/document-send.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentsPageRoutingModule
  ],
  exports: [ DocumentsComponent, DocumentComponent, DocumentNewComponent, DocumentSendComponent],
  declarations: [DocumentsPage, DocumentsComponent, DocumentComponent, DocumentNewComponent, DocumentSendComponent]
})
export class DocumentsPageModule {}
