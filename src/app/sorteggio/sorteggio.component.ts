//import { ViewChild, Component, Input, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

import {ParametriPaginaSorteggi,
        DatiSquadra,
        SquadraSorteggiata,
        SquadraSorteggiataGirone,
        SquadraEstrattaGironeImmagini} from '../models/models';

import {Utils} from '../models/utils';

import {SorteggioService} from '../sorteggio.service';

@Component({
  selector: 'app-sorteggio',
  templateUrl: './sorteggio.component.html',
  styleUrls: ['./sorteggio.component.css'],
  providers: [SorteggioService]
})

export class SorteggioComponent implements OnInit {

  //@ViewChild('btnClose') btnClose: ElementRef;

  @Input() parametriPagina: ParametriPaginaSorteggi;

  eMailAddress: string;

  fasceFull: DatiSquadra[][];
  fasceToSave: DatiSquadra[][];
  fasceDraft: DatiSquadra[][];
  odsDraft: any[];
  fasciaSquadreDraft: number[];
  nSquadra: number;
  nFascia: number;
  gironeDrafted: SquadraSorteggiataGirone[];
  gironiToDraft: string[];
  serieToDraft: string;
  nGironiDrafted = 0;

  stagione: string;
  flgSave: boolean;
  flgSaved: boolean;
  flagDraft: boolean;
  btnBack: boolean; // variabile per mostrare/nascondere il bottone torna indietro
  btnDraft: boolean; // variabile per mostrare/nascondere il bottone estrai squadra
  girone: string;

  squadreGirone1: SquadraSorteggiataGirone[];
  squadreGirone2: SquadraSorteggiataGirone[];
  squadreGirone3: SquadraSorteggiataGirone[];
  squadreGirone4: SquadraSorteggiataGirone[];
  squadreGironeEstratto: SquadraSorteggiataGirone[];

  squadreFascia1: DatiSquadra[];
  squadreFascia2: DatiSquadra[];
  squadreFascia3: DatiSquadra[];
  squadreFascia4: DatiSquadra[];

  squadraEstratta: SquadraSorteggiataGirone;
  squadraEstrattaImmagini: SquadraEstrattaGironeImmagini;

  modalRef: BsModalRef;

  constructor(private sorteggioService: SorteggioService, private utils: Utils, private modalService: BsModalService) { }

  randomNumber (minimum: number, maximum: number): number {
    return Math.round(Math.random() * (maximum - minimum) + minimum);
  }

  fillDraft (): void {

    this.flagDraft = true;
    if (this.nSquadra > 8) {
      this.setGironeDrafted();
      this.nGironiDrafted++; // numero di gironi sorteggiati
      if (this.nGironiDrafted === 4) {
        this.flgSave = true;
      }
    }

  }

  fillGironiToDraft (serie: string): void {

    this.gironiToDraft = [];
    switch (serie) {
      case 'A':
        this.gironiToDraft.push('A');
        this.gironiToDraft.push('B');
        this.gironiToDraft.push('C');
        this.gironiToDraft.push('D');
        break;
      case 'B':
        this.gironiToDraft.push('E');
        this.gironiToDraft.push('F');
        this.gironiToDraft.push('G');
        this.gironiToDraft.push('H');
        break;
      case 'C':
        this.gironiToDraft.push('I');
        this.gironiToDraft.push('L');
        this.gironiToDraft.push('M');
        this.gironiToDraft.push('N');
        break;
      default:
        this.gironiToDraft.push('X');
        break;
    }
  }

  getGironeToDraft (): string {

    let nGirone = 0;

    do {
      nGirone = this.randomNumber(0, 3);
    } while (this.gironiToDraft[nGirone] === 'X');
    const gironeDrafted = this.gironiToDraft[nGirone];
    this.gironiToDraft[nGirone] = 'X';
    return gironeDrafted;
  }

