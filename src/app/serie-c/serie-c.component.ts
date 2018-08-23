import { Component, OnInit } from '@angular/core';
import { ParametriPaginaSorteggi } from '../models/models';

@Component({
  selector: 'app-serie-c',
  templateUrl: './serie-c.component.html',
  styleUrls: ['./serie-c.component.css']
})
export class SerieCComponent implements OnInit {

  parametriSorteggio: ParametriPaginaSorteggi = <ParametriPaginaSorteggi>{};

  constructor() { }

  ngOnInit() {

    this.parametriSorteggio.serie = 'C';
    this.parametriSorteggio.bgTitolo = 'bg-danger';
    this.parametriSorteggio.g1 = 'I';
    this.parametriSorteggio.g2 = 'L';
    this.parametriSorteggio.g3 = 'M';
    this.parametriSorteggio.g4 = 'N';

  }

}
