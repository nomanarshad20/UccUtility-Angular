import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpRequestService } from '@app/Service/HttpRequest.service';
import { Scrapping } from '../Scrapping.DTO';
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
import { CaliforniaviewpopupComponent } from '../californiaviewpopup/californiaviewpopup.component';
import { ToastNotification } from '@app/Service/ToastNotification.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-california',
  templateUrl: './california.component.html',
  styleUrls: ['./california.component.css']
})
export class CaliforniaComponent implements OnInit, AfterViewInit {
  scrappingModel: Scrapping = new Scrapping();
  template: any;
  rows: any = [];
  edge: any;
  public colArray = [];
  displayedColumns = [];
  DataTableRow: any = [];
  listCount = 0;
  cardSearchValue = "";
  isDataAvailable: boolean = false;
  step = 0;

  statesList: any = ['California', 'Florida'];
  defaultSelectedState = this.statesList[0];
  selectedRowArray: any = [];
  selectedRowCount = 0;

  durationInSeconds = 5;
  dataSource!: MatTableDataSource<string>;



  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;




  constructor(public httpRequestService: HttpRequestService, matDatepickerModule: MatDatepickerModule,
    matCardModule: MatCardModule, matIconModule: MatIconModule, matNativeDateModule: MatNativeDateModule,
    public dialog: MatDialog, public sanitizer: DomSanitizer, private _snackBar: MatSnackBar,
    private router: Router, public matListModule: MatListModule, private toastNotification: ToastNotification,
    private toastr: ToastrService) {

    // session value here
    let loginValue = localStorage.getItem('loginKey');
    if (loginValue === null) {
      this.router.navigate(['/login']);
    }

  }

  ngOnInit(): void { }
  ngAfterViewInit() { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }





