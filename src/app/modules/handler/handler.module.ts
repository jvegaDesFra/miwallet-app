import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HandlerPageRoutingModule } from './handler-routing.module';

import { HandlerPage } from './handler.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HandlerPageRoutingModule
  ],
  declarations: [HandlerPage]
})
export class HandlerPageModule {}
