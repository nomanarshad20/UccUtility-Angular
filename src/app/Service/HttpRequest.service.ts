import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';






@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  respons: any;


  javaServerPort: string = "8443";
  //javaServerPort: string = "9595";

  //javaServerIp: string = "localhost";
  javaServerIp: string = "162.214.196.99";


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


    const serchUrl = 'https://' + this.javaServerIp + ':' + this.javaServerPort + '/api/auditlog';
    //console.log(serchUrl);
    return this.httpclient.get(serchUrl, { headers: { 'Content-type': 'application/json' } }).toPromise();

  }





  getHistory(auditlogJson: any): Observable<any> {
    const serchUrl = 'https://' + this.javaServerIp + ':' + this.javaServerPort + '/api/auditlog/get';
    return this.httpclient.post<any>(serchUrl, auditlogJson, {
      headers: {
        'Content-type': "application/json"
      }
    });

  }





  saveAuditlog(auditlogJson: any): Observable<any> {
    const serchUrl = 'https://' + this.javaServerIp + ':' + this.javaServerPort + '/api/auditlog/create';
    //  console.log(serchUrl);
    return this.httpclient.post<any>(serchUrl, auditlogJson, {
      headers: {
        'Content-type': "application/json"
      }
    });
  }




  searcFloridaData(searchJson: any) {
    const serchUrl = 'https://' + this.javaServerIp + ':' + this.javaServerPort + '/api/florida/search';
    //  console.log(serchUrl);

    return this.httpclient.post<any>(serchUrl, searchJson, {
      headers: {
        'Content-type': "application/json"
      }
    }).toPromise();
  }

  getNextFloridaData(searchJson: any) {
    const serchUrl = 'https://' + this.javaServerIp + ':' + this.javaServerPort + '/api/florida/search/next';
    // console.log(serchUrl);

    return this.httpclient.post<any>(serchUrl, searchJson, {
      headers: {
        'Content-type': "application/json"
      }
    }).toPromise();
  }


  getPreviousFloridaData(searchJson: any) {
    const serchUrl = 'https://' + this.javaServerIp + ':' + this.javaServerPort + '/api/florida/search/previous';
    // console.log(serchUrl);

    return this.httpclient.post<any>(serchUrl, searchJson, {
      headers: {
        'Content-type': "application/json"
      }
    }).toPromise();
  }


  searcFlorida2ndPageResult(searchJson: any) {
    const serchUrl = 'https://' + this.javaServerIp + ':' + this.javaServerPort + '/api/florida/search/result';
    // console.log(serchUrl);

    return this.httpclient.post<any>(serchUrl, searchJson, {
      headers: {
        'Content-type': "application/json"
      }
    }).toPromise();
  }


  getFloridaDocLinksByAnchors(searchJson: any) {
    const serchUrl = 'https://' + this.javaServerIp + ':' + this.javaServerPort + '/api/florida/search/result/link';
    // console.log(serchUrl);

    return this.httpclient.post<any>(serchUrl, searchJson, {
      headers: {
        'Content-type': "application/json"
      }
    }).toPromise();
  }


  getNYCSelectedMergeDocByLinks(searchJson: any) {
    const serchUrl = 'http://' + this.javaServerIp + ':' + this.javaServerPort + '/api/nyc/download/pdf';
    // console.log(serchUrl);

    return this.httpclient.post<any>(serchUrl, searchJson, {
      headers: {
        'Content-type': "application/json"
      }
    }).toPromise();
  }




  searchNycDataDebtor(searchJson: any) {
    const serchUrl = 'http://' + this.javaServerIp + ':' + this.javaServerPort + '/api/nyc/search';
    //  console.log(serchUrl);
    let jsonList = [{ "Pages": "1", "Debtor Name": "ARIZONA LLC", "File no.": "246583", "Secured Address": "209 HAVEMEYER STREET, BROOKLYN, NY 11211-0000, USA", "Secured Party Name": "THE DIME SAVINGS BANK OF WILLIAMSBURGH", "Lapse Date": "12/17/2006", "Image": "", "File Date": "12/17/2001", "Debtor Address": "442 WEST 54TH STREET, NEW YORK, NY 10019-0000, USA", "Filing Type": "Financing Statement" }, { "Pages": "3", "Debtor Name": "ARIZONA LLC", "File no.": "202856", "Secured Address": "125 WEST 75TH STREET, NEW YORK, NY 10027-0000, USA", "Secured Party Name": "CARVER FEDERAL SAVINGS BANK", "Lapse Date": "09/04/2007", "Image": "", "File Date": "09/04/2002", "Debtor Address": "442 WEST 54TH STREET, NEW YORK, NY 10019-0000, USA", "Filing Type": "Financing Statement" }, { "Pages": "1", "Debtor Name": "ARIZONA LLC", "File no.": "200809260661822", "Secured Address": "209 HAVEMEYER STREET, BROOKLYN, NY 11211, USA", "Secured Party Name": "THE DIME SAVINGS BANK OF WILLIAMSBURGH", "Lapse Date": "09/26/2013", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=18383234&pidmname=DEFAULT&pApp=UCC ", "File Date": "09/26/2008", "Debtor Address": "442 WEST 54TH STREET, NEW YORK, NY 10019, USA", "Filing Type": "Financing Statement" }, { "Pages": "1", "Debtor Name": "ARIZONA LLC", "File no.": "201106225678724", "Secured Address": "565 FIFTH AVENUE, NEW YORK, NY 10017, USA", "Secured Party Name": "SIGNATURE BANK", "Lapse Date": "06/22/2016", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=21859945&pidmname=DEFAULT&pApp=UCC ", "File Date": "06/22/2011", "Debtor Address": "442 WEST 54TH STREET, NEW YORK, NY 10019, USA", "Filing Type": "Financing Statement" }, { "Pages": "2", "Debtor Name": "ARIZONA LLC", "File no.": "201302150087119", "Secured Address": "209 HAVEMEYER STREET, BROOKLYN, NY 11211, USA", "Secured Party Name": "THE DIME SAVINGS BANK OF WILLIAMSBURGH", "Lapse Date": "02/15/2018", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=25606686&pidmname=DEFAULT&pApp=UCC ", "File Date": "02/15/2013", "Debtor Address": "442 WEST 54TH STREET, NEW YORK, NY 10019, USA", "Filing Type": "Financing Statement" }, { "Pages": "1", "Debtor Name": "ARIZONA LLC", "File no.": "201508055865892", "Secured Address": "565 FIFTH AVENUE, NEW YORK, NY 10017, USA", "Secured Party Name": "SIGNATURE BANK", "Lapse Date": "08/05/2020", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=30688835&pidmname=DEFAULT&pApp=UCC ", "File Date": "08/05/2015", "Debtor Address": "87 EAST 116TH STREET, SUITE 302, NEW YORK, NY 10029, USA", "Filing Type": "Financing Statement" }, { "Pages": "1", "Debtor Name": "ARIZONA LLC", "File no.": "201702230089411", "Secured Address": "300 CADMAN PLAZA EAST, 8TH FLOOR, BROOKLYN, NY 11201, USA", "Secured Party Name": "DIME COMMUNITY BANK", "Lapse Date": "02/23/2022", "Image": "https://appext20.dos.ny.gov/ASPIMGView/imgview.aspx?pdocid=33310533&pidmname=DEFAULT&pApp=UCC ", "File Date": "02/23/2017", "Debtor Address": "87 EAST 116TH STREET, SUITE 302, NEW YORK, NY 10029, USA", "Filing Type": "Financing Statement" }];
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