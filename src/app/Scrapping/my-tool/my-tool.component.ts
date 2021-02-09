import { RowDataService } from './../../Service/row-data.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Scrapping } from '../my-tool/Scrapping.DTO';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';


@Component({
  selector: 'app-my-tool',
  templateUrl: './my-tool.component.html',
  styleUrls: ['./my-tool.component.css'],
})
export class MyToolComponent implements OnInit, AfterViewInit {
  scrappingModel: Scrapping = new Scrapping();
  template: any;
  rows: any =[];
  edge: any;
  public colArray = [];
  displayedColumns= [];
  DataTableRow:any =[];
  listCount =this.DataTableRow.length;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(public rowdataservice: RowDataService) {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.DataTableRow);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  opneLicenseDetails(id: any) {
    const filterValue = id;
    this.GetLicenseInterDetails(id);
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    //console.log( filterValue.trim().toLowerCase());
  }

  GetData() {
    console.log(this.scrappingModel.Name);

    console.log('calling search api');
    this.rowdataservice.searchCompany().subscribe((res) => {
      const FullJson = res;
      console.log(FullJson);
      this.template = FullJson['template'];
      this.rows = FullJson['rows'];
      this.template = FullJson['template'];
      this.edge = FullJson['edge'];
      console.log('extraction complete');
      this.colArray = Array.from(FullJson['template']);
      //console.log(this.template);
      //console.log((Object.values(template)));
    });

   this.displayedColumns = this.prepareUiColumn(this.template);
   this.DataTableRow= this.prepareDataTableRows(this.rows);
   this.dataSource = new MatTableDataSource(this.DataTableRow);

  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  }

  GetLicenseInterDetails(id: any) {
    console.log(this.scrappingModel.Name);

    console.log('calling getCompanyDetails');
    this.rowdataservice.getCompanyDetails(id).subscribe((res) => {
      const FullJson = res;
      console.log(FullJson);

      console.log('extraction complete');

      //console.log(this.template);
      //console.log((Object.values(template)));
    });


  }








  prepareUiColumn(template: any) {
    let UiColumn: any = [];
    for (let key in template) {
      let value = template[key];
      UiColumn.push(value['label']);
    }
    return UiColumn;
  }

  prepareDataTableRows(row: any) {
     let rowObject: any = [];
    for (let key in row) {
      let value = row[key];
      let data = {
        "UCC Type" : value['RECORD_TYPE'],
        "Debtor Information" : value['TITLE'],
        "File Number" : value['RECORD_NUM'],
        "Secured Party Info" : value['SEC_PARTY'],
        "Status" : value['STATUS'],
        "Filing Date" : value['FILING_DATE'],
        "Lapse Date" : value['LAPSE_DATE'],
        "id" : value['ID']
    };
     rowObject.push(data);
  }

  return rowObject;
  }


  openLicense(value: any) {
    this.rowdataservice.getCompanyDetails(value).subscribe((res) => {
      const FullJson = res;
      console.log(FullJson);
    });
  }



}


export interface UserData {
  dd : string;
  name: string;
  progress: string;
  color: string;
}


/** Builds and returns a new User. */
function createNewUser(id: number): any {
  return {
    id: id.toString(),
    name: 'xxxxxxxxxx',
    progress: 'kkkkkkkkk',
    color: 'sssssssss',
  };
}
