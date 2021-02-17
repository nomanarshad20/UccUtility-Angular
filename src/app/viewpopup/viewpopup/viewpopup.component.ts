import { logging } from 'protractor';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RowDataService } from 'src/app/Service/row-data.service';




@Component({
  selector: 'app-viewpopup',
  templateUrl: './viewpopup.component.html',
  styleUrls: ['./viewpopup.component.css']
})
export class ViewpopupComponent implements OnInit {


  //secondFormGroup : any;
  licenseSelectedId: any;
  licenseFileNumber: any;
  isLinear : boolean = false;
  historyArray: any;

  firstFormGroup: any;
  secondFormGroup: any;
  detailsArray:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public licenseObj: any , public rowdataservice: RowDataService) {


  }

  ngOnInit(): void {
this.licenseSelectedId = this.licenseObj.ucc;
this.licenseFileNumber = this.licenseObj.fileNo;
this.getLicenseDetails(this.licenseSelectedId);
this.getLicenseHistory(this.licenseFileNumber);



// this.firstFormGroup = this._formBuilder.group({
//   firstCtrl: ['', Validators.required]
// });
// this.secondFormGroup = this._formBuilder.group({
//   secondCtrl: ['', Validators.required]
// });







  }


  getLicenseDetails(value: any) {
    this.rowdataservice.getCompanyDetails(value).subscribe((res) => {
      this.detailsArray = res['DRAWER_DETAIL_LIST'];
      console.log(" popup data heheeerr");
      console.log( this.detailsArray );
    });
  }

  getLicenseHistory(value: any) {


  //  const json= {"AMENDMENT_LIST":[{"AMENDMENT_TYPE":"Lien Financing Stmt","AMENDMENT_NUM":"187642982633","AMENDMENT_DATE":"4/11/2018","DOWNLOAD_LINK":"/api/report/GetImageByNum/219113069183078115207222128178116038116028201132"},{"AMENDMENT_TYPE":"Termination","AMENDMENT_NUM":"1876638595","AMENDMENT_DATE":"8/14/2018","DOWNLOAD_LINK":"/api/report/GetImageByNum/202102135249214135195160235181073027076091090246"}],"HISTORY_LIST":[],"TEMPLATE":[{"id":"AMENDMENT_TYPE","label":"Document Type"},{"id":"AMENDMENT_NUM","label":"File Number"},{"id":"AMENDMENT_DATE","label":"Date"},{"id":"DOWNLOAD_LINK","label":"Image Download","type":"download"}]};

  //  this.historyArray =json['AMENDMENT_LIST'];
  //  console.log('parser history');
  //  console.log(this.historyArray);

   this.rowdataservice.getHistoryOfLicense(value).subscribe((res) => {
      const FullJson = res;
      console.log(" get api data >>>>>>>>>>");
      console.log(FullJson);
      this.historyArray =FullJson['AMENDMENT_LIST'];
      console.log('parser history');
      console.log(this.historyArray);
    });
  }


  openUrl(siteWeb: string) {

    let downloadLink = "https://bizfileonline.sos.ca.gov"+ siteWeb;
    window.location.href = downloadLink;
  }


}