  getSquadraToDraft (fascia: number ): SquadraSorteggiata { // fascia da 0-3 [0=1 , 1=2 , 2=3 , 3=4]

    console.log('fascia : ' + fascia);

    let squadra = 0;
    let fasciaSquadra = '';

    do {
      squadra = this.randomNumber(0, 7);
    } while (this.fasceDraft[fascia][squadra].squadra === '');

    switch (this.fasceDraft[fascia][squadra].fascia) {

      case '1' :
        fasciaSquadra = 'badge-success';
        break;

      case '2' :
        fasciaSquadra = 'badge-primary';
        break;

      case '3' :
        fasciaSquadra = 'badge-warning';
        break;

      case '4' :
        fasciaSquadra = 'badge-danger';
        break;

      default:
        fasciaSquadra = 'badge-success';
        break;
    }

    let squadraDrafted = {squadra: '' , allenatore: '', fasciaSquadra: ''};
    squadraDrafted.squadra = this.fasceDraft[fascia][squadra].squadra;
    squadraDrafted.allenatore = this.fasceDraft[fascia][squadra].allenatore;
    squadraDrafted.fasciaSquadra = fasciaSquadra;
    this.fasceDraft[fascia][squadra].squadra = '';
    this.fasceDraft[fascia][squadra].allenatore = '';
    this.fasceDraft[fascia][squadra].ranking = '';
    return squadraDrafted;

  }

  getOdsToDraft (): any {

    let ods = 0;

    do {
      ods = this.randomNumber(0, 7);
    } while (this.odsDraft[ods] === 'X');
    const odsDrafted = this.odsDraft[ods];
    this.odsDraft[ods] = 'X';
    return odsDrafted;
  }

  fillFasceBeforeDraft (listaFasce: DatiSquadra[][]): void {

    this.fasceDraft = this.fasceFull;

    this.squadreFascia1 = listaFasce[0];
    this.squadreFascia2 = listaFasce[1];
    this.squadreFascia3 = listaFasce[2];
    this.squadreFascia4 = listaFasce[3];

  }

  fillGironiBeforeDraft (): void {

    const arrGirone: SquadraSorteggiataGirone[][] = [];
    let arrSquadreGirone: SquadraSorteggiataGirone[] = [];

    for (let x = 0; x < 8; x++) {
      for (let i = 0; i < 8; i++) {
        const ods = i + 1;
        const squadra: SquadraSorteggiataGirone = {ods: ods, squadra: '', allenatore: '', fasciaSquadra: 'badge-info'};
        arrSquadreGirone.push(squadra);
      }
      arrGirone.push(arrSquadreGirone);
      arrSquadreGirone = [];
    }
    this.squadreGirone1 = arrGirone[0];
    this.squadreGirone2 = arrGirone[1];
    this.squadreGirone3 = arrGirone[2];
    this.squadreGirone4 = arrGirone[3];
    this.squadreGironeEstratto = arrGirone[0]; // sulla modal
    this.gironeDrafted = arrGirone[0]; // sulla modal
  }

  getFasce (serie: string, stagione: number): void {

      this.sorteggioService.getFasce( serie, stagione ).subscribe(
        data => {
                        console.log(' getFasce Response is: ' + data);
                        this.fasceFull = data;
                        this.fasceToSave = _.cloneDeep(this.fasceFull); // deep copy dell'oggetto non per referenza
                        this.fillFasceBeforeDraft(this.fasceFull);
                        this.fillGironiBeforeDraft();
                        } , // success path
        error => this.fasceFull = <DatiSquadra[][]>{} // error path
      );

  }

