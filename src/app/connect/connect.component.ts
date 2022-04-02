import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
  public name:string ="";
  constructor(private router:Router ) { }

  ngOnInit(): void {
  }

  connect() {
    if (this.name != '')
    this.router.navigate(['/chat/'+this.name]);
  }
}
