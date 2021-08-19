import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { FloridaComponent } from './floridaucc/florida/florida.component';
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
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuditlogComponent } from '@app/auditlog/auditlog/auditlog.component';
import { FloridaviewpopupComponent } from './floridaucc/floridapopup/floridaviewpopup/floridaviewpopup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CaliforniaComponent } from './californiaucc/california/california.component';
import { CaliforniaviewpopupComponent } from './californiaucc/californiaviewpopup/californiaviewpopup.component';
import {MatSelectModule} from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';






const appRoute: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'florida', component: FloridaComponent },
  { path: 'california', component: CaliforniaComponent },
  { path: '', redirectTo: 'login'  , pathMatch: 'full'},
  { path: '**', component: LoginComponent }
];
      








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FloridaComponent,
    FloridaviewpopupComponent,
    CaliforniaComponent,
    CaliforniaviewpopupComponent,
    AuditlogComponent
  ],
  imports: [

    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    RouterModule.forRoot(appRoute),
    MatSnackBarModule,
    MatListModule,
    FormsModule,
    CommonModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    DynamicTableModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatTabsModule,
    MatStepperModule,
    MatCheckboxModule,
    MatGridListModule,
    MatListModule,
    FontAwesomeModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() //({preventDuplicates: true}
  ],
  entryComponents: [
    FloridaviewpopupComponent,
    AuditlogComponent,
    CaliforniaviewpopupComponent,
  ],
  exports: [RouterModule],



  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
