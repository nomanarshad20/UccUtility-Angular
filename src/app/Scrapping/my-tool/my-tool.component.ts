import { RowDataService } from './../../Service/row-data.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Scrapping } from '../my-tool/Scrapping.DTO';
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
import { ViewpopupComponent } from 'src/app/viewpopup/viewpopup/viewpopup.component';

import { AuditlogComponent } from 'src/app/auditlog/auditlog/auditlog.component';
import { PDFDocument } from 'pdf-lib'
import { DomSanitizer } from '@angular/platform-browser';
//import { saveAs } from 'file-saver';
import moment = require('moment');
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatListModule} from '@angular/material/list';








@Component({
  selector: 'app-my-tool',
  templateUrl: './my-tool.component.html',
  styleUrls: ['./my-tool.component.css'],
})
export class MyToolComponent implements OnInit, AfterViewInit {
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

  selectedRowArray: any = [];
  selectedRowCount = 0;
  pathArray: any = [];
  durationInSeconds = 5;
  dataSource!: MatTableDataSource<string>;



  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;


  constructor(public rowdataservice: RowDataService, matDatepickerModule: MatDatepickerModule,
    matCardModule: MatCardModule, matIconModule: MatIconModule, matNativeDateModule: MatNativeDateModule,
    public dialog: MatDialog, public sanitizer: DomSanitizer
    ,private _snackBar: MatSnackBar , private router: Router , public matListModule: MatListModule) {

    // session value here
     let loginValue= localStorage.getItem('loginKey');
     if(loginValue===null){
      this.router.navigate(['/login']);
     }

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }





  GetData() {


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

    console.log(searchFilterJson);


    console.log('calling search api');
    this.rowdataservice.searchCompany(searchFilterJson).subscribe((res) => {
      const FullJson = res;
      console.log(FullJson);
      this.template = FullJson['template'];
      this.rows = FullJson['rows'];
      this.template = FullJson['template'];
      this.edge = FullJson['edge'];
      console.log('extraction complete');
      this.colArray = Array.from(FullJson['template']);
      //console.log(this.template);
      //console.log((Object.values(template)));

      this.displayedColumns = this.prepareUiColumn(this.template);
      this.DataTableRow = this.prepareDataTableRows(this.rows);
      this.dataSource = new MatTableDataSource(this.DataTableRow);
      this.listCount = this.DataTableRow.length;


      this.isDataAvailable = this.listCount > 0 ? true : false;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }










  prepareUiColumn(template: any) {
    let UiColumn: any = [];
    UiColumn.push('checked');
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
        "checked": false,
        "operation": "button"

      };
      rowObject.push(data);
    }

    return rowObject;
  }


  openLicense(value: any) {


    this.rowdataservice.getCompanyDetails(value).subscribe((res) => {
      const FullJson = res;
      console.log(FullJson);
    });
  }



  openDialog(id: any, fileNumber: any) {


    const dialogRef = this.dialog.open(ViewpopupComponent, {
      height: '700px',
      width: '1000px',
      disableClose: false,
      autoFocus : true,
      hasBackdrop:true,
      data: {
        ucc: id,
        fileNo: fileNumber
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(" thsi sis pop up value unknown");
      console.log(`Dialog result: ${result}`);
    });
    
  }


  openDialogAuditlog() {

    const dialogRefAudit = this.dialog.open(AuditlogComponent, {
      height: '730px',
      width: '1000px',
      disableClose: false,
      autoFocus : true,
      hasBackdrop:true,
      backdropClass: 'scroolHide'
    });

    dialogRefAudit.afterClosed().subscribe(result => {
      console.log(" thsi sis pop up value Auditlog");
      console.log(`Dialog result: ${result}`);
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
    this.openSnackBar('Downloading and merging all pdf files','OK');
    console.log(`Downloading pdf`);
    console.log(this.selectedRowArray);


    let data = {
      id: "",
      action: "Downloaded Pdf bundle",
      timestamp: ''+new Date()+'',
      userName: ''+localStorage.getItem('userName')
    };
    
    this.rowdataservice.saveAuditlog(data).subscribe((res) => {
     });



    for (let i = 0; i < this.selectedRowArray.length; i++) {
      let filenumber = this.selectedRowArray[i];

      await this.rowdataservice.getHistoryOfLicensePromise(filenumber)
        .then((res: any) => {
          console.log(`^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^66`);
          const FullJson = res;
          console.log(" get api data >>>>>>>>>>");
          console.log(FullJson);
          let historyArray = FullJson['AMENDMENT_LIST'];

          console.log('parser history');
          console.log(historyArray);

          for (let index = 0; index < historyArray.length; index++) {
            const element = historyArray[index];
            console.log('adding > ' + element['DOWNLOAD_LINK']);
            this.pathArray.push('https://bizfileonline.sos.ca.gov' + element['DOWNLOAD_LINK']);
          }

        })
        .catch((error) => {
          console.log("getHistoryOfLicensePromise rejected with " + JSON.stringify(error));
        });
    }



    console.log("prepareed paths > ");
    console.log(this.pathArray);
    console.log(this.pathArray.length);




    const pdfDocMain = await PDFDocument.create();


    for (let i = 0; i < this.pathArray.length; i++) {

      let url = this.pathArray[i];
      console.log(url);

      console.log(`Downloading pdf`);
      console.log(this.pathArray[i]);
      const donorPdfBytes = await fetch(url).then(res => res.arrayBuffer());
      const firstDonorPdfDoc = await PDFDocument.load(donorPdfBytes);
      console.log(`count pdf array`);
      let pageCount = firstDonorPdfDoc.getPageCount();
      console.log(` page size`);
      console.log(pageCount);

      for (let index = 0; index < pageCount; index++) {
        console.log(`adding page ` + index);
        const [firstDonorPage] = await pdfDocMain.copyPages(firstDonorPdfDoc, [index]);
        pdfDocMain.addPage(firstDonorPage);
      }
      console.log(`out of inner loop`);
    }
    const pdfBytes = await pdfDocMain.save()
    const blob = new Blob([pdfBytes], { type: 'application/octet-stream' });
    var randomname = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  //  saveAs(blob, 'License_' + randomname + '.pdf');

    console.log('got completed');

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  logout(){

    let data = {
      id: "",
      action: "User Logout",
      timestamp: ''+new Date()+'',
      userName: ''+localStorage.getItem('userName')
    };
    this.rowdataservice.saveAuditlog(data).subscribe((res) => {
     });

    localStorage.clear();
    console.log('session ended');
    this.router.navigate(['/login']);
  }


  

  // main class ended
}









