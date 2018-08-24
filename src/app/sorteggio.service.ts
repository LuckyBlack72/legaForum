import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; // per il get e il post non tipizzati

import {DatiSquadra, ExcelRow, Squadra} from './models/models';
import {Utils} from './models/utils';
import {tap} from 'rxjs/operators';

import * as XLSX from 'xlsx';


@Injectable()
export class SorteggioService {

  constructor ( private http: HttpClient, private utils: Utils) { }

  getFasce (serie: string, stagione: number): Observable<DatiSquadra[][]> {

    // i due modi per usare il metodo post o si tipizza il ritorno o si mappa il ritorno sul tipo dato che ci interessa,
    // sicuramente più leggibile e comodo il metodo 1 anche perchè non serve importare map di rxjs
   return this.http.get<DatiSquadra[][]>( this.utils.BASE_URL_BACKEND + '/getFasce' + '?serie=' + serie + '&stagione=' + stagione)
                                          .pipe(tap(fasce => console.log(fasce))); // usando metodo post 1
    // return this.http.post('/getFasce', serie).map(data => data as DatiSquadra[][]); // usando metodo post 2

    // i due modi per usare il metodo get o si tipizza il ritorno o si mappa il ritorno sul tipo dato che ci interessa,
    // sicuramente più leggibile e comodo il metodo 1 anche perchè non serve importare map di rxjs
    // return this.http.get<DatiSquadra[][]>('/getFasce' + '?' + serie); // using metodo get 1
    // return this.http.get('/getFasce' + '?' + serie).map(data => data as DatiSquadra[][]); // using metodo get 2

  }

  saveSerie (fasceToSave: DatiSquadra[][], serie: string, stagione: string): Observable<string> {

    const postData = {fasceAfterDraft: fasceToSave , serie: serie, stagione: stagione };
    return this.http.post<string>(this.utils.BASE_URL_BACKEND + '/saveSerie', postData);
  }

  checkPassword (pwd: string): Observable<string> {

    const postData = {password : pwd};

    return this.http.post<string>(this.utils.BASE_URL_BACKEND + '/checkPassword', postData);

  }

  // LF 18/07/2018
  getSorteggioStagioneSerie (stagione: string, serie: string): Observable<DatiSquadra[][]> {

    const postParameter = { stagione: stagione, serie: serie };
    return this.http.post<DatiSquadra[][]>(this.utils.BASE_URL_BACKEND + '/getSorteggioStagioneSerie', postParameter);

  }
  // LF 18/07/2018

  // LF 16/07/2018
  exportExcelSerie (serie: string, stagione: string): void {


    this.getSorteggioStagioneSerie(stagione.substr(0, 4 ), serie ).subscribe(
      data => {

        const sorteggioSerie = data;

        const workbook = XLSX.utils.book_new();
        let excelRows: ExcelRow[] = [];

        for (let i = 0 ; i < sorteggioSerie.length ; i++) {

          for (let j = 0; j < sorteggioSerie[i].length; j++) {
            excelRows.push({squadra: sorteggioSerie[i][j].squadra ,
                            allenatore: sorteggioSerie[i][j].allenatore,
                            ods: sorteggioSerie[i][j].ods});
          }

          XLSX.utils.book_append_sheet(workbook,
            XLSX.utils.json_to_sheet(excelRows),
            'Serie' + ' ' + serie + ' - ' + 'Girone ' +  sorteggioSerie[i][0].girone
          );

          excelRows = []; // ripulisco la array
        }

        XLSX.writeFile(workbook, 'ExportSerie' + serie + stagione + '.xlsx'); // scrive il file e di conseguenza te lo fa salvare

      } , // success path
      error => {
        alert('Errore nel caricamento dei dati');
      } // error path
    );

  }

  // LF 16/07/2018
  sendSorteggioByMail (serie: string, stagione: string, excelData: DatiSquadra[][], recipient: string): Observable<string> {

    const postData = {
                        recipient : recipient,
                        sender : 'fantasportLB@gmail.com',
                        mailSubject : 'Export Sorteggio Serie: ' + serie + ' Stagione: ' + stagione,
                        mailText : 'In allegato il file richiesto',
                        excelData : excelData,
                        serie : serie,
                        stagione: stagione
                    };

    return this.http.post<string>(this.utils.BASE_URL_BACKEND + '/sendMail', postData);
  }
  // LF 16/07/2018

  checkSorteggio (stagione: string): Observable<string> {

    const postData = {stagione : stagione};

    return this.http.post<string>(this.utils.BASE_URL_BACKEND + '/checkSorteggio', postData);

  }

}
