import { NavigationEnd } from '@angular/router';
import { ViewSDKClient } from './../services/view-sdk.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare let ga: Function;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  

  constructor(private viewSDKClient: ViewSDKClient, private router: Router) { }
  
  ngOnInit() {
    // Sending the Page Views to Google Analytics
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Navigation Event: ', event);
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview'); 
      }
    });
  }
}
