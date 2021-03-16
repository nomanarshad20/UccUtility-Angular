import { Component, OnInit } from '@angular/core';
import { RowDataService } from './../../Service/row-data.service';
import { HistoryModel } from '../../Scrapping/my-tool/HistoryModel';


@Component({
  selector: 'app-auditlog',
  templateUrl: './auditlog.component.html',
  styleUrls: ['./auditlog.component.css']
})
export class AuditlogComponent implements OnInit {

  historyModel: any = [];
  auditlogJson!: HistoryModel[];


  constructor(public rowdataservice: RowDataService) {

  }

  ngOnInit(): void {

  //  this.auditlogJson = [{ "id": "1", "timestamp": "march 22/2/2/2", "user": "kashi", "action": "user login" }, { "id": "2", "timestamp": "march 22/2/2/2", "user": "nazir", "action": "user login" }, { "id": "3", "timestamp": "march 22/2/2/2", "user": "jhon", "action": "user login" }, { "id": "4", "timestamp": "march 22/2/2/2", "user": "jhon", "action": "user login" }];

   // this.historyModel = this.rowdataservice.getHistory();



     this.rowdataservice.getHistory()
        .then((res: any) => {
          
          this.auditlogJson = res;

        })
        .catch((error) => {
          console.log("auditlog get rejected with " + JSON.stringify(error));
        });


  }








}
