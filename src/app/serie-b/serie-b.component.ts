import { Component, OnInit } from '@angular/core';
import { ParametriPaginaSorteggi } from '../models/models';

@Component({
  selector: 'app-serie-b',
  templateUrl: './serie-b.component.html',
  styleUrls: ['./serie-b.component.css']
})
export class SerieBComponent implements OnInit {

  parametriSorteggio: ParametriPaginaSorteggi = <ParametriPaginaSorteggi>{};

  constructor() { }

  ngOnInit() {

    this.parametriSorteggio.serie = 'B';
    this.parametriSorteggio.bgTitolo = 'bg-warning';
    this.parametriSorteggio.g1 = 'E';
    this.parametriSorteggio.g2 = 'F';
    this.parametriSorteggio.g3 = 'G';
    this.parametriSorteggio.g4 = 'H';

  }

}
