import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from "./chat/chat.component";
import {ConnectComponent} from "./connect/connect.component";

const routes: Routes = [
  {path:'', component:ConnectComponent},
  {path:'chat/:name', component:ChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
