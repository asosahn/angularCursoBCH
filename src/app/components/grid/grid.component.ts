import { UploadService } from './../../services/upload/upload.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import 'ag-grid-enterprise';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  title = 'app';
  defaultColDef;
  uploadResponse;
  form: FormGroup;
  files;
  rowData: Array<any> | any = [];
  gridApi: GridApi | any;
  gridColumnApi;
  @ViewChild('agGrid', null) agGrid: AgGridAngular;
  // columnDefs = [
  //     {headerName: 'Make', field: 'make' },
  //     {headerName: 'Model', field: 'model' },
  //     {headerName: 'Price', field: 'price'}
  // ];
  columnDefs = [
    { headerName: 'Make', field: 'make', sortable: true, filter: true },
    { headerName: 'Model', field: 'model', sortable: true, filter: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true }
  ];
  // rowData = [
  //     { make: 'Toyota', model: 'Celica', price: 35000 },
  //     { make: 'Ford', model: 'Mondeo', price: 32000 },
  //     { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];
  constructor(private http: HttpClient, private uploadService: UploadService) {
    this.defaultColDef = {
      resizable: true,
      filter: true,
      editable: true,
    };

    this.form = new FormGroup({
      file: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.http.get('https://api.myjson.com/bins/15psn9').subscribe(
      (data => {
        console.log(data);
        this.rowData = data;
      })
    );
  }

  onChangeFile($event: Event | any) {
    this.files = $event;
    if ($event.target.files.length > 0) {
      this.form.controls.file.setValue($event.target.files[0]);
    }
  }
  saveForm() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('file', this.form.value.file, this.form.value.file.name);
      this.uploadService.excel(formData)
        .subscribe(
          ((res: any) => {
            console.log(res);
            if (res && res.status === 'progress') {
              this.uploadResponse = res;
              console.log(res.message);
              if (res.message === 100) {
                setTimeout(() => {
                  this.uploadResponse.message = undefined;
                }, 2000);
              }
            } else if (res.file && res.file.originalname) {
              // this.allFiles.push(res.file);
              // res.file, res.data
              this.rowData = res.data;
              this.columnDefs = this.convertirColumnas(res.data);
            }
          }),
          err => console.log(err)
        );
    }
  }
  //   columnDefs = [
  //     {headerName: 'Make', field: 'make', sortable: true, filter: true},
  //     {headerName: 'Model', field: 'model', sortable: true, filter: true},
  //     {headerName: 'Price', field: 'price', sortable: true, filter: true
   //     aggFunc: 'sum'  }
  // ];
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.hideOverlay();
  }

  viewData() {
    const items: Array<any> = [];
    this.gridApi.forEachNode((node: any) => {
      items.push(node.data);
    });
    console.log(items);
  }

  convertirColumnas(arregloData: Array<any>) {
    if (arregloData.length > 0) {
      const columnas = Object.keys(arregloData[0]);
      const creacionColumnas = columnas.map(columna => {
        const generarColumna: any = {
          headerName: columna.toUpperCase(),
          field: columna.toLocaleLowerCase(),
          sortable: true,
          filter: true,
          enablePivot : true,
          enableRowGroup: true,
          enableValue: true,
        };
        if (this.rowData.length > 0 && this.rowData[0][columna] instanceof Number) {
          generarColumna.aggFunc = 'sum';
        }
        return generarColumna;
      });
      return creacionColumnas;
    } else {
      return [];
    }
  }
}
