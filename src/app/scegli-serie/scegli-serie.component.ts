import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

import { environment } from '../../environments/environment';
import { Utils } from '../models/utils';
import { DatiSquadra } from '../models/models';
import { SorteggioService } from '../sorteggio.service';
import { RankingPresentResolver } from './rankingPresent-resolver';

import { Command, CommandService } from '../command.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-scegli-serie',
  templateUrl: './scegli-serie.component.html',
  styleUrls: ['./scegli-serie.component.css'],
  providers: [SorteggioService, RankingPresentResolver]
})
export class ScegliSerieComponent implements OnInit, OnDestroy {

  stagione: string;
  rankingPresent: boolean;
  rankingPresentSerie: boolean;

  subscriptionHotKey: Subscription;

  constructor( 
                private utils: Utils, 
                private sorteggioService: SorteggioService, 
                private activatedRoute: ActivatedRoute,
                private commandService: CommandService
              ) { 

    this.subscriptionHotKey = this.commandService.commands.subscribe(c => this.handleCommand(c));

  }

  async importRankingSwalPopUp () { //async come le promise

    let ranking: DatiSquadra[] = [];
    let squadra: DatiSquadra = {
                                  id: 0,
                                  squadra: '',
                                  allenatore: '',
                                  stagione: parseInt(this.stagione.substr(0,4)),
                                  serie: '',
                                  fascia: '',
                                  ranking: '',
                                  girone: '',
                                  ods: ''
                                }; 
    
    const {value: file} = await Swal({ //await impedisce al codice sottostante di essere sereguito fino al fullfillment della promise
      title: 'Importa il Ranking Stagionale',
      input: 'file',
      inputAttributes: {
        accept: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      showCancelButton: true
    })
    
    if (file) {
      Swal.showLoading();
      const reader = new FileReader
      reader.onload = (e) => {
        
        var fileData = reader.result;
        
        /* creo il WorkBook*/
        var wb = XLSX.read(fileData, {type : 'binary'});
        /* Get worksheet */
        var ws = wb.Sheets[wb.SheetNames[0]];
        var wsRows = XLSX.utils.sheet_to_json(ws);
        for(var i = 0; i< wsRows.length; i++){
          for (let [key, value] of Object.entries(wsRows[i])){ //loop sulle righe del file
            if (key === 'Allenatore'){
              squadra.allenatore = value;
            }
            if (key === 'Squadra'){
              squadra.squadra = value;
            }
            if (key === 'Fascia'){
              squadra.fascia = value;
            }
            if (key === 'Serie'){
              squadra.serie = value;
            }
            if (key === 'Ranking'){
              squadra.ranking = value;
            }
          }
          ranking.push(squadra);
          squadra = {
            id: 0,
            squadra: '',
            allenatore: '',
            stagione: parseInt(this.stagione.substr(0,4)),
            serie: '',
            fascia: '',
            ranking: '',
            girone: '',
            ods: ''
          };           
        }
        this.sorteggioService.importRanking(ranking, this.stagione.substr(0,4)).subscribe(
          data =>  {
                    Swal.hideLoading();
                    Swal({
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            title: 'Ranking Importato con successo',
                            type: 'success'
                        })
                    },  // error path
          error =>  {
                    Swal.hideLoading();
                    Swal({
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            title: 'Errore Import Ranking',
                            type: 'error'
                        })  // error path
                    }
        );
      }
      reader.readAsBinaryString(file);
    }

  }

  setRankingFlag (rankingPresent: boolean): void {

      if(environment.production){ //produzione
        if(rankingPresent){ //ranking presente
          this.rankingPresent = true; //tasto import disabilitato 
          this.rankingPresentSerie = false; //tasti serie abilitati
        }else{
          this.rankingPresent = false //tasto import abilitato
          this.rankingPresentSerie = true; //tasti serie disabilitati
        }
      } else { // sviluppo //sempre abilitati
        this.rankingPresent = false; 
        this.rankingPresentSerie = false;
      }

  }

  handleCommand(command: Command) {
    
    switch (command.name) {
      case 'ScegliSerieComponent.SbloccaRanking': 
        this.rankingPresent = !(this.rankingPresent); 
      break;
      case 'ScegliSerieComponent.SbloccaSorteggio': 
        this.rankingPresentSerie = !(this.rankingPresentSerie); 
      break;
    }
  
  }

  ngOnInit() {

    this.activatedRoute.data.subscribe(({ rankingCheck }) => {
      this.setRankingFlag(rankingCheck);
      this.stagione = this.utils.getStagione();
    });

  }

  ngOnDestroy() {

    this.subscriptionHotKey.unsubscribe();

  }

}
