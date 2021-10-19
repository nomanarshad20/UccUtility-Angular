import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpRequestService } from '@app/Service/HttpRequest.service';
import { ToastNotification } from '@app/Service/ToastNotification.service';
import { ToastrService } from 'ngx-toastr';
import { NewYork } from '../Nyc.DTO';
import { MatRadioModule } from '@angular/material/radio';
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver';
import moment = require('moment');
import { MatDialog } from '@angular/material/dialog';
import { AuditlogComponent } from '@app/auditlog/auditlog/auditlog.component';

@Component({
  selector: 'app-newyork',
  templateUrl: './newyork.component.html',
  styleUrls: ['./newyork.component.css']
})
export class NewyorkComponent implements OnInit {

  newYork: NewYork = new NewYork();

  displayedColumns = ['#', 'Debtor Name'];
  displayedColumns222 = ['Debtor Name', 'File no.', 'File Date', 'Lapse Date', 'Filing Type', 'operation'];


  //************************common Start************************* */
  yearList: any = ['2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', '1990', '1989', '1988', '1987', '1986', '1985', '1984', '1983', '1982', '1981', '1980', '1979', '1978', '1977', '1976', '1975', '1974', '1973', '1972', '1971', '1970', '1969', '1968', '1967', '1966', '1965', '1964', '1963', '1962', '1961', '1960'];
  statesList: any = ['California', 'Florida', 'NYC'];
  defaultSelectedState = this.statesList[2];


  isDataAvailable: boolean = false;

  selectedRowArray: any = [];
  selectedRowCount = 0;
  DataTableRow: any = [];

  listCount = 0;
  cardSearchValue = "";


  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  dataSource!: MatTableDataSource<string>;


  //************************common End************************* */


  constructor(private router: Router, public httpRequestService: HttpRequestService,
    private toastNotification: ToastNotification, private toastr: ToastrService, public matRadioModule: MatRadioModule,
    public dialog: MatDialog) {
    this.newYork.pLapsed = "1";
    this.newYork.pFiletype = "ALL";


  }

  ngOnInit(): void {
  }



  async GetDataDebtor() {

    if(this.newYork.pName==""){
      this.toastNotification.info("Write Bussiness name please", 'NYC Search', this.toastr);
      return;
    }

    let json = JSON.stringify(this.newYork);
    await this.httpRequestService.searchNycDataDebtor(json)
      .then((res: any) => {
        let dd = res;
        console.log(res);
        if(res.msg){
          this.toastNotification.success(res.msg, 'NYC Search', this.toastr);
          return;
        }
        this.DataTableRow = res.data;
        this.dataSource = new MatTableDataSource(this.DataTableRow);
        this.listCount = this.DataTableRow.length;
        this.isDataAvailable = this.listCount > 0 ? true : false;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((error) => {
        console.log(error)
        this.toastNotification.error(error.message  + error.error.msg, 'NYC Search', this.toastr);
      });


  }


  openUrl(siteWeb: string) {
        //  this.saveAuditLog("Downloaded Pdf File");
        console.log("download file " + siteWeb);
    
    
       // window.location.href = fileURL;
         window.open(siteWeb, "_blank");
        //window.location.href = siteWeb;
      }


  async GetFileNoData() {
    
    if(this.newYork.p_filenum=="" || this.newYork.p_year==""){
      this.toastNotification.info("Write FileNumber and year please", 'NYC Search', this.toastr);
      return;
    }
    

    let json = JSON.stringify(this.newYork);
    await this.httpRequestService.searchNycDataFileNumber(json)
      .then((res: any) => {
        let dd = res;
        console.log(res);
        if(res.msg){
          this.toastNotification.success(res.msg, 'NYC Search', this.toastr);
          return;
        }

        this.DataTableRow = res.data;
        this.dataSource = new MatTableDataSource(this.DataTableRow);
        this.listCount = this.DataTableRow.length;


        this.isDataAvailable = this.listCount > 0 ? true : false;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


      })
      .catch((error) => {
        console.log(error)
        this.toastNotification.error(error.message, 'NYC Search', this.toastr);
      });


  }




  //************************common Start************************* */


  selectedRowCheckbox(e: any, selectedId: any) {
    if (e.checked) {
      this.selectedRowArray.push(selectedId);
    } else {
      this.selectedRowArray = this.selectedRowArray.filter((item: any) => item !== selectedId);
    }
    this.selectedRowCount = this.selectedRowArray.length;
    console.log(this.selectedRowArray);
  }


  async downloadSelectedRowsPdfMergeFile() {
    try {
      this.toastNotification.info('Pdf Bundle Downloading Started', '', this.toastr);
      let selectedPdfLinkList: any = [];
      for (let indexSelected = 0; indexSelected < this.selectedRowArray.length; indexSelected++) {
        const id = this.selectedRowArray[indexSelected];
        for (let index = 0; index < this.DataTableRow.length; index++) {
          const element = this.DataTableRow[index];
          if (element['index'] == id) {
            element['uccList'].forEach(elementImg => {
              if (elementImg['Image'] !== "") {
                selectedPdfLinkList.push(elementImg['Image']);
              }
            });
          }
        }
      }

      console.log(selectedPdfLinkList);

      let jsonList = JSON.stringify(selectedPdfLinkList);
      console.log('vall *****************');
      await this.httpRequestService.getNYCSelectedMergeDocByLinks(jsonList)
        .then((res: any) => {
          console.log('vall back *****************');
          const byteArray = new Uint8Array(atob(res["Base64"]).split('').map(char => char.charCodeAt(0)));
          const blob = new Blob([byteArray], { type: 'application/pdf' });

          var randomname = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          saveAs(blob, 'License_' + randomname + '.pdf');

          this.saveAuditLog("PDF bundle Downloaded");
          this.toastNotification.success("PDF bundle Downloaded", '', this.toastr);
        })
        .catch((error) => {
          console.log(error);
          this.toastNotification.error(error.message, 'Pdf Merge Failed', this.toastr);
        });










    } catch (error) {
      console.log(error);
      this.toastNotification.error(error.message, 'File downloading Failed', this.toastr);
    }

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



  changeStateNavigation(event: any) {
    console.log(event.value.toString());
    if (this.statesList[0] !== event.value.toString()) {
      this.router.navigate(['/' + event.value.toLowerCase()]);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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


  logout() {
    this.saveAuditLog("User Logout");
    localStorage.clear();
    console.log('session ended');
    this.router.navigate(['/login']);
  }




  //************************common End************************* */



  













}
