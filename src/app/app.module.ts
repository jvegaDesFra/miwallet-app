import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DocumentsPageModule } from './modules/documents/documents.module';
import { FoldersPageModule } from "./modules/folders/fodlers.module";
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
//modals { mode: 'ios', animated: true }


@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, DocumentsPageModule, FoldersPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, FileOpener, InAppBrowser],
  bootstrap: [AppComponent],
})
export class AppModule {}
