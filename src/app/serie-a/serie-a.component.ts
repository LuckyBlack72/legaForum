import {Component, Input, OnInit} from '@angular/core';
import { ParametriPaginaSorteggi } from '../models/models';

@Component({
  selector: 'app-serie-a',
  templateUrl: './serie-a.component.html',
  styleUrls: ['./serie-a.component.css']
})
export class SerieAComponent implements OnInit {

  parametriSorteggio: ParametriPaginaSorteggi = <ParametriPaginaSorteggi>{};

  constructor() { }

  ngOnInit() {

    this.parametriSorteggio.serie = 'A';
    this.parametriSorteggio.bgTitolo = 'bg-success';
    this.parametriSorteggio.g1 = 'A';
    this.parametriSorteggio.g2 = 'B';
    this.parametriSorteggio.g3 = 'C';
    this.parametriSorteggio.g4 = 'D';

  }

}
