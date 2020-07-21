import { ViewSDKClient } from './services/view-sdk.service';
// Basic required modules for Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//  Modeules needed for Angualr routing from one path to other path
import { AppRoutingModule } from './app-routing.module';

//  Aids for animations while using Angualr Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//  Required for handling Template Driven Forms
import { FormsModule } from '@angular/forms';

// Import the service
import { GoogleAnalyticsService } from './services/google-analytics.service';

// Import created Component related modules
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';

//  Import all the Angualr Material related Modules
import { MatCardModule, MatIconModule, MatExpansionModule, MatDividerModule, 
        MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    // Declare all the component that is been used in the application
    declarations: [
        AppComponent,
        HomeComponent,
        ContentComponent
    ],
    //  Import all the modules that is been used in the application
    imports: [
        NgbModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,        
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatDividerModule,
        MatFormFieldModule,
        MatExpansionModule,
        BrowserAnimationsModule
    ],
    //  provide service related component name
    providers: [ViewSDKClient, GoogleAnalyticsService],
    
    //  Bootstraps the main App component
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
