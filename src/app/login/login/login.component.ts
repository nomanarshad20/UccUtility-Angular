import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '@app/Service/HttpRequest.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Scrapping } from '../../californiaucc/Scrapping.DTO';
import { ToastNotification } from '@app/Service/ToastNotification.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  scrappingModellogin: Scrapping = new Scrapping();

  creadentialArray: any[] = [
    { email: "GerardiT", pass: "Scr@p3r12021" },
    { email: "WyattB", pass: "Scr@p3r22021" },
    { email: "MooreA", pass: "Scr@p3r32021" },
    { email: "HayesB", pass: "Scr@p3r42021" },
    { email: "KowalskiT", pass: "Scr@p3r52021" },
    { email: "BoadwayS", pass: "Scr@p3r62021" },
    { email: "ChangG", pass: "Scr@p3r72021" },
    { email: "GarciaD", pass: "Scr@p3r82021" },
    { email: "ChanS", pass: "Scr@p3r92021" },
    { email: "CamuaS", pass: "Scr@p3r102021" },
    { email: "RileyM", pass: "Scr@p3r112021" },
    { email: "BradfordM", pass: "Scr@p3r122021" },
    { email: "ChangJ", pass: "Scr@p3r132021" },
    { email: "RileyT", pass: "Scr@p3r142021" },
    { email: "admin", pass: "Pakistan22" }
  ];

  constructor(public httpRequestService: HttpRequestService, private router: Router
    , private _snackBar: MatSnackBar, private toastNotification: ToastNotification, private toastr: ToastrService) {



    let loginValue = localStorage.getItem('loginKey');
    if (loginValue != null) {
      //this.router.navigate(['/florida']);
      this.router.navigate(['/california']);
     // this.router.navigate(['/nyc']);
      

    }
  }





  signIn() {
    try {

      let isFound: boolean = false;
      for (var i = 0; i < this.creadentialArray.length; i++) {

        let row = this.creadentialArray[i];
        if (row['pass'] === this.scrappingModellogin.PASSWORD && row['email'] === this.scrappingModellogin.EMAIL) {

          // session value here
          localStorage.setItem('loginKey', 'yes');
          localStorage.setItem('userName', '' + this.scrappingModellogin.EMAIL);
          isFound = true;
          break;
        }
      }

      if (isFound) {

        this.saveAuditLog("Downloaded Pdf File");

        this.router.navigate(['/california']);
        //  this.router.navigate(['/florida']);
      } else {
        this.openSnackBar('Wrong Id or Password', 'OK');
      }

    } catch (error) {
      console.log(error)
      this.toastNotification.error(error, 'Error on Login', this.toastr);
    }



  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }





  saveAuditLog(msgLog: string) {
    let data = {
      id: "",
      action: msgLog,
      timestamp: '' + new Date() + '',
      userName: '' + localStorage.getItem('userName')
    };

    this.httpRequestService.saveAuditlog(data)
      .subscribe(
        (response) => {
        },
        (error) => {
          this.toastNotification.error(error, 'AuditLog Create Failed', this.toastr);
        }
      )
  }







}
