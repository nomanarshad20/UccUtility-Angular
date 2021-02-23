import { Component } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';

import { Router } from '@angular/router';


import { Scrapping } from '../../src/app/Scrapping/my-tool/Scrapping.DTO';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  scrappingModellogin: Scrapping = new Scrapping();
  title = 'MyDemoa';


  creadentialArray: any[] = [
    { email: "GerardiT", pass: "Scr@p3r12021" },
    { email: "WyattB", pass: "Scr@p3r22021" },
    { email: "MooreA", pass: "Scr@p3r32021" },
    { email: "HayesB", pass: "Scr@p3r42021" },
    { email: "KowalskiT", pass: "Scr@p3r52021" },
    { email: "BoadwayS", pass: "Scr@p3r62021" },
    { email: "ChangG", pass: "Scr@p3r72021" },
    { email: "GarciaD", pass: "Scr@p3r82021" },
    { email: "ChandS", pass: "Scr@p3r92021" },
    { email: "CamuaS", pass: "Scr@p3r102021" },
    { email: "RileyM", pass: "Scr@p3r112021" },
    { email: "BradfordM", pass: "Scr@p3r122021" },
    { email: "ChangJ", pass: "Scr@p3r132021" },
    { email: "RileyT", pass: "Scr@p3r142021" },
    { email: "Administrator", pass: "P@ssword2021!" },
    { email: "aa", pass: "aa" }
];

  constructor(public inputTextModule: InputTextModule ,public buttonModule:ButtonModule ,private router: Router) {


  }


  signIn(){
   let isFound: boolean =false;
   for (var i = 0; i < this.creadentialArray.length; i++) {
    
   let row= this.creadentialArray[i];
    if(row['pass'] === this.scrappingModellogin.PASSWORD && row['email'] === this.scrappingModellogin.EMAIL ){
      console.log( 'break');
      isFound = true;
      break;
    }
   }

   if(isFound){
    this.router.navigate(['/ScrappingModule']);
   }

   

   console.log( 'ending method');
  }
}





