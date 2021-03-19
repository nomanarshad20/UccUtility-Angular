import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Scrapping } from '../../Scrapping/my-tool/Scrapping.DTO';
import { RowDataService } from './../../Service/row-data.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  scrappingModellogin: Scrapping = new Scrapping();
  title = 'MyDemoa';
  durationInSeconds = 5;

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
    { email: "noman", pass: "pakistan" }
  ];

  constructor(public rowdataservice: RowDataService,  private router: Router
    , private _snackBar: MatSnackBar) {

    let loginValue = localStorage.getItem('loginKey');
    if (loginValue != null) {
      this.router.navigate(['/scrapping']);
    }


    
    this.rowdataservice.getHistory().then((res: any) => {
      const FullJson = res;
      console.log('ssssssssssssssssssssssssssssss');
      let historyJson = JSON.parse(FullJson);
      console.log(historyJson);
    });






  }





  signIn() {
    let isFound: boolean = false;
    for (var i = 0; i < this.creadentialArray.length; i++) {

      let row = this.creadentialArray[i];
      if (row['pass'] === this.scrappingModellogin.PASSWORD && row['email'] === this.scrappingModellogin.EMAIL) {
        console.log('break');

        // session value here
        localStorage.setItem('loginKey', 'yes');
        localStorage.setItem('userName', ''+this.scrappingModellogin.EMAIL);
        isFound = true;
        break;
      }
    }

    if (isFound) {

      let data = {
        id: "",
        action: "User Login",
        timestamp: ''+new Date()+'',
        userName: ''+this.scrappingModellogin.EMAIL
      };
      this.rowdataservice.saveAuditlog(data).subscribe((res) => {
       });

      this.router.navigate(['/scrapping']);
    } else {
      this.openSnackBar('Wrong Id or Password', 'OK');
    }


    console.log('ending method');
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }

}
