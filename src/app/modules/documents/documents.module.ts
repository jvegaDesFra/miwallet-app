import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentsPageRoutingModule } from './documents-routing.module';

import { DocumentsPage } from './documents.page';
import { TodosComponent } from './components/documents.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentsPageRoutingModule
  ],
  exports: [TodosComponent],
  declarations: [DocumentsPage, TodosComponent]
})
export class DocumentsPageModule {}
