import { Injectable } from '@angular/core';

declare let ga:Function;

@Injectable({
  providedIn: 'root'
})

export class GoogleAnalyticsService {

  constructor() { }

  public eventEmitter(eventCategory: string, eventAction: string, eventLabel: string = null,  
                      eventValue: any ){ 
               (<any>window).ga('send', 'event', {
                eventCategory: eventCategory,
                eventLabel: eventLabel,
                eventAction: eventAction,
                eventValue: 10
              });
    }  
}
