import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'content', component: ContentComponent},    
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true})
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
