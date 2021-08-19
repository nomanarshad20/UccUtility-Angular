
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRequestService } from '@app/Service/HttpRequest.service';
import { ToastNotification } from '@app/Service/ToastNotification.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-californiaviewpopup',
  templateUrl: './californiaviewpopup.component.html',
  styleUrls: ['./californiaviewpopup.component.css']
})
export class CaliforniaviewpopupComponent implements OnInit {

 


  licenseSelectedId: any;
  licenseFileNumber: any;
  isLinear: boolean = false;
  historyArray: any;

  firstFormGroup: any;
  secondFormGroup: any;
  detailsArray: any = [];

  

 

  constructor(@Inject(MAT_DIALOG_DATA) public licenseObj: any, public httpRequestService: HttpRequestService,
  private toastNotification : ToastNotification,private toastr: ToastrService ) {
  }

  ngOnInit(): void {
    try{
    this.licenseSelectedId = this.licenseObj.ucc;
    this.licenseFileNumber = this.licenseObj.fileNo;
    this.getLicenseDetails(this.licenseSelectedId);
    this.getLicenseHistory(this.licenseFileNumber);
  }catch(error){
    console.log(error);
    this.toastNotification.error(error.message ,'', this.toastr);
  }
  }


  getLicenseDetails(value: any) {
    this.httpRequestService.getCompanyDetails(value)
    .subscribe(
      (response) => {
        this.detailsArray = response['DRAWER_DETAIL_LIST'];
      },
      (error) => {            
        console.log( error);
        this.toastNotification.error(error.message ,'California Details Failed', this.toastr);
      }
    )

  }

  getLicenseHistory(value: any) {
    this.httpRequestService.getHistoryOfLicense(value)
    .subscribe(
      (response) => {
        const FullJson = response;
        this.historyArray = FullJson['AMENDMENT_LIST'];
      },
      (error) => {            
        console.log(error);
        this.toastNotification.error(error.message ,'California File history', this.toastr);
      }
    )

  }


  openUrl(siteWeb: string) {
    this.saveAuditLog("Downloaded Pdf File");
    let downloadLink = "https://bizfileonline.sos.ca.gov" + siteWeb;
    window.location.href = downloadLink;
  }



  saveAuditLog(msgLog :string){
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
        console.log(error);       
        this.toastNotification.error(error.message ,'AuditLog Create Failed', this.toastr);
      }
    )
  }




}
