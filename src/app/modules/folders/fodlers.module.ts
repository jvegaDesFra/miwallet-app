import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoldersComponent } from "./components/folders/folders.component";
import { FolderComponent } from "./components/folder/folder.component";
import { FolderNewComponent } from "./components/folder-new/folder-new.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [ FoldersComponent, FolderComponent],
  declarations: [FoldersComponent, FolderComponent, FolderNewComponent]
})
export class FoldersPageModule {}
