import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colorado',
  templateUrl: './colorado.component.html',
  styleUrls: ['./colorado.component.css']
})
export class ColoradoComponent implements OnInit {


  statesList: any = ['California', 'Florida' , 'NYC' , 'Colorado'];
  defaultSelectedState = this.statesList[3];


  constructor() { }

  ngOnInit(): void {
  }

}
