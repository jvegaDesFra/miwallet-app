import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy, isPlatform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DocumentsPageModule } from './modules/documents/documents.module';
import { FoldersPageModule } from "./modules/folders/fodlers.module";
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';
//modals { mode: 'ios', animated: true }
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
//const config: SocketIoConfig = { url: 'http://192.168.1.181:3001', options: {transports: ['websocket']} };
//const config: SocketIoConfig = { url: 'https://miwallet-socket-prod.herokuapp.com', options: {transports: ['websocket']} };
const config: SocketIoConfig = { url: 'https://miwallet-socket.herokuapp.com', options: {transports: ['websocket']} };
import { NgxElectronModule } from 'ngx-electron';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
@NgModule({
  declarations: [AppComponent, SidebarComponent],
  imports: [
    NgxElectronModule, 
    HttpClientModule, 
    BrowserModule, 
    IonicModule.forRoot({ mode: isPlatform("electron") ||  isPlatform("ios") ? 'ios' : isPlatform('android') ? 'md' : 'md'}), 
    AppRoutingModule, 
    DocumentsPageModule, 
    FoldersPageModule,
    SocketIoModule.forRoot(config)],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, FileOpener, InAppBrowser],
  bootstrap: [AppComponent],
})
export class AppModule {}