  GetData() {
    try {

      this.selectedRowCount = 0;
      this.selectedRowArray = [];

      this.cardSearchValue = this.scrappingModel.SEARCH_VALUE;
      let searchFilterJson = {
        "SEARCH_VALUE": this.scrappingModel.SEARCH_VALUE,
        "STATUS": (this.scrappingModel.STATUS === '' ? "ALL" : this.scrappingModel.STATUS),
        "RECORD_TYPE_ID": (this.scrappingModel.RECORD_TYPE_ID === '' ? "0" : this.scrappingModel.RECORD_TYPE_ID),
        "FILING_DATE": {
          "start": (this.scrappingModel.FILING_DATE_START === '' ? null : moment(this.scrappingModel.FILING_DATE_START).format('MM/DD/YYYY')),
          "end": (this.scrappingModel.FILING_DATE_END === '' ? null : moment(this.scrappingModel.FILING_DATE_END).format('MM/DD/YYYY'))
        },
        "LAPSE_DATE": {
          "start": (this.scrappingModel.LAPSE_DATE_START === '' ? null : moment(this.scrappingModel.LAPSE_DATE_START).format('MM/DD/YYYY')),
          "end": (this.scrappingModel.LAPSE_DATE_END === '' ? null : moment(this.scrappingModel.LAPSE_DATE_END).format('MM/DD/YYYY'))
        }
      }


      this.httpRequestService.searchCompany(searchFilterJson)
        .subscribe(
          (response) => {
            const FullJson = response;
            this.template = FullJson['template'];
            this.rows = FullJson['rows'];
            this.template = FullJson['template'];
            this.edge = FullJson['edge'];
            this.colArray = Array.from(FullJson['template']);

            this.displayedColumns = this.prepareUiColumn(this.template);
            this.DataTableRow = this.prepareDataTableRows(this.rows);
            this.dataSource = new MatTableDataSource(this.DataTableRow);
            this.listCount = this.DataTableRow.length;

            this.isDataAvailable = this.listCount > 0 ? true : false;

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          (error) => {
            console.log(error);
            if (error.status === 400) {
              this.toastNotification.info("Results more then 1000", 'Search Criteria Conflict', this.toastr);
            } else {
              this.toastNotification.error(error.message, 'California Search Failed', this.toastr);
            }

          }
        )

    } catch (error) {
      console.log(error);
      this.toastNotification.error(error.message, 'California Sreach data faild', this.toastr);
    }
  }




  prepareUiColumn(template: any) {
    let UiColumn: any = [];
    UiColumn.push('#');
    UiColumn.push('id');
    for (let key in template) {
      let value = template[key];
      UiColumn.push(value['label']);
    }
    UiColumn.push('operation');
    return UiColumn;
  }

  prepareDataTableRows(row: any) {
    let rowObject: any = [];
    for (let key in row) {
      let value = row[key];
      let data = {
        "UCC Type": value['RECORD_TYPE'],
        "Debtor Information": value['TITLE'],
        "File Number": value['RECORD_NUM'],
        "Secured Party Info": value['SEC_PARTY'],
        "Status": value['STATUS'],
        "Filing Date": value['FILING_DATE'],
        "Lapse Date": value['LAPSE_DATE'],
        "id": value['ID'],
        "#": false,
        "operation": "button"

      };
      rowObject.push(data);
    }
    return rowObject;
  }


  openLicense(value: any) {
    this.httpRequestService.getCompanyDetails(value)
      .subscribe(
        (response) => {
          const FullJson = response;
        },
        (error) => {
          console.log(error);
          this.toastNotification.error(error.message, 'California Detail Api Failed', this.toastr);
        }
      )
  }



  openDialog(id: any, fileNumber: any) {
    const dialogRef = this.dialog.open(CaliforniaviewpopupComponent, {
      height: '700px',
      width: '1000px',
      disableClose: false,
      autoFocus: true,
      hasBackdrop: true,
      data: {
        ucc: id,
        fileNo: fileNumber
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //code
    });
  }


  openDialogAuditlog() {

    const dialogRefAudit = this.dialog.open(AuditlogComponent, {
      height: '730px',
      width: '1000px',
      disableClose: false,
      autoFocus: true,
      hasBackdrop: true,
      backdropClass: 'scroolHide'
    });

    dialogRefAudit.afterClosed().subscribe(result => {
      //code
    });

  }



  clearFilter() { }

  selectedRowCheckbox(e: any, selectedId: any) {
    if (e.checked) {
      this.selectedRowArray.push(selectedId);
    } else {
      this.selectedRowArray = this.selectedRowArray.filter((item: any) => item !== selectedId);
    }
    this.selectedRowCount = this.selectedRowArray.length;
  }


  async downloadSelectedRowsPdfMergeFile() {

    try {
      this.toastNotification.info('Pdf Bundle Downloading Started', '', this.toastr);

      let pathArray: any = [];
      for (let i = 0; i < this.selectedRowArray.length; i++) {
        let filenumber = this.selectedRowArray[i];

        await this.httpRequestService.getHistoryOfLicensePromise(filenumber)
          .then((res: any) => {
            const FullJson = res;
            let historyArray = FullJson['AMENDMENT_LIST'];
            for (let index = 0; index < historyArray.length; index++) {
              const element = historyArray[index];
              pathArray.push('https://bizfileonline.sos.ca.gov' + element['DOWNLOAD_LINK']);
            }
          })
          .catch((error) => {
            console.log(error);
            this.toastNotification.error("File Downloading Failed", '', this.toastr);
          });


      }





      const pdfDocMain = await PDFDocument.create();
      for (let i = 0; i < pathArray.length; i++) {
        let url = pathArray[i];

        const donorPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        const firstDonorPdfDoc = await PDFDocument.load(donorPdfBytes);

        let pageCount = firstDonorPdfDoc.getPageCount();
        for (let index = 0; index < pageCount; index++) {
          const [firstDonorPage] = await pdfDocMain.copyPages(firstDonorPdfDoc, [index]);
          pdfDocMain.addPage(firstDonorPage);
        }
      }

      const pdfBytes = await pdfDocMain.save()
      const blob = new Blob([pdfBytes], { type: 'application/octet-stream' });
      var randomname = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      saveAs(blob, 'License_' + randomname + '.pdf');

      this.saveAuditLog("PDF bundle Downloaded");

      this.toastNotification.success("PDF bundle Downloaded", '', this.toastr);

    } catch (error) {
      console.log( error);
      this.toastNotification.error(error.message, 'File downloading Failed', this.toastr);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  logout() {
    this.saveAuditLog("User Logout");

    localStorage.clear();
    console.log('session ended');
    this.router.navigate(['/login']);
  }



  changeStateNavigation(event: any) {
    console.log(event.value.toString());
    if (this.statesList[0] !== event.value.toString()) {
      this.router.navigate(['/' + event.value.toLowerCase()]);
    }
  }




  saveAuditLog(msgLog: string) {
    let data = {
      id: "",
      action: msgLog,
      timestamp: '' + new Date() + '',
      userName: '' + localStorage.getItem('userName')
    };

    this.httpRequestService.saveAuditlog(data)
      .subscribe(
        (response) => {
        },
        (error) => {
          this.toastNotification.error(error, 'AuditLog Create Failed', this.toastr);
        }
      )
  }




  // main class ended
}









