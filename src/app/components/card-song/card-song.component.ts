import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-song',
  templateUrl: './card-song.component.html',
  styleUrls: ['./card-song.component.css']
})
export class CardSongComponent implements OnInit {
  @Input() data: any;
  @Input() buttonTitle: string;
  @Output() buttonClickSongCard = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  onClickButtonCard( name: string ) {
    this.buttonClickSongCard.emit(name);
  }

}
