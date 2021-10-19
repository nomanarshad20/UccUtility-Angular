import { Component, OnInit } from '@angular/core';


import { HttpRequestService } from '@app/Service/HttpRequest.service';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { AuditlogComponent } from 'src/app/auditlog/auditlog/auditlog.component';
import { PDFDocument } from 'pdf-lib'
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import moment = require('moment');
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { ToastNotification } from '@app/Service/ToastNotification.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public httpRequestService: HttpRequestService, matDatepickerModule: MatDatepickerModule,
    matCardModule: MatCardModule, matIconModule: MatIconModule, matNativeDateModule: MatNativeDateModule,
    public dialog: MatDialog, public sanitizer: DomSanitizer, private _snackBar: MatSnackBar,
    private router: Router, public matListModule: MatListModule, private toastNotification: ToastNotification,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

}
