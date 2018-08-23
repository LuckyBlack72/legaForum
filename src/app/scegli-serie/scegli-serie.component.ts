import { Component, OnInit } from '@angular/core';
import { Utils } from '../models/utils';

@Component({
  selector: 'app-scegli-serie',
  templateUrl: './scegli-serie.component.html',
  styleUrls: ['./scegli-serie.component.css'],
})
export class ScegliSerieComponent implements OnInit {

  stagione: string;

  constructor( private utils: Utils) { }

  ngOnInit() {

    this.stagione = this.utils.getStagione();

  }

}
