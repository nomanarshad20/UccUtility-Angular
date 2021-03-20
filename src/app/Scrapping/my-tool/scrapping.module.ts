import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MyToolComponent } from './my-tool.component';
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
import { ViewpopupComponent } from '@app/viewpopup/viewpopup/viewpopup.component';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { AuditlogComponent } from '@app/auditlog/auditlog/auditlog.component';
import {MatListModule} from '@angular/material/list';

const appRout: Route[] = [
  // { path: 'scrapping', redirectTo: 'scrapping', pathMatch: 'full' },
  { path: '', component: MyToolComponent }

];



@NgModule({
  declarations: [
    MyToolComponent,
    ViewpopupComponent,
    AuditlogComponent
  ],
  imports: [
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
    RouterModule.forChild(appRout),
    MatGridListModule,
    MatListModule
  ],
  entryComponents: [
    ViewpopupComponent,
    AuditlogComponent
  ],

})
export class ScrappingModule {}
