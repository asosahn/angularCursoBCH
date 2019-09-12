import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as FusionCharts from 'fusioncharts';
@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {
  dataSource: any;
  title: string;
  constructor() {
    this.title = 'Angular  FusionCharts Sample';
    this.dataSource = {
      chart: {
        caption: 'Countries With Most Oil Reserves [2017-18]',
        subCaption: 'In MMbbl = One Million barrels',
        xAxisName: 'Country',
        yAxisName: 'Reserves (MMbbl)',
        numberSuffix: 'K',
        theme: 'fusion'
      },
      data: [
        { label: 'Venezuela', value: '290' },
        { label: 'Saudi', value: '260' },
        { label: 'Canada', value: '180' },
        { label: 'Iran', value: '140' },
        { label: 'Russia', value: '115' },
        { label: 'UAE', value: '100' },
        { label: 'US', value: '30' },
        { label: 'China', value: '30' }
      ]
    };
   }
  exportChart(e) {
    FusionCharts.batchExport({
      exportFormat: 'pdf'
    });
  }
  ngOnInit() {
    setInterval(() => {
      this.dataSource.data =  [{ label: 'Venezuela', value: _.random(10, 1000) },
      { label: 'Saudi', value: _.random(10, 1000) },
      { label: 'Canada', value: _.random(10, 1000) },
      { label: 'Iran', value: _.random(10, 1000) },
      { label: 'Russia', value: _.random(10, 1000) },
      { label: 'UAE', value: _.random(10, 1000) },
      { label: 'US', value: _.random(10, 1000) },
      { label: 'China', value: _.random(10, 1000) }];
    }, 10000);
  }

}
