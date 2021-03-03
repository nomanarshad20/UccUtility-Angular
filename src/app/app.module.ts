import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';




const appRoute: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  },
  { path: 'scrapping', loadChildren: () => import('./Scrapping/my-tool/scrapping.module').then(m => m.ScrappingModule) }
];




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    InputTextModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule.forRoot(appRoute),
    MatSnackBarModule
  ],


  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
