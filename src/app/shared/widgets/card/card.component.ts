import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() school: string;
  @Input() count: number;
  @Input() female: number;
  @Input() male: number;
  @Input() logo: string;

  constructor() { }

  ngOnInit(): void {
  }

}
