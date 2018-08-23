import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'; // serve per usare la funzione of per tornare i dati mocked
import {tap} from 'rxjs/operators';

import {Utils} from './models/utils';
import {DatiSquadra, Squadra, Stagione} from './models/models';

@Injectable()
export class StoricoSorteggioService {

  constructor( private http: HttpClient, private utils: Utils ) { }

  getListaStagioni (): Observable<Stagione[]> {

    // chiamata ajax vera da ripristinare quando c'è il backEnd
    const postParameter = '';
    return this.http.post<Stagione[]>(this.utils.BASE_URL_BACKEND + '/getStagioni', postParameter)
                                    .pipe(tap(stagioni => console.log(stagioni)));
    // ritorno dati fissi
    // const stagioni: string[] = ['2017/18', '2018/19'];
    // return Observable.of(stagioni);

  }

  getListaSquadre (): Observable<Squadra[]> {

    // chiamata ajax vera da ripristinare quando c'è il backEnd
     const postParameter = '';
     return this.http.post<Squadra[]>(this.utils.BASE_URL_BACKEND + '/getSquadre', postParameter)
                                      .pipe(tap(squadre => console.log(squadre)));
    // ritorno dati fissi
    // const squadre: string[] = ['A.S. Poker', 'Swansea', 'Jeeg Robot', 'A.S. Paulina Maria', 'Mandarino Bretone'];
    // return Observable.of(squadre);

  }

  getSorteggioSquadra (squadra: string): Observable<DatiSquadra[]> {

    // chiamata ajax vera da ripristinare quando c'è il backEnd
    const postParameter = { squadra: squadra };
    return this.http.post<DatiSquadra[]>(this.utils.BASE_URL_BACKEND + '/getSorteggioSquadra', postParameter);


  }

  getSorteggioStagione (stagione: string): Observable<DatiSquadra[][][]> {

    // chiamata ajax vera da ripristinare quando c'è il backEnd
    const postParameter = { stagione: stagione };
    return this.http.post<DatiSquadra[][][]>(this.utils.BASE_URL_BACKEND + '/getSorteggioStagione', postParameter);


  }
}
