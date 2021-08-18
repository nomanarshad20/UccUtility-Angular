import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '@app/Service/HttpRequest.service';
import { HistoryModel } from '../auditlog/HistoryModel';
import { PageEvent } from '@angular/material/paginator';
import { ToastNotification } from '@app/Service/ToastNotification.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-auditlog',
  templateUrl: './auditlog.component.html',
  styleUrls: ['./auditlog.component.css']
})
export class AuditlogComponent implements OnInit {


  length = 10;
  pageSize = 20;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;
  // MatPaginator Output
  pageEvent!: PageEvent;





  // historyModel: any = [];
  auditlogJson!: HistoryModel[];





  constructor(public httpRequestService: HttpRequestService, private toastNotification: ToastNotification,
    private toastr: ToastrService) { }


  handlePageEvent(event: PageEvent) {

    try {

      this.length = event.length;
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;

      let filterDto = {
        length: this.length,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        items: ""
      };







      this.httpRequestService.getHistory(filterDto)
        .subscribe(
          (response) => {
            this.auditlogJson = response['items'];
            this.length = response['length'];
          },
          (error) => {
            console.log(error);
            this.toastNotification.error(error.message, 'AuditLog retrive history', this.toastr);
          }
        )


    } catch (error) {
      console.log(error);
      this.toastNotification.error(error.message, '', this.toastr);
    }


  }





  ngOnInit(): void {

    let filterDto = {
      length: this.length,
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      items: ""
    };




    this.httpRequestService.getHistory(filterDto)
      .subscribe(
        (response) => {
          this.auditlogJson = response['items'];
          this.length = response['length'];
        },
        (error) => {
          console.log(error);
          this.toastNotification.error(error.message, 'AuditLog retrive history', this.toastr);
        }
      )





  }








}
