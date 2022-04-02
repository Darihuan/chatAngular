import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ChatComponent} from "./chat/chat.component";
import { MessageComponent } from './message/message.component';
import { ConnectComponent } from './connect/connect.component';
import {FormsModule} from "@angular/forms";
import { PickerModule } from '@ctrl/ngx-emoji-mart';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MessageComponent,
    ConnectComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        PickerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
