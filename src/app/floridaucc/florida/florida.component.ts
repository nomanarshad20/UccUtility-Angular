import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RowDataService } from './../../Service/row-data.service';

import { FloridaDTO } from './Florida.DTO';
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
import { FloridaviewpopupComponent } from '../floridapopup/floridaviewpopup/floridaviewpopup.component';
import jsPDF from 'jspdf';
import { DOCUMENT } from '@angular/common';








@Component({
  selector: 'app-florida',
  templateUrl: './florida.component.html',
  styleUrls: ['./florida.component.css']
})
export class FloridaComponent implements OnInit {


  floridaDTO: FloridaDTO = new FloridaDTO();

  floridaDTONew: FloridaDTO = new FloridaDTO();


  displayedColumns = ['#', 'Name', 'UCC Number', 'Address', 'City', 'State', 'Zip Code', 'Status', 'operation'];
  DataTableRow: any = [];
  listCount = 0;
  isDataAvailable: boolean = false;

  
  

  statesList: any = ['California', 'Florida'];
  defaultSelectedState = this.statesList[1];
  
  selectedRowArray: any = [];
  selectedRowCount = 0;

  selectedRowFloridaList: FloridaDTO[] = [];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;


  dataSource!: MatTableDataSource<string>;




  constructor(public rowdataservice: RowDataService, matDatepickerModule: MatDatepickerModule,
    matCardModule: MatCardModule, matIconModule: MatIconModule, matNativeDateModule: MatNativeDateModule,
    public dialog: MatDialog, public sanitizer: DomSanitizer
    , private _snackBar: MatSnackBar, private router: Router, public matListModule: MatListModule) {






    // session value here
    let loginValue = localStorage.getItem('loginKey');
    if (loginValue === null) {
      this.router.navigate(['/login']);
    }

    // default option for select
    if (this.floridaDTO.optionType == null || this.floridaDTO.optionType == "") {
      this.floridaDTO.optionType = "0";
    }

  }

  ngOnInit(): void {



  }

  ngAfterViewInit() {
    //  this.dataSource.paginator = this.paginator;
    //  this.dataSource.sort = this.sort;
  }













  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  GetData() {

    this.selectedRowArray = [];
    if (this.floridaDTO.optionType == '6') {
      this.openFloridaModleView();
    } else {
      this.getFloridaTableSearchData();
    }
  }


  openFloridaModleView() {
    let searchByDocNumberLink = "https://www.floridaucc.com/uccweb/SearchResultsDetail.aspx?sst=&sov=6&sot=Document%20Number&st=" + this.floridaDTO.searchValue + "&fn=" + this.floridaDTO.searchValue + "&rn=1&ii=Y&ft=1&epn=";
    this.openDialog(searchByDocNumberLink);
  }


  async getFloridaTableSearchData() {
    let json = JSON.stringify(this.floridaDTO);
    await this.rowdataservice.searcFloridaData(json)
      .then((res: any) => {

        this.floridaDTO = res;
        //console.log(this.floridaDTO);
        this.prepareTableAndData();
      })
      .catch((error) => {
        console.log("search data rejected with " + JSON.stringify(error));
      });
  }


  prepareDataTableRows(row: any) {
    let rowObject: any = [];
    for (let key in row) {
      let value = row[key];
      let data = {
        "Name": value['Name'],
        "UCC Number": value['UCC Number'],
        "Address": value['Address'],
        "City": value['City'],
        "State": value['State'],
        "Zip Code": value['Zip Code'],
        "Status": value['Status'],
        "anchor": value['anchor'],
        "#": false,
        "operation": "button"

      };
      rowObject.push(data);
    }

    return rowObject;
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
      console.log(`Dialog result: ${result}`);
    });

  }


  selectedRowCheckbox(e: any, selectedAnchor: any) {
    if (e.checked) {
      this.selectedRowArray.push(selectedAnchor);
    } else {
      this.selectedRowArray = this.selectedRowArray.filter((item: any) => item !== selectedAnchor);

    }
    this.selectedRowCount = this.selectedRowArray.length;
  }



  logout() {

    let data = {
      id: "",
      action: "User Logout",
      timestamp: '' + new Date() + '',
      userName: '' + localStorage.getItem('userName')
    };
    this.rowdataservice.saveAuditlog(data).subscribe((res) => {
    });

    localStorage.clear();
    console.log('session ended');
    this.router.navigate(['/login']);
  }



  async previousButton() {

    let json = JSON.stringify(this.floridaDTO);
    await this.rowdataservice.getPreviousFloridaData(json)
      .then((res: any) => {
        this.floridaDTO = res;
        //console.log(this.floridaDTO);
      })
      .catch((error) => {
        console.log("previous data rejected with " + JSON.stringify(error));
      });

    this.prepareTableAndData();



  }


  async nextButton() {

    let json = JSON.stringify(this.floridaDTO);
    await this.rowdataservice.getNextFloridaData(json)
      .then((res: any) => {
        this.floridaDTO = res;
        //console.log(this.floridaDTO);
      })
      .catch((error) => {
        console.log("next data rejected with " + JSON.stringify(error));
      });

    this.prepareTableAndData();
  }



  prepareTableAndData() {

    this.DataTableRow = this.prepareDataTableRows(this.floridaDTO.tableJson);
    this.dataSource = new MatTableDataSource(this.DataTableRow);
    this.listCount = this.DataTableRow.length;
    this.isDataAvailable = this.listCount > 0 ? true : false;

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  previousButtonHide() {
    if (this.floridaDTO.previous == "" || this.floridaDTO.previous == null) {
      return false;
    } else {
      return true;
    }
  }

  nextButtonHide() {
    if (this.floridaDTO.next == "" || this.floridaDTO.next == null) {
      return false;
    } else {
      return true;
    }
  }







  openDialog(anchor: any) {

    this.floridaDTO.anchor = anchor;

    const dialogRef = this.dialog.open(FloridaviewpopupComponent, {
      height: '700px',
      width: '1000px',
      disableClose: false,
      autoFocus: true,
      hasBackdrop: true,
      data: {
        anchor: anchor,
        floridaDto: this.floridaDTO
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }


  async downloadSelectedRowsPdfMergeFile() {






    for (let i = 0; i < this.selectedRowArray.length; i++) {


      this.floridaDTONew = new FloridaDTO();
      this.floridaDTONew.anchor = this.selectedRowArray[i];
      this.selectedRowFloridaList.push(this.floridaDTONew);
    }



    let jsonList = JSON.stringify(this.selectedRowFloridaList);

    this.selectedRowFloridaList = [];
    await this.rowdataservice.getFloridaDocLinksByAnchors(jsonList)
      .then((res: any) => {

        const byteArray = new Uint8Array(atob(res["Base64"]).split('').map(char => char.charCodeAt(0)));
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        var randomname = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        saveAs(blob, 'License_' + randomname + '.pdf');
      })
      .catch((error) => {
        console.log("getFloridaDocLinksByAnchors " + JSON.stringify(error));
      });


    // let param = {
    //   anchor  :  this.floridaDTO.anchor,
    //   id  :  this.floridaDTO.anchor,
    // }


  }






  changeStateNavigation(event : any){
    console.log(event.value.toString());
    if(this.statesList[1] !== event.value.toString()){
      console.log('fdffddfdfdfdfddffdf    '  ,  '/'+event.value.toLowerCase( ));
      this.router.navigate(['/'+event.value.toLowerCase( )]);
    }
  }




}
