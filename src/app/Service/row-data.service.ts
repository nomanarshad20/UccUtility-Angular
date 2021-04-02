import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';






@Injectable({
  providedIn: 'root'
})
export class RowDataService {
  respons: any;


   javaServerPort : string = "8443";
   //javaServerPort : string = "9595";

//   javaServerIp :string = "localhost";
   javaServerIp :string = "162.214.196.99";

   
  constructor(private httpclient: HttpClient) {




  }

  searchCompany(searchJson:any): Observable<any> {

     const serchUrl = 'https://bizfileonline.sos.ca.gov/api/Records/uccsearch';
    // const searchPostData = '{\"SEARCH_VALUE\":\"impresa aerospace\",\"STATUS\":\"ALL\",\"RECORD_TYPE_ID\":\"0\",\"FILING_DATE\":{\"start\":null,\"end\":null},\"LAPSE_DATE\":{\"start\":null,\"end\":null}}';
    // const urlJson = JSON.parse(searchPostData);
     const headerss = { 'Content-type': 'application/json' };
     return this.httpclient.post<any>(serchUrl, searchJson, { headers: { 'Content-type': 'application/json' } });
  }


  getCompanyDetails(value : any): Observable<any> {

    const serchUrl = 'https://bizfileonline.sos.ca.gov/api/FilingDetail/ucc/' +value + '/false';
    //const searchPostData = '{\"SEARCH_VALUE\":\"impresa aerospace\",\"STATUS\":\"ALL\",\"RECORD_TYPE_ID\":\"0\",\"FILING_DATE\":{\"start\":null,\"end\":null},\"LAPSE_DATE\":{\"start\":null,\"end\":null}}';

    //const urlJson = JSON.parse(searchPostData);
    //const headerss = { 'Content-type': 'application/json' };
    return this.httpclient.get<any>(serchUrl);
 }


 getHistoryOfLicense(value : any): Observable<any> {

  const serchUrl = 'https://bizfileonline.sos.ca.gov/api/History/ucc/' +value ;
  //const searchPostData = '{\"SEARCH_VALUE\":\"impresa aerospace\",\"STATUS\":\"ALL\",\"RECORD_TYPE_ID\":\"0\",\"FILING_DATE\":{\"start\":null,\"end\":null},\"LAPSE_DATE\":{\"start\":null,\"end\":null}}';

  //const urlJson = JSON.parse(searchPostData);
  //const headerss = { 'Content-type': 'application/json' };
  return this.httpclient.get<any>(serchUrl);
}

getHistoryOfLicensePromise(value : any) {

  const serchUrl = 'https://bizfileonline.sos.ca.gov/api/History/ucc/' +value ;
  return this.httpclient.get(serchUrl).toPromise();
}



getHistory2(){

   const headerss = { 'Content-type': 'application/json' };
  // return this.httpclient.post<any>(serchUrl, searchJson, { headers: { 'Content-type': 'application/json' } });
  

  const serchUrl = 'http://'+this.javaServerIp+':'+ this.javaServerPort + '/api/auditlog';
  //console.log(serchUrl);
  return this.httpclient.get(serchUrl,{ headers: { 'Content-type': 'application/json' } }).toPromise();

}


getHistory(auditlogJson:any): Observable<any> {
  const serchUrl = 'https://'+this.javaServerIp+':'+ this.javaServerPort + '/api/auditlog/get';
  console.log(serchUrl);

  return this.httpclient.post<any>(serchUrl, auditlogJson, { headers: { 
    'Content-type': "application/json"
} });


}



saveAuditlog(auditlogJson:any): Observable<any> {
  const serchUrl = 'https://'+this.javaServerIp+':'+ this.javaServerPort + '/api/auditlog/create';
  console.log(serchUrl);

  return this.httpclient.post<any>(serchUrl, auditlogJson, { headers: { 
    'Content-type': "application/json"
    
} });


}



}

// 'Content-type': "application/json",
// 'Access-Control-Allow-Origin': "*",
// 'Access-Control-Allow-Methods': "*",
// // 'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE, OPTIONS",
// // "Access-Control-Allow-Headers": "origin, content-type, accept, x-requested-with",
// "Access-Control-Allow-Headers": "*",
// 'Referrer-Policy' :"no-referrer"
// // 'Referrer-Policy' :"no-referrer-when-downgrade"