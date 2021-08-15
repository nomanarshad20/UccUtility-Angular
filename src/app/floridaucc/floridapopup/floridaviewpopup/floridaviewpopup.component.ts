import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FloridaDTO } from '@app/floridaucc/florida/Florida.DTO';
import { HttpRequestService } from '@app/Service/HttpRequest.service';
import { ToastNotification } from '@app/Service/ToastNotification.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-floridaviewpopup',
  templateUrl: './floridaviewpopup.component.html',
  styleUrls: ['./floridaviewpopup.component.css']
})
export class FloridaviewpopupComponent implements OnInit {

  floridaDTO: FloridaDTO = new FloridaDTO();

  floridaResultJson: any = "";
  statusList: any = "";
  debtorPartiesList: any = "";
  securedPartiesList: any = "";
  documentImagesList: any = "";
  fillingDownloadList: any = "";
  fillingTable: any = "";

  isShown: boolean = true;


  constructor(@Inject(MAT_DIALOG_DATA) public floridaDtoPass: any, public httpRequestService: HttpRequestService,
    private toastNotification: ToastNotification, private toastr: ToastrService) {

  }

  async ngOnInit(): Promise<void> {
    try {

      this.floridaDTO = this.floridaDtoPass.floridaDto;
      let json = JSON.stringify(this.floridaDTO);

      await this.httpRequestService.searcFlorida2ndPageResult(json)
        .then((res: any) => {
          this.floridaResultJson = res;
          this.prepareAllListsAndDataFromResultJson();
          this.isShown = false;
        })
        .catch((error) => {
          this.isShown = false;
          console.log("Florida Detail APi" + error);
          this.toastNotification.error(error, 'Florida Detail APi', this.toastr);
        });

    } catch (error) {
      this.toastNotification.error(error, '', this.toastr);
    }
  }




  prepareAllListsAndDataFromResultJson() {
    try { this.statusList = this.getKeyValueFromJsonResult("Status"); } catch (error) {
      this.toastNotification.error(error, 'Status c', this.toastr);
    }
    try { this.debtorPartiesList = this.getKeyValueFromJsonResult("DebtorParties"); } catch (error) {
      this.toastNotification.error(error, 'DebtorParties Parse Failed', this.toastr);
    }
    try { this.securedPartiesList = this.getKeyValueFromJsonResult("SecuredParties"); } catch (error) {
      this.toastNotification.error(error, 'SecuredParties Parse Failed', this.toastr);
    }
    try { this.documentImagesList = this.getKeyValueFromJsonResult("DocumentImages"); } catch (error) {
      this.toastNotification.error(error, 'DocumentImages Parse Failed', this.toastr);
    }
    try {
      let filingHistory = this.getKeyValueFromJsonResult("FilingHistory");
      try { this.fillingDownloadList = filingHistory["fillingDownload"]; } catch (error) {
        this.toastNotification.error(error, 'FilingHistory Parse Failed', this.toastr);
      }
      try { this.fillingTable = filingHistory["fillingTable"]; } catch (error) {
        this.toastNotification.error(error, 'fillingTable Parse Failed', this.toastr);
      }
    } catch (error) {
      this.toastNotification.error(error, 'Florida Parse Failed', this.toastr);
    }
  }


  getKeyValueFromJsonResult(key: any) {
    return this.floridaResultJson[key];
  }



}
