import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Http2ServerRequest } from 'http2';






@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  respons: any;

  // *****server configration *****
 // javaServerIp: string = "162.214.196.99";
  //javaServerPort: string = "8443";

  // *****local configration *****
  javaServerPort: string = "9595";
  javaServerIp: string = "localhost";

 // httpSecure: string = 'https://';
   httpSecure: string = 'http://';
  


  constructor(private httpclient: HttpClient) {

  }

  searchCompany(searchJson: any): Observable<any> {

    const serchUrl = 'https://bizfileonline.sos.ca.gov/api/Records/uccsearch';
    // const searchPostData = '{\"SEARCH_VALUE\":\"impresa aerospace\",\"STATUS\":\"ALL\",\"RECORD_TYPE_ID\":\"0\",\"FILING_DATE\":{\"start\":null,\"end\":null},\"LAPSE_DATE\":{\"start\":null,\"end\":null}}';
    // const urlJson = JSON.parse(searchPostData);
    const headerss = { 'Content-type': 'application/json' };
    return this.httpclient.post<any>(serchUrl, searchJson, { headers: { 'Content-type': 'application/json' } });
  }



  getCompanyDetails(value: any): Observable<any> {

    const serchUrl = 'https://bizfileonline.sos.ca.gov/api/FilingDetail/ucc/' + value + '/false';
    //const searchPostData = '{\"SEARCH_VALUE\":\"impresa aerospace\",\"STATUS\":\"ALL\",\"RECORD_TYPE_ID\":\"0\",\"FILING_DATE\":{\"start\":null,\"end\":null},\"LAPSE_DATE\":{\"start\":null,\"end\":null}}';

    //const urlJson = JSON.parse(searchPostData);
    //const headerss = { 'Content-type': 'application/json' };
    return this.httpclient.get<any>(serchUrl);
  }


  getHistoryOfLicense(value: any): Observable<any> {

    const serchUrl = 'https://bizfileonline.sos.ca.gov/api/History/ucc/' + value;
    //const searchPostData = '{\"SEARCH_VALUE\":\"impresa aerospace\",\"STATUS\":\"ALL\",\"RECORD_TYPE_ID\":\"0\",\"FILING_DATE\":{\"start\":null,\"end\":null},\"LAPSE_DATE\":{\"start\":null,\"end\":null}}';

    //const urlJson = JSON.parse(searchPostData);
    //const headerss = { 'Content-type': 'application/json' };
    return this.httpclient.get<any>(serchUrl);
  }

  getHistoryOfLicensePromise(value: any) {

    const serchUrl = 'https://bizfileonline.sos.ca.gov/api/History/ucc/' + value;
    return this.httpclient.get(serchUrl).toPromise();
  }



  getHistory2() {

    const headerss = { 'Content-type': 'application/json' };
    // return this.httpclient.post<any>(serchUrl, searchJson, { headers: { 'Content-type': 'application/json' } });


    const serchUrl = this.httpSecure + this.javaServerIp + ':' + this.javaServerPort + '/api/auditlog';
    //console.log(serchUrl);
    return this.httpclient.get(serchUrl, { headers: { 'Content-type': 'application/json' } }).toPromise();

  }





  getHistory(auditlogJson: any): Observable<any> {
    const serchUrl = this.httpSecure + this.javaServerIp + ':' + this.javaServerPort + '/api/auditlog/get';
    return this.httpclient.post<any>(serchUrl, auditlogJson, {
      headers: {
        'Content-type': "application/json"
      }
    });

  }





  saveAuditlog(auditlogJson: any): Observable<any> {
    const serchUrl = this.httpSecure + this.javaServerIp + ':' + this.javaServerPort + '/api/auditlog/create';
    //  console.log(serchUrl);
    return this.httpclient.post<any>(serchUrl, auditlogJson, {
      headers: {
        'Content-type': "application/json"
      }
    });
  }




  searcFloridaData(searchJson: any) {
    const serchUrl = this.httpSecure + this.javaServerIp + ':' + this.javaServerPort + '/api/florida/search';
    //  console.log(serchUrl);

    return this.httpclient.post<any>(serchUrl, searchJson, {
      headers: {
        'Content-type': "application/json"
      }
    }).toPromise();
  }

  getNextFloridaData(searchJson: any) {
    const serchUrl = this.httpSecure + this.javaServerIp + ':' + this.javaServerPort + '/api/florida/search/next';
    // console.log(serchUrl);

    return this.httpclient.post<any>(serchUrl, searchJson, {
      headers: {
        'Content-type': "application/json"
      }
    }).toPromise();
  }


  getPreviousFloridaData(searchJson: any) {
    const serchUrl = this.httpSecure + this.javaServerIp + ':' + this.javaServerPort + '/api/florida/search/previous';
    // console.log(serchUrl);

    return this.httpclient.post<any>(serchUrl, searchJson, {
      headers: {
        'Content-type': "application/json"
      }
    }).toPromise();
  }


  searcFlorida2ndPageResult(searchJson: any) {
    const serchUrl = this.httpSecure + this.javaServerIp + ':' + this.javaServerPort + '/api/florida/search/result';
    // console.log(serchUrl);

    return this.httpclient.post<any>(serchUrl, searchJson, {
      headers: {
        'Content-type': "application/json"
      }
    }).toPromise();
  }


  getFloridaDocLinksByAnchors(searchJson: any) {
    const serchUrl = this.httpSecure+ this.javaServerIp + ':' + this.javaServerPort + '/api/florida/search/result/link';
    // console.log(serchUrl);

    return this.httpclient.post<any>(serchUrl, searchJson, {
      headers: {
        'Content-type': "application/json"
      }
    }).toPromise();
  }


  getNYCSelectedMergeDocByLinks(searchJson: any) {
    const serchUrl = this.httpSecure + this.javaServerIp + ':' + this.javaServerPort + '/api/nyc/download/pdf';
    // console.log(serchUrl);

    return this.httpclient.post<any>(serchUrl, searchJson, {
      headers: {
        'Content-type': "application/json"
      }
    }).toPromise();
  }




  searchNycDataDebtor(searchJson: any) {
    const serchUrl = this.httpSecure + this.javaServerIp + ':' + this.javaServerPort + '/api/nyc/search/name';
    //  console.log(serchUrl);
   return this.httpclient.post<any>(serchUrl, searchJson, {
      headers: {
        'Content-type': "application/json"
      }
    }).toPromise();
  }


  searchNycDataFileNumber(searchJson: any) {
    const serchUrl = this.httpSecure + this.javaServerIp + ':' + this.javaServerPort + '/api/nyc/search/filenumber';
    //  console.log(serchUrl);
   return this.httpclient.post<any>(serchUrl, searchJson, {
      headers: {
        'Content-type': "application/json"
      }
    }).toPromise();
  }








}




// 'Content-type': "application/json",
// 'Access-Control-Allow-Origin': "*",
// 'Access-Control-Allow-Methods': "*",
//  'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE, OPTIONS",
//  "Access-Control-Allow-Headers": "origin, content-type, accept, x-requested-with",
// "Access-Control-Allow-Headers": "*",
// 'Referrer-Policy' :"no-referrer"
// 'Referrer-Policy' :"no-referrer-when-downgrade"