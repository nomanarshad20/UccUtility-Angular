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
    private toastNotification: ToastNotification, private toastr: ToastrService, public matRadioModule: MatRadioModule) {
    this.newYork.pLapsed = "1";
    this.newYork.pFiletype = "ALL";


  }

  ngOnInit(): void {
  }



  async GetDataDebtor() {
    console.log(this.newYork);



    let jsonRes = [{ "Debtor Name": "ARIZONA LLC", "Secured Address": "209 HAVEMEYER STREET, BROOKLYN, NY 11211-0000, USA", "uccList": [{ "Pages": "1", "File no.": "246583", "Lapse Date": "12/17/2006", "Image": "", "File Date": "12/17/2001", "Filing Type": "Financing Statement" }], "Secured Party Name": "THE DIME SAVINGS BANK OF WILLIAMSBURGH", "index": "1", "Debtor Address": "442 WEST 54TH STREET, NEW YORK, NY 10019-0000, USA" }, { "Debtor Name": "ARIZONA LLC", "Secured Address": "125 WEST 75TH STREET, NEW YORK, NY 10027-0000, USA", "uccList": [{ "Pages": "3", "File no.": "202856", "Lapse Date": "09/04/2007", "Image": "", "File Date": "09/04/2002", "Filing Type": "Financing Statement" }, { "Pages": "2", "File no.": "200409270974754", "Lapse Date": "09/04/2007", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=15485843&pidmname=DEFAULT&pApp=UCC ", "File Date": "09/27/2004", "Filing Type": "Termination" }], "Secured Party Name": "CARVER FEDERAL SAVINGS BANK", "index": "2", "Debtor Address": "442 WEST 54TH STREET, NEW YORK, NY 10019-0000, USA" }, { "Debtor Name": "ARIZONA LLC", "Secured Address": "209 HAVEMEYER STREET, BROOKLYN, NY 11211, USA", "uccList": [{ "Pages": "1", "File no.": "200809260661822", "Lapse Date": "09/26/2013", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=18383234&pidmname=DEFAULT&pApp=UCC ", "File Date": "09/26/2008", "Filing Type": "Financing Statement" }, { "Pages": "1", "File no.": "201106300353223", "Lapse Date": "09/26/2013", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=21919688&pidmname=DEFAULT&pApp=UCC ", "File Date": "06/30/2011", "Filing Type": "Termination" }], "Secured Party Name": "THE DIME SAVINGS BANK OF WILLIAMSBURGH", "index": "3", "Debtor Address": "442 WEST 54TH STREET, NEW YORK, NY 10019, USA" }, { "Debtor Name": "ARIZONA LLC", "Secured Address": "565 FIFTH AVENUE, NEW YORK, NY 10017, USA", "uccList": [{ "Pages": "1", "File no.": "201106225678724", "Lapse Date": "06/22/2016", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=21859945&pidmname=DEFAULT&pApp=UCC ", "File Date": "06/22/2011", "Filing Type": "Financing Statement" }, { "Pages": "1", "File no.": "201604255480563", "Lapse Date": "06/22/2021", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=31907388&pidmname=DEFAULT&pApp=UCC", "File Date": "04/25/2016", "Filing Type": "Continuation" }, { "Pages": "1", "File no.": "201809270459434", "Lapse Date": "06/22/2021", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=36253185&pidmname=DEFAULT&pApp=UCC ", "File Date": "09/27/2018", "Filing Type": "Termination" }], "Secured Party Name": "SIGNATURE BANK", "index": "4", "Debtor Address": "442 WEST 54TH STREET, NEW YORK, NY 10019, USA" }, { "Debtor Name": "ARIZONA LLC", "Secured Address": "209 HAVEMEYER STREET, BROOKLYN, NY 11211, USA", "uccList": [{ "Pages": "2", "File no.": "201302150087119", "Lapse Date": "02/15/2018", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=25606686&pidmname=DEFAULT&pApp=UCC ", "File Date": "02/15/2013", "Filing Type": "Financing Statement" }], "Secured Party Name": "THE DIME SAVINGS BANK OF WILLIAMSBURGH", "index": "5", "Debtor Address": "442 WEST 54TH STREET, NEW YORK, NY 10019, USA" }, { "Debtor Name": "ARIZONA LLC", "Secured Address": "565 FIFTH AVENUE, NEW YORK, NY 10017, USA", "uccList": [{ "Pages": "1", "File no.": "201508055865892", "Lapse Date": "08/05/2020", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=30688835&pidmname=DEFAULT&pApp=UCC ", "File Date": "08/05/2015", "Filing Type": "Financing Statement" }, { "Pages": "1", "File no.": "201809270459458", "Lapse Date": "08/05/2020", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=36253191&pidmname=DEFAULT&pApp=UCC ", "File Date": "09/27/2018", "Filing Type": "Termination" }], "Secured Party Name": "SIGNATURE BANK", "index": "6", "Debtor Address": "87 EAST 116TH STREET, SUITE 302, NEW YORK, NY 10029, USA" }, { "Debtor Name": "ARIZONA LLC", "Secured Address": "300 CADMAN PLAZA EAST, 8TH FLOOR, BROOKLYN, NY 11201, USA", "uccList": [{ "Pages": "1", "File no.": "201702230089411", "Lapse Date": "02/23/2022", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=33310533&pidmname=DEFAULT&pApp=UCC ", "File Date": "02/23/2017", "Filing Type": "Financing Statement" }], "Secured Party Name": "DIME COMMUNITY BANK", "index": "7", "Debtor Address": "87 EAST 116TH STREET, SUITE 302, NEW YORK, NY 10029, USA" }];

    this.isDataAvailable = true;
    this.DataTableRow = jsonRes;
    this.dataSource = new MatTableDataSource(this.DataTableRow);
    this.listCount = this.DataTableRow.length;




    // let json = JSON.stringify(this.newYork);
    // await this.httpRequestService.searchNycDataDebtor(json)
    //   .then((res: any) => {
    //         let dd = res;
    //         console.log(res);

    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     this.toastNotification.error(error.message, 'NYC Search', this.toastr);
    //   });
  }



  async GetFileNoData() {
    console.log(this.newYork);

    let json = JSON.stringify(this.newYork);
    await this.httpRequestService.searchNycDataDebtor(json)
      .then((res: any) => {
        let dd = res;
        console.log(res);

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
          if(element['index'] ==  id ){
            element['uccList'].forEach(elementImg => {
              if(elementImg['Image'] !== ""){
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
          this.toastNotification.success("PDF bundle Downloaded" ,'', this.toastr);
        })
        .catch((error) => {
          console.log(error);
          this.toastNotification.error(error.message, 'Pdf Merge Failed', this.toastr);
        });




      

     



    } catch (error) {
      console.log( error);
      this.toastNotification.error(error.message, 'File downloading Failed', this.toastr);
    }

  }

  openDialogAuditlog() {

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



  openUrl(siteWeb: string) {
    //  this.saveAuditLog("Downloaded Pdf File");

    console.log("XXXXXXXX download file " + siteWeb);
  
  
   // window.location.href = fileURL;
     window.open(siteWeb, "_blank");
    //window.location.href = siteWeb;
  }







  







}
