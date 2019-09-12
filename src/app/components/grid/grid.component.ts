import { Component, OnInit } from '@angular/core';
import 'ag-grid-enterprise';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  title = 'app';
  defaultColDef;
  rowData: Array<any> | any = [];
    // columnDefs = [
    //     {headerName: 'Make', field: 'make' },
    //     {headerName: 'Model', field: 'model' },
    //     {headerName: 'Price', field: 'price'}
    // ];
    columnDefs = [
      {headerName: 'Make', field: 'make', sortable: true, filter: true},
      {headerName: 'Model', field: 'model', sortable: true, filter: true},
      {headerName: 'Price', field: 'price', sortable: true, filter: true}
  ];
    // rowData = [
    //     { make: 'Toyota', model: 'Celica', price: 35000 },
    //     { make: 'Ford', model: 'Mondeo', price: 32000 },
    //     { make: 'Porsche', model: 'Boxter', price: 72000 }
    // ];
  constructor(private http: HttpClient) {
    this.defaultColDef = {
      resizable: true,
      filter: true,
      editable: true,
    };
   }

  ngOnInit() {
    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    // this.socket.sendMessage('hola');
  }

}
