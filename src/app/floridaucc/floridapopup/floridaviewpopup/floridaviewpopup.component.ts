import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FloridaDTO } from '@app/floridaucc/florida/Florida.DTO';
import { RowDataService } from 'src/app/Service/row-data.service';



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




  constructor(@Inject(MAT_DIALOG_DATA) public licenseObj: any, public rowdataservice: RowDataService) {

  }

  async ngOnInit(): Promise<void> {

    let anchor = this.licenseObj.anchor;
    this.floridaDTO = this.licenseObj.floridaDto;

    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%111");
    //console.log(anchor);
   // console.log(this.floridaDTO);

    let json = JSON.stringify(this.floridaDTO);

    await this.rowdataservice.searcFlorida2ndPageResult(json)
      .then((res: any) => {
        console.log(`^^^^^^^^^^^^^^^^^^^^^^^^^^^XXXXXX2`);
        this.floridaResultJson = res;
        console.log(res);
        
      })
      .catch((error) => {
        console.log("search data rejected with " + JSON.stringify(error));
      });


    this.prepareAllListsAndDataFromResultJson();
    
    
    
    


  }




  prepareAllListsAndDataFromResultJson(){
    this.statusList= this.getKeyValueFromJsonResult("Status");
    this.debtorPartiesList= this.getKeyValueFromJsonResult("DebtorParties");
    this.securedPartiesList= this.getKeyValueFromJsonResult("SecuredParties");
    this.documentImagesList= this.getKeyValueFromJsonResult("DocumentImages");
    let filingHistory =  this.getKeyValueFromJsonResult("FilingHistory");
    this.fillingDownloadList= filingHistory["fillingDownload"];
    this.fillingTable= filingHistory["fillingTable"];
  }


  getKeyValueFromJsonResult(key: any){
   const myResult= {"Status":[{"Status":"FILED","Date_Filed":"09/13/2012","Summary_For_Filing":"20120751228X","Expires":"09/13/2022","Filings_Completed_Thru":"07/27/2021"}],"DebtorParties":["UNITED HEALTH AND REHABILITATION CENTER LLC2040 NE 163RD ST, STE 208 NORTH MIAMI BEACH FL 33162\n","UNITED HEALTH AND REHAB CENTER300 LEDGEWOOD PLACE, SUITE 301 ROCKLAND MA 02370\n"],"SecuredParties":["APZB INDUSTRIES 300 LEDGEWOOD PLACE, SUITE 301 ROCKLAND MA 02370"],"DocumentImages":[{"Pages":"1","Type":"UCC1","anchor":"https://www.floridaucc.com/uccweb/RetrieveImage.aspx?sst=&sov=0&sot=Filed%20Compact%20Debtor%20Name%20List&st=united+health+centers+foundation&fn=20120751228X&rn=1362645&ii=Y&ft=&epn=","Filing_Date":"09/13/2012","Document_Number":"20120751228X"}],"FilingHistory":{"fillingDownload":[{"name":"201700635490","value":"https://www.floridaucc.com/uccweb/RetrieveImage.aspx?fn=201700635490"}],"fillingTable":"<table id=\"mainTable\" class=\"table table-sm\" width=\"100%\" class=\"table table-sm table-borderless \"> \n <tbody>  \n  <tr class=\"GridCaption\"> \n   <th>DOCUMENT NUMBER</th> \n   <th>TYPE</th> \n   <th>DATE</th> \n   <th>PAGES</th> \n   <th>ACTIONS</th> \n  </tr> \n  <tr class=\"GridAltItem\"> \n   <td><a href=\"https://www.floridaucc.com/uccweb/RetrieveImage.aspx?fn=201700635490\" target=\"_blank\">201700635490</a></td> \n   <td>UCC3</td> \n   <td>03/20/2017</td> \n   <td>1</td> \n   <td>1</td> \n  </tr> \n  <tr class=\"GridAltItem\"> \n   <td colspan=\"5\"> \n    <table border=\"0\" width=\"100%\" class=\"table table-sm table-borderless \"> \n     <tbody> \n      <tr class=\"GridAltItem\"> \n       <td width=\"20%\">1) Continuation</td> \n       <td width=\"90%\"></td> \n      </tr> \n     </tbody> \n    </table> </td> \n  </tr> \n </tbody> \n</table>"}};
   
   // return this.floridaResultJson[key];
   
   return  myResult[key];
  }

 // window.location.href = downloadLink;
}
