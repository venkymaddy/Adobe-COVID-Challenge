import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import { GoogleAnalyticsService } from './services/google-analytics.service';

declare let ga: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit {
    title = 'adobe-dc-view-sdk-angular-sample';
    homeSelected = true;
    contentSelected = false;

    constructor(public router: Router, private gAnalyticService: GoogleAnalyticsService) {
    }

    ngOnInit(){
      //  Track the Page Viewed by the user on loading the component
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          console.log('Navigation Event: ', event);
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          // To send Page Views to Google Analytics
          (<any>window).ga('send', 'pageview'); 
        }
      });
    }

    gEvent(eventName: string){
      if (eventName === 'Home') {
        this.homeSelected = true;
        this.contentSelected = false;
      } else {
        this.homeSelected = false;
        this.contentSelected = true;
      }
            
        this.gAnalyticService.eventEmitter('Navigation', 'page','click', 10);
    }

}
