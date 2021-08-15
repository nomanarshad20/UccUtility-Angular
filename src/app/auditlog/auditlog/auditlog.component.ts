import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '@app/Service/HttpRequest.service';
import { HistoryModel } from '../auditlog/HistoryModel';
import { PageEvent } from '@angular/material/paginator';

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
  // MatPaginator Output
  pageEvent!: PageEvent;





  // historyModel: any = [];
  auditlogJson!: HistoryModel[];


  constructor(public httpRequestService: HttpRequestService) {



  }


  handlePageEvent(event: PageEvent) {

    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    let filterDto = {
      length: this.length,
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      items: ""
    };

    this.httpRequestService.getHistory(filterDto).subscribe((res) => {
      this.auditlogJson = res['items'];
      this.length = res['length'];
    });



  }





  ngOnInit(): void {

    let filterDto = {
      length: this.length,
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      items: ""
    };
   
    this.httpRequestService.getHistory(filterDto).subscribe((res) => {
      this.auditlogJson = res['items'];
      this.length = res['length'];
    });
   


  }








}
