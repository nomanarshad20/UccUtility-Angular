import { RowDataService } from './../../Service/row-data.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Scrapping } from '../my-tool/Scrapping.DTO';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator/paginator';


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
  displayedColumns: any= [];
  DataTableRow:any =[];



  //displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public rowdataservice: RowDataService) {

    // this.UiColumn = this.prepareUiColumn(this.dataTableExp);
    // this.DataTableRow =  this.prepareDataTableRows(this.rows);


     //  DataTableRow = [];


    // Create 100 users
    const users = Array.from({ length: 50 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.DataTableRow);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

    console.log("caling prepareUiColumn");
    this.displayedColumns = this.prepareUiColumn(this.template);
    console.log(this.displayedColumns);

   this.DataTableRow= this.prepareDataTableRows(this.rows);

   this.dataSource = new MatTableDataSource(this.DataTableRow);

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
      //console.log(row['RECORD_TYPE'].element);
      let value = row[key];
      let data = {
        "UCC Type" : value['RECORD_TYPE'],
        "Debtor Information" : "element['TITLE']",
        "File Number" : value['RECORD_NUM'],
        "Secured Party Info" : "element['SEC_PARTY']",
        "Status" : value['STATUS'],
        "Filing Date" : value['FILING_DATE'],
        "Lapse Date" : value['LAPSE_DATE']
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

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'purple',
  'fuchsia',
  'lime',
  'teal',
  'aqua',
  'blue',
  'navy',
  'black',
  'gray',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

/** Builds and returns a new User. */
function createNewUser(id: number): any {
  // const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
  //     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: 'xxxxxxxxxx',
    progress: 'kkkkkkkkk',
    color: 'sssssssss',
  };
}
