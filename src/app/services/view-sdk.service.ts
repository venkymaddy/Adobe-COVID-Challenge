import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleAnalyticsService } from './google-analytics.service';

//  Interface created to capture the events of particular type
export interface IEvent{
    data: any[],
    type: string
}

@Injectable({
    providedIn: 'root'
})

export class ViewSDKClient {

    // variable used to store the AdobeDC View object
    adobeDCView: any;

    // variable used to copy the events triggered
    public triggeredEvent:  Observable<IEvent[]>;

    //  Dependency Injection of the Google Analytics Service
    constructor(private gAnalyticService: GoogleAnalyticsService){}    

    readyPromise: Promise<any> = new Promise((resolve) => {
        if (window.AdobeDC) {
            resolve();
        } else {
            /* Wait for Adobe Document Cloud View SDK to be ready */
            document.addEventListener('adobe_dc_view_sdk.ready', () => {
                resolve();
            });
        }
    });

    // Method invoked to make the Promise ready
    ready() {
        return this.readyPromise;
    }

    // Method used to Preview the file in Embedded PDF viewer
    previewFile(divId: string, viewerConfig: any, fileName: string) {
        const hostName = window.location.origin +'/assets/'
        const extension = '.pdf';
        console.log('File Name: ', fileName);
        const filePath =  hostName + fileName + extension;
        console.log('File Path: ', filePath);

        const config: any = {
            /* Pass your registered client id from he Google Analytics*/
            clientId: 'f0567ed19b7042d9a9015afe87116764',
        };
        if (divId) { /* Optional only for Light Box embed mode */
            /* Pass the div id in which PDF should be rendered */
            config.divId = divId;
        }
        /* Initialize the AdobeDC View object */
        this.adobeDCView = new window.AdobeDC.View(config);

        /* Invoke the file preview API on Adobe DC View object */
        const previewFilePromise = this.adobeDCView.previewFile({
            /* Pass information on how to access the file */
            content: {
                /* Location of file where it is hosted */
                location: {                   
                    url: filePath                    
                },
            },
            /* Pass meta data of file */
            metaData: {
                /* file name */
                fileName: fileName+'.pdf',
                /* file ID */
                id: '6d07d124-ac85-43b3-a867-36930f502ac6',
            }
        }, viewerConfig);

        return previewFilePromise;
    }

    // This method is invoked while loading the PDF file
    previewFileUsingFilePromise(divId: string, filePromise: Promise<string | ArrayBuffer>, fileName: any) {
        /* Initialize the AdobeDC View object */
        this.adobeDCView = new window.AdobeDC.View({
            /* Pass your registered client id */
            clientId: 'f0567ed19b7042d9a9015afe87116764',
            /* Pass the div id in which PDF should be rendered */
            divId,
        });

        /* Invoke the file preview API on Adobe DC View object */
        this.adobeDCView.previewFile({
            /* Pass information on how to access the file */
            content: {
                /* pass file promise which resolve to arrayBuffer */
                promise: filePromise,
            },
            /* Pass meta data of file */
            metaData: {
                /* file name */
                fileName
            }
        }, {});
    }

    // registerSaveApiHandler() {
    //     /* Define Save API Handler */
    //     const saveApiHandler = (metaData: any, content: any, options: any) => {
    //         console.log(metaData, content, options);
    //         return new Promise((resolve) => {
    //             /* Dummy implementation of Save API, replace with your business logic */
    //             setTimeout(() => {
    //                 const response = {
    //                     code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
    //                     data: {
    //                         metaData: Object.assign(metaData, { updatedAt: new Date().getTime() })
    //                     },
    //                 };
    //                 resolve(response);
    //             }, 2000);
    //         });
    //     };

    //     this.adobeDCView.registerCallback(
    //         window.AdobeDC.View.Enum.CallbackType.SAVE_API,
    //         saveApiHandler,
    //         {}
    //     );
    // }

    // Method invoked to Track events
    registerEventsHandler() {
        /* Register the callback to receive the events */
       return this.adobeDCView.registerCallback(
            /* Type of call back */
            window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
            /* call back function */
            (event: any) => {
                console.log('Event Name:', event);
                this.triggeredEvent = event;
                console.log('Triger: ', this.triggeredEvent);
                //  Based on events handled in Embedded PDF in Content Page this will be sent to Google Analytics Dashboard
                switch(event.type) {
                    case 'DOCUMENT_OPEN':
                        this.gAnalyticService.eventEmitter('Event', 'DOCUMENT_OPEN', event.data.fileName, 'open document');
                         break;
                    case 'PAGE_VIEW':
                        this.gAnalyticService.eventEmitter('Event', 'PAGE_VIEW', `${event.data.pageNumber} of ${event.data.fileName}`, 'view page');
                         break;
                    case 'DOCUMENT_DOWNLOAD':
                        this.gAnalyticService.eventEmitter('Event', 'DOCUMENT_DOWNLOAD', `${event.data.fileName}`, 'download document');
                         break;
                    case 'DOCUMENT_PRINT':
                        this.gAnalyticService.eventEmitter('Event', 'DOCUMENT_PRINT', `${event.data.fileName}`, 'print document');
                        break;
                    case 'TEXT_COPY':
                        this.gAnalyticService.eventEmitter('Event', 'TEXT_COPY', `${event.data.copiedText} of ${event.data.fileName}`, 'copy text');
                         break;                         
                    case 'TEXT_SEARCH':
                        this.gAnalyticService.eventEmitter('Event', 'SEARCH_TEXT', `${event.data.searchedText} of ${event.data.fileName}`, 'bookmark item');
                        break;
                    case 'BOOKMARK_ITEM_CLICK':
                        this.gAnalyticService.eventEmitter('Event', 'BOOKMARK_ITEM', `${event.data.title} of ${event.data.fileName}`, 'bookmark item');
                        break;
                    case 'ZOOM_LEVEL':
                        this.gAnalyticService.eventEmitter('Event', 'ZOOM_LEVEL', `${event.data.zoomLevel} of ${event.data.fileName}`, 'bookmark item');
                        break;                
                    case 'HYPERLINK_OPEN':
                        this.gAnalyticService.eventEmitter('Event', 'OPEN_HYPERLINK', `${event.data.url} in ${event.data.pageNumber}`, 'open hyperlink');
                        break;                
                    default:
                        this.gAnalyticService.eventEmitter('Other Event', `${event.type}`, 'OTHER_EVENT', 'other item');
                        break;    
                  }                
            },        
             /* options to control the callback execution */
             {
                /* Enable PDF analytics events on user interaction to track in Google Analytics. */
                enablePDFAnalytics: true,
            }              
        );        
    }
}

