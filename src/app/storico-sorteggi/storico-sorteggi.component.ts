import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  DatiSquadra, Squadra, SquadraGironeStorico, SquadraGironeStoricoFormatted, Stagione, StoricoSquadra,
  StoricoSquadraFormatted, Allenatore
} from '../models/models';
import {StoricoSorteggioService} from '../storico-sorteggio.service';


@Component({
  selector: 'app-storico-sorteggi',
  templateUrl: './storico-sorteggi.component.html',
  styleUrls: ['./storico-sorteggi.component.css'],
  providers: [StoricoSorteggioService]
})
export class StoricoSorteggiComponent implements OnInit {

  @ViewChild('st') stCmb: ElementRef;
  @ViewChild('sq') sqCmb: ElementRef;

  listaStagioni: Stagione[];
  listaSquadre: Squadra[];
  listaAllenatori: Allenatore[];

  gironeA: SquadraGironeStoricoFormatted[] = [];
  gironeB: SquadraGironeStoricoFormatted[] = [];
  gironeC: SquadraGironeStoricoFormatted[] = [];
  gironeD: SquadraGironeStoricoFormatted[] = [];
  gironeE: SquadraGironeStoricoFormatted[] = [];
  gironeF: SquadraGironeStoricoFormatted[] = [];
  gironeG: SquadraGironeStoricoFormatted[] = [];
  gironeH: SquadraGironeStoricoFormatted[] = [];
  gironeI: SquadraGironeStoricoFormatted[] = [];
  gironeL: SquadraGironeStoricoFormatted[] = [];
  gironeM: SquadraGironeStoricoFormatted[] = [];
  gironeN: SquadraGironeStoricoFormatted[] = [];

  sorteggiSquadra: StoricoSquadraFormatted[];
  showSorteggi: boolean;
  showSorteggiSquadra: boolean;

  constructor(private storicoSorteggioService: StoricoSorteggioService) { }

