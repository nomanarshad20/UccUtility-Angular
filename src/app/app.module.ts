import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyToolComponent } from './Scrapping/my-tool/my-tool.component';

import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicTableModule } from 'material-dynamic-table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';

import {MatStepperModule} from '@angular/material/stepper';
import { ViewpopupComponent } from './viewpopup/viewpopup/viewpopup.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Route, RouterModule } from '@angular/router';
import { Scrapping } from './Scrapping/my-tool/Scrapping.DTO';
import { CommonModule } from '@angular/common';
import { ScrappingModule } from './Scrapping/my-tool/scrapping.module';





// const appRoute: Route[] = [
//   { path: 'ScrappingModule', loadChildren: './Scrapping/my-tool/scrapping.module#ScrappingModule' }
//   // { path: 'scrappingSearch', loadChildren:() => import('../app/Scrapping/my-tool/scrapping.module').then(m => m.ScrappingModule)}


// ];

const appRoute: Route[] = [
  { path: 'ScrappingModule', component: MyToolComponent }
];




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ScrappingModule,
    RouterModule.forRoot(appRoute)
  ],


  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
