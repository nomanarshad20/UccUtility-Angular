import { Component, OnInit } from '@angular/core';
import { RowDataService } from './../../Service/row-data.service';
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


  constructor(public rowdataservice: RowDataService) {



  }


  handlePageEvent(event: PageEvent) {



    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;


    console.log("paginatro event call");
    console.log(event);


   
    let filterDto = {
      length: this.length,
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      items: ""
    };
    console.log(filterDto);

    this.rowdataservice.getHistory(filterDto).subscribe((res) => {
      this.auditlogJson = res['items'];
      this.length = res['length'];
    });



  }





  ngOnInit(): void {

     // this.auditlogJson = [{ "id": "1", "timestamp": "march 22/2/2/2", "usere": "kashi", "action": "user login" }, { "id": "2", "timestamp": "march 22/2/2/2", "user": "nazir", "action": "user login" }, { "id": "3", "timestamp": "march 22/2/2/2", "user": "jhon", "action": "user login" }, { "id": "4", "timestamp": "march 22/2/2/2", "user": "jhon", "action": "user login" }];

    // this.historyModel = this.rowdataservice.getHistory();



    //  this.rowdataservice.getHistory()
    //     .then((res: any) => {
    //       this.auditlogJson = res;
    //     })
    //     .catch((error) => {
    //       console.log("auditlog get rejected with " + JSON.stringify(error));
    //     });



    let filterDto = {
      length: this.length,
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      items: ""
    };
    console.log(filterDto);
    this.rowdataservice.getHistory(filterDto).subscribe((res) => {
      this.auditlogJson = res['items'];
      this.length = res['length'];
    });



  }








}