  initSorteggioGirone (template: TemplateRef<any>): void {

    if (this.nGironiDrafted < 4) {

      this.btnBack = false; // variabile per mostrare/nascondere il bottone torna indietro
      this.btnDraft = true; // variabile per mostrare/nascondere il bottone estrai squadra
      this.flagDraft = true; // visualizza la lista del girone e nasconde la squadra sorteggiata
      this.girone = this.getGironeToDraft();
      // resetto i dati della modal per estrazione nuovo girone
      const nSquadra = 1;
      this.nSquadra = nSquadra;
      this.fasciaSquadreDraft = [1, 2, 3, 4, 4, 3, 2, 1];
      const nFascia = this.fasciaSquadreDraft[0];
      this.nFascia = nFascia;
      const odsDraft: any[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
      this.odsDraft = odsDraft;
      const arrSquadreGirone: SquadraSorteggiataGirone[] = [];
      for (let i = 0; i < 8; i++) {
        const ods = i + 1;
        const squadra: SquadraSorteggiataGirone = {ods: ods, squadra: '', allenatore: '', fasciaSquadra: 'badge-info'};
        arrSquadreGirone.push(squadra);
      }
      this.squadreGironeEstratto = arrSquadreGirone; // sulla modal
      this.gironeDrafted = arrSquadreGirone; // sulla modal
      // ------------------------------------------------------

      this.modalRef = this.modalService.show(template);

    }

  }

  setGironeDrafted (): void {

    this.btnBack = true; // variabile per mostrare/nascondere il bottone torna indietro
    this.btnDraft = false; // variabile per mostrare/nascondere il bottone estrai squadra
    this.flagDraft = true; // visualizza la lista del girone e nasconde la squadra sorteggiata
    this.squadreFascia1 = this.fasceDraft[0];
    this.squadreFascia2 = this.fasceDraft[1];
    this.squadreFascia3 = this.fasceDraft[2];
    this.squadreFascia4 = this.fasceDraft[3];

    switch (this.girone) {

      case 'A' :
      case 'E' :
      case 'I' :
        this.squadreGirone1 = this.gironeDrafted;
        break;

      case 'B' :
      case 'F' :
      case 'L' :
        this.squadreGirone2 = this.gironeDrafted;
        break;

      case 'C' :
      case 'G' :
      case 'M' :
        this.squadreGirone3 = this.gironeDrafted;
        break;

      case 'D' :
      case 'H' :
      case 'N' :
        this.squadreGirone4 = this.gironeDrafted;
        break;

      default:
        break;
    }

  }

  setDatiToSave (squadra: string, fascia: number, girone: string, ods: string): void {

    console.log('SetDatiToSave Parametri: ' + squadra + ' ' + fascia + ' ' + girone + ' ' + ods);
    const fasciaToInspect = fascia - 1;

    for (let i = 0; i < this.fasceToSave[fasciaToInspect].length; i++) {

      if (this.fasceToSave[fasciaToInspect][i].squadra === squadra) {

        this.fasceToSave[fasciaToInspect][i].girone = girone;
        this.fasceToSave[fasciaToInspect][i].ods = ods;

        console.log('SetDatiToSave fasceToSave: ' +
          this.fasceToSave[(fasciaToInspect)][i].squadra + ' ' +
          this.fasceToSave[(fasciaToInspect)][i].fascia + ' ' +
          this.fasceToSave[(fasciaToInspect)][i].girone + ' ' +
          this.fasceToSave[(fasciaToInspect)][i].ods + ' ' +
          this.fasceToSave[(fasciaToInspect)][i].stagione
        );

        break;
      }
    }
  }

  avviaSorteggioGirone (): void {

    const fascia = this.fasciaSquadreDraft[(this.nSquadra - 1)];
    const squadraDrafted = this.getSquadraToDraft((fascia - 1));
    const odsDrafted = this.getOdsToDraft();
    const squadraDraftedForGirone: SquadraSorteggiataGirone = {ods: odsDrafted,
                                                              squadra: squadraDrafted.squadra,
                                                              allenatore: squadraDrafted.allenatore,
                                                              fasciaSquadra: squadraDrafted.fasciaSquadra};
    const regExp = /[\s.:]/g;
    const squadraDraftedForGironeImmagini: SquadraEstrattaGironeImmagini = {squadra: squadraDrafted.squadra,
      allenatore: squadraDrafted.allenatore,
      imgLogo: 'assets/img/logo/logo_' + squadraDrafted.squadra.toString().toLowerCase().replace(regExp, '') + '.gif',
      imgAllenatore: 'assets/img/allenatore/foto_' + squadraDrafted.allenatore.toString().toLowerCase().replace(regExp, '') + '.jpg',
      imgMaglia: 'assets/img/maglia/maglia_' + squadraDrafted.squadra.toString().toLowerCase().replace(regExp, '') + '.gif'
    };
    this.gironeDrafted[(odsDrafted - 1)] = squadraDraftedForGirone;

    // aggiorno fasce toSave con i dati di girone e ods
    this.setDatiToSave(squadraDrafted.squadra, fascia, this.girone, odsDrafted);
    // ----------------------------------------------
    this.squadraEstratta = squadraDraftedForGirone;
    this.squadraEstrattaImmagini = squadraDraftedForGironeImmagini;
    this.squadreGironeEstratto = this.gironeDrafted; // sulla modal
    this.nFascia = this.fasciaSquadreDraft[this.nSquadra];
    this.nSquadra++;
    this.nSquadra = this.nSquadra;
    this.nFascia = this.nFascia;
    this.flagDraft = false;

  }

  saveSerie (serie: string): void {

    this.sorteggioService.saveSerie(this.fasceToSave, serie, this.stagione.substr(0,4 )).subscribe(
      data => {
                      this.flgSaved = true;
                      Swal({
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        title: 'Dati Salvati',
                        type: 'success'
                      }) 
                    } , // success path
      error =>  Swal({
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  title: 'Errore Salvataggio Dati',
                  type: 'error'
                })  // error path
  );

  }

  // LF 16/07/2018
  exportExcelSerie (serie: string): void {

    this.sorteggioService.exportExcelSerie(serie, this.stagione.substr(0 , 4 ));

  }

  sendExcelByMail(emailAddress: string, serie: string): void {

    this.eMailAddress = emailAddress;
    this.sorteggioService.getSorteggioStagioneSerie(this.stagione.substr(0, 4 ), serie ).subscribe(
      data => {
        this.sorteggioService.sendSorteggioByMail(serie, this.stagione.substr(0, 4 ), data, this.eMailAddress).subscribe(
          mailOk => { 
                      this.eMailAddress = ''; 
                      //this.btnClose.nativeElement.click(); 
                      Swal({
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        title: 'Email inviata',
                        type: 'success'
                      }) 
                    }
          , // success path
          mailKo => { 
                      this.eMailAddress = ''; 
                      //this.btnClose.nativeElement.click(); 
                      Swal({
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        title: 'Errore Invio Email',
                        type: 'error'
                      }) 
                    } // error path
        );
      },
      error =>  { 
                  this.eMailAddress = ''; 
                  //this.btnClose.nativeElement.click(); 
                  Swal({
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    title: 'Errore Invio Email',
                    type: 'error'
                  }) 
                }
    ); // error path

  }

  // LF 16/07/2018

  /*  showMessageModal(titolo: string, messaggio: string) {
      $('#modalTitle').remove(); // cancello il tag con id #modalTitle per non appendere ogni volta il titolo
      // aggiungo all'interno del tag con id #titleContainer il nuovo tag con id #modalTitle
      $('#titleContainer').prepend('<h3 id="modalTitle" class="modal-title">' + titolo + '</h3>');
      $('#msgText').remove(); // cancello il tag con id #msgText per non appendere ogni volta il messaggio
      // aggiungo all'interno del tag con id #msgContainer il nuovo tag con id #msgText
      $('#msgContainer').prepend('<h4 class="modal-title text-center" id="msgText">' + messaggio + '</h4>');
      $('#messageModal').modal('show'); // mostra la modal dei messaggi
    }*/

  ngOnInit() {

    this.serieToDraft = this.parametriPagina.serie;
    this.odsDraft = ['1', '2', '3', '4', '5', '6', '7', '8'];
    this.fillGironiToDraft(this.parametriPagina.serie);
    this.stagione = this.utils.getStagione();
    this.getFasce(this.parametriPagina.serie, Number(this.stagione.substr(0, 4 )));
    this.flgSave = false;
    this.flagDraft = false;
    this.flgSaved = false;
  }

}
