import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() data: any;
  @Input() buttonTitle: string;
  @Output() clickButton = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  onClick(id: string) {
    console.log('Aprete Botón ' + id);
    this.clickButton.emit(id);
  }

}