  formatGirone (girone: SquadraGironeStorico[] ): SquadraGironeStoricoFormatted[] {

    let fasciaSquadra: string;
    const gironeFormatted: SquadraGironeStoricoFormatted[] = [];

    for (let i = 0; i < girone.length; i++) {

      switch (girone[i].fascia) {

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

      const squadraFormatted = {squadra: girone[i].squadra,
                                allenatore: girone[i].allenatore,
                                ods: girone[i].ods,
                                fasciaSquadra: fasciaSquadra};
      // console.log(squadraFormatted.squadra + squadraFormatted.allenatore + squadraFormatted.ods + squadraFormatted.fasciaSquadra);
      gironeFormatted.push(squadraFormatted);

    }

    return gironeFormatted;
  }

  formatSorteggioStagione (sorteggioFull: DatiSquadra[][][]): void {

    // pulisco tutti i gironi
    this.gironeA = [];
    this.gironeB = [];
    this.gironeC = [];
    this.gironeD = [];
    this.gironeE = [];
    this.gironeF = [];
    this.gironeG = [];
    this.gironeH = [];
    this.gironeI = [];
    this.gironeL = [];
    this.gironeM = [];
    this.gironeN = [];

    if ( sorteggioFull.length > 0 ) {

      const serieA = sorteggioFull[0];
      this.gironeA = this.formatGirone(serieA[0]);
      this.gironeB = this.formatGirone(serieA[1]);
      this.gironeC = this.formatGirone(serieA[2]);
      this.gironeD = this.formatGirone(serieA[3]);

    }

    if ( sorteggioFull.length > 1) {

      const serieB = sorteggioFull[1];
      this.gironeE = this.formatGirone(serieB[0]);
      this.gironeF = this.formatGirone(serieB[1]);
      this.gironeG = this.formatGirone(serieB[2]);
      this.gironeH = this.formatGirone(serieB[3]);

    }

    if ( sorteggioFull.length > 2) {

       const serieC = sorteggioFull[2];
       this.gironeI = this.formatGirone(serieC[0]);
       this.gironeL = this.formatGirone(serieC[1]);
       this.gironeM = this.formatGirone(serieC[2]);
       this.gironeN = this.formatGirone(serieC[3]);

    }

  }

  formatSorteggiSquadra (storicoSquadra: DatiSquadra[]): StoricoSquadraFormatted[] {

    let fasciaSquadra: string;
    let serieSquadra: string;
    const storicoSquadraFormatted: StoricoSquadraFormatted[] = [];

    for (let i = 0; i < storicoSquadra.length; i++) {
      switch (storicoSquadra[i].fascia) {

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
      switch (storicoSquadra[i].serie) {

        case 'A' :
          serieSquadra = 'badge-success';
          break;

        case 'B' :
          serieSquadra = 'badge-warning';
          break;

        case 'C' :
          serieSquadra = 'badge-danger';
          break;

        default:
          serieSquadra = 'badge-success';
          break;
      }

      const SquadraFormatted = {
        stagione: storicoSquadra[i].stagione,
        serie: storicoSquadra[i].serie,
        squadra: storicoSquadra[i].squadra,
        allenatore: storicoSquadra[i].allenatore,
        ranking: storicoSquadra[i].ranking,
        ods: storicoSquadra[i].ods,
        girone: storicoSquadra[i].girone,
        fasciaSquadra: fasciaSquadra,
        serieSquadra: serieSquadra };
      // console.log(squadraFormatted.squadra + squadraFormatted.allenatore + squadraFormatted.ods + squadraFormatted.fasciaSquadra);
      storicoSquadraFormatted.push(SquadraFormatted);
    }

    return storicoSquadraFormatted;
  }

  getListaStagioni (): void {

    this.storicoSorteggioService.getListaStagioni().subscribe(
      data => this.listaStagioni = data , // success path
      error => this.listaStagioni = [] // error path  metto come [] vuota la lista delle Stagioni
    );

  }

  getListaSquadre (): void {

    this.storicoSorteggioService.getListaSquadre().subscribe(
      data => this.listaSquadre = data , // success path
      error => this.listaSquadre = [] // error path [] vuota la lista delle Squadre
    );

  }

  getListaAllenatori (): void {

    this.storicoSorteggioService.getListaAllenatori().subscribe(
      data => this.listaAllenatori = data , // success path
      error => this.listaAllenatori = [] // error path [] vuota la lista delle Squadre
    );

  }

  getSorteggioStagione(stagione: string): void {

    if ( stagione !== 'XXX' ) {

      this.sqCmb.nativeElement.selectedIndex = 0;

      this.storicoSorteggioService.getSorteggioStagione(stagione.substr(0, 4 ) ).subscribe(
        data => {

          const sorteggioFull = data;
          this.formatSorteggioStagione(sorteggioFull);
          this.showSorteggi = true;
          this.showSorteggiSquadra = false;

        } , // success path
        error => {

          this.showSorteggi = false;
          this.showSorteggiSquadra = false;
          alert('Errore nel caricamento dei dati');

        } // error path
      );

    } else {
      this.showSorteggi = false;
      this.showSorteggiSquadra = false;
    }

  }

  getSorteggioSquadra(squadra: string): void {

    if ( squadra !== 'XXX' ) {

      this.stCmb.nativeElement.selectedIndex = 0;

      this.storicoSorteggioService.getSorteggioSquadra(squadra).subscribe(
        data => {

          const sorteggioFullSquadra = data;
          this.sorteggiSquadra = this.formatSorteggiSquadra(sorteggioFullSquadra);
          this.showSorteggiSquadra = true;
          this.showSorteggi = false;

         } , // success path
        error => {

          this.showSorteggi = false;
          this.showSorteggiSquadra = false;
          alert('Errore nel caricamento dei dati');

        } // error path
      );

    } else {
      this.showSorteggi = false;
      this.showSorteggiSquadra = false;
    }

  }


  getSorteggioAllenatore(allenatore: string): void {

    if ( allenatore !== 'XXX' ) {

      this.stCmb.nativeElement.selectedIndex = 0;

      this.storicoSorteggioService.getSorteggioAllenatore(allenatore).subscribe(
        data => {

          const sorteggioFullSquadra = data;
          this.sorteggiSquadra = this.formatSorteggiSquadra(sorteggioFullSquadra);
          this.showSorteggiSquadra = true;
          this.showSorteggi = false;

         } , // success path
        error => {

          this.showSorteggi = false;
          this.showSorteggiSquadra = false;
          alert('Errore nel caricamento dei dati');

        } // error path
      );

    } else {
      this.showSorteggi = false;
      this.showSorteggiSquadra = false;
    }

  }


  ngOnInit() {

    this.showSorteggi = false;
    this.showSorteggiSquadra = false;
    this.getListaStagioni();
    this.getListaSquadre();
    this.getListaAllenatori();

  }

}
