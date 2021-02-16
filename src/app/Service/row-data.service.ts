import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';






@Injectable({
  providedIn: 'root'
})
export class RowDataService {
  respons: any;



  constructor(private httpclient: HttpClient) {




  }

  searchCompany(): Observable<any> {

     const serchUrl = 'https://bizfileonline.sos.ca.gov/api/Records/uccsearch';
     const searchPostData = '{\"SEARCH_VALUE\":\"impresa aerospace\",\"STATUS\":\"ALL\",\"RECORD_TYPE_ID\":\"0\",\"FILING_DATE\":{\"start\":null,\"end\":null},\"LAPSE_DATE\":{\"start\":null,\"end\":null}}';

     const urlJson = JSON.parse(searchPostData);
     const headerss = { 'Content-type': 'application/json' };
     return this.httpclient.post<any>(serchUrl, urlJson, { headers: { 'Content-type': 'application/json' } });
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




// https://bizfileonline.sos.ca.gov/api/History/ucc/187642982633




}
