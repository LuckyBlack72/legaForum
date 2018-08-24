import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SorteggioService } from '../sorteggio.service';
import {StoricoSorteggioService} from '../storico-sorteggio.service';
import { environment } from '../../environments/environment';
import { Utils } from '../models/utils';
import { Stagione } from '../models/models';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css'],
  providers: [SorteggioService, StoricoSorteggioService]
})
export class IndexPageComponent implements OnInit {

  @ViewChild('btnClose') btnClose: ElementRef;
  @ViewChild('eMailAddress') inpEmail: ElementRef;
  @ViewChild('st') stCmb: ElementRef;
  @ViewChild('sr') srCmb: ElementRef;  

  pwd: string;
  sorteggioDone: boolean;
  
  eMailAddress: string;
  stagioneSelezionata: string;
  serieSelezionata: string;
  listaStagioni: Stagione[];
  listaSerie: string[];
  

  constructor(private sorteggioService: SorteggioService, private storicoSorteggioService: StoricoSorteggioService, private router: Router, private utils: Utils) { }

  checkPassword (): void {

    this.sorteggioService.checkPassword(this.pwd).subscribe(
      data => { // success path
          this.pwd = '';
          this.router.navigate(['/scegli-serie']) ;
      } ,
      error => { // error path
        alert('Password Errata'); 
      }
    );

  }  

  checkSorteggio (): void {

    this.sorteggioService.checkSorteggio(this.utils.getStagione().substring(0,4)).subscribe(
      data => this.sorteggioDone = false, // success path sorteggio da fare/finire
      error =>{
                if(environment.production){
                  this.sorteggioDone = true // produzione
                }else{
                  this.sorteggioDone = false // sviluppo
                }
      }
    );

  }

  getListaStagioni (): void {

    this.storicoSorteggioService.getListaStagioni().subscribe(
      data => { // success path
        this.listaStagioni = data;
        this.listaSerie = ['A','B','C'];
      },
      error => { // error path
        this.listaStagioni = [];   // metto come [] vuota la lista delle Stagioni
        this.listaSerie = [];
      }
    );

  }

  sendExcelByMail  (): void {

    if(this.stagioneSelezionata === 'XXX' || this.serieSelezionata === 'XXX' ) {

      alert('Selezionare Stagione e Serie per inviare export');

    } else {

      this.sorteggioService.getSorteggioStagioneSerie(this.stagioneSelezionata, this.serieSelezionata ).subscribe(
        data => {
          this.sorteggioService.sendSorteggioByMail(this.serieSelezionata, this.stagioneSelezionata, data, this.eMailAddress).subscribe(
            mailOk => {     
                        this.stagioneSelezionata =  "XXX";
                        this.serieSelezionata = "X";
                        this.stCmb.nativeElement.selectedIndex = 0;
                        this.srCmb.nativeElement.selectedIndex = 0;
                        this.eMailAddress = ''; 
                        this.btnClose.nativeElement.click(); 
                        alert('Email inviata'); 
                      }
            , // success path
            mailKo => { 
                        this.stagioneSelezionata =  "XXX";
                        this.serieSelezionata = "X";    
                        this.stCmb.nativeElement.selectedIndex = 0;
                        this.srCmb.nativeElement.selectedIndex = 0;
                        this.eMailAddress = ''; 
                        this.btnClose.nativeElement.click(); 
                        alert('Errore invio Email'); 
                      } // error path
          );
        },
        error => { 
                    this.stagioneSelezionata =  "XXX";
                    this.serieSelezionata = "X";    
                    this.stCmb.nativeElement.selectedIndex = 0;
                    this.srCmb.nativeElement.selectedIndex = 0;
                    this.eMailAddress = ''; 
                    this.btnClose.nativeElement.click(); 
                    alert('Errore invio Email'); 
                  }
      ); // error path

    }

  }

  ngOnInit() {

    this.checkSorteggio();
    this.getListaStagioni();
    this.stagioneSelezionata =  "XXX";
    this.serieSelezionata = "X";
  

  }

}
