import { Component, OnInit, ViewChild } from '@angular/core';
import 'ag-grid-enterprise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  title = 'app';
  @ViewChild('agGrid', null) agGrid: AgGridAngular;
  gridApi;
  gridColumnApi;

  columnDefs;
  defaultColDef;
  rowData: any;
  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: "Athlete",
        field: "athlete",
        width: 150,
        enableRowGroup: true,
        enablePivot: true
      },
      {
        headerName: "Age",
        field: "age",
        width: 90,
        enableValue: true
      },
      {
        headerName: "Country",
        field: "country",
        width: 120,
        enableRowGroup: true,
        enablePivot: true
      },
      {
        headerName: "Year",
        field: "year",
        width: 90,
        enableRowGroup: true,
        enablePivot: true
      },
      {
        headerName: 'Date',
        field: 'date',
        width: 110,
        enableRowGroup: true,
        enablePivot: true
      },
      {
        headerName: 'Sport',
        field: 'sport',
        width: 110,
        enableRowGroup: true,
        enablePivot: true
      },
      {
        headerName: 'Gold',
        field: 'gold',
        width: 100,
        enableValue: true,
        aggFunc: 'sum'
      },
      {
        headerName: 'Silver',
        field: 'silver',
        width: 100,
        enableValue: true
      },
      {
        headerName: 'Bronze',
        field: 'bronze',
        width: 100,
        enableValue: true
      },
      {
        headerName: 'Total',
        field: 'total',
        width: 100,
        enableValue: true
      }
    ];
    this.defaultColDef = {
      resizable: true,
      filter: true,
      editable: true,
    };
  }
  ngOnInit() {
    //  this.http.get('https://api.myjson.com/bins/ly7d1',
    //  { headers: new HttpHeaders({
    //         intercept: 'false',
    //       }) }).subscribe(
    //   (data: any) => {
    //     this.rowData = data;
    //   }
    // );
  }

  turnOffPivotMode() {
    this.gridColumnApi.setPivotMode(false);
  }

  turnOnPivotMode() {
    this.gridColumnApi.setPivotMode(true);
  }

  addPivotColumn() {
    this.gridColumnApi.addPivotColumn('country');
  }

  addPivotColumns() {
    this.gridColumnApi.addPivotColumns(['year', 'country']);
  }

  removePivotColumn() {
    this.gridColumnApi.removePivotColumn('country');
  }

  emptyPivotColumns() {
    this.gridColumnApi.setPivotColumns([]);
  }

  exportToCsv() {
    this.gridApi.exportDataAsCsv({});
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json',
        {
          headers: new HttpHeaders({
            intercept: 'false',
          })
        }
      )
      .subscribe(data => {
        this.rowData = data;
      });
  }


}

// function setTitle(title: any) {
//   (document.querySelector('#title') as any).innerText = title;
// }

// onGridReady(params) {
//   this.gridApi = params.api;
//   this.gridColumnApi = params.columnApi;

//   this.http
//     .get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json',
//     { headers: new HttpHeaders({
//       intercept: 'false',
//     }) }
//     )
//     .subscribe(data => {
//       this.rowData = data;
//     });
// }
