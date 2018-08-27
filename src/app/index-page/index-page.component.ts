import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

import { SorteggioService } from '../sorteggio.service';
import {StoricoSorteggioService} from '../storico-sorteggio.service';
import {SorteggioDoneResolver} from './sorteggioDone-resolver';

import { environment } from '../../environments/environment';
import { Utils } from '../models/utils';
import { Stagione } from '../models/models';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css'],
  providers: [SorteggioService, StoricoSorteggioService, SorteggioDoneResolver]
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
  listaStagioniSwal: {};
  listaSerieSwal: {};

  constructor(private sorteggioService: SorteggioService, private storicoSorteggioService: StoricoSorteggioService, private router: Router, private activatedRoute: ActivatedRoute, private utils: Utils) { }

  checkPassword (pwd: string): void {

    this.pwd = pwd;

    this.sorteggioService.checkPassword(this.pwd).subscribe(
      data => { // success path
          this.pwd = '';
          this.router.navigate(['/scegli-serie']) ;
      } ,
      error => { // error path
        Swal({
          allowOutsideClick: false,
          allowEscapeKey: false,
          title: 'Password Errata',
          type: 'error'
        })
      }
    );

  }  

  setsorteggioFlag (sorteggioDone: boolean): void {

    if(sorteggioDone){ //sorteggio effettuabile
      this.sorteggioDone = false;
    }else{
      if(environment.production){
        this.sorteggioDone = true // produzione
      }else{
        this.sorteggioDone = false // sviluppo
      }
    }


  }

  getListaStagioni (): void {


    this.storicoSorteggioService.getListaStagioni().subscribe(
      data => { // success path
        var StagioniAppo = {};
        this.listaStagioni = data;        
        this.listaSerie = ['A','B','C'];
        for(var x = 0; x < this.listaStagioni.length; x++){
          StagioniAppo[this.listaStagioni[x].stagione] = this.listaStagioni[x].stagione;
        }
        this.listaStagioniSwal = StagioniAppo;
        this.listaSerieSwal = {'A' : 'A', 'B' : 'B', 'C' : 'C'};
      },
      error => { // error path
        this.listaStagioni = [];   // metto come [] vuota la lista delle Stagioni
        this.listaSerie = [];
        this.listaStagioniSwal = {};
        this.listaSerieSwal = {};

      }
    );

  }

  sendExcelByMail  (): void {

    if(this.stagioneSelezionata === 'XXX' || this.serieSelezionata === 'XXX') {

      Swal({
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: 'Selezionare Stagione e Serie e un indirizzo Email valido per inviare export',
        type: 'error'
      })      

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
                        Swal({
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                          title: 'Email inviata',
                          type: 'success'
                        }) 
                      }
            , // success path
            mailKo => { 
                        this.stagioneSelezionata =  "XXX";
                        this.serieSelezionata = "X";    
                        this.stCmb.nativeElement.selectedIndex = 0;
                        this.srCmb.nativeElement.selectedIndex = 0;
                        this.eMailAddress = ''; 
                        this.btnClose.nativeElement.click(); 
                        Swal({
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                          title: 'Errore invio Email',
                          type: 'error'
                        }) 
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
                    Swal({
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      title: 'Errore invio Email',
                      type: 'error'
                    }) 
                  }
      ); // error path

    }

  }

  sendEmailSwalPopUp (): void {

      Swal.mixin({
        confirmButtonText: 'Avanti &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([
        {
          input: 'select',
          inputOptions: this.listaStagioniSwal, 
          inputPlaceholder: 'Seleziona una Stagione',
          title: 'Stagione',
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value) {
                resolve()
              } else {
                resolve('Devi Selezionare una Stagione')
              }
            })
          }           
        },
        {
          input: 'select',
          inputOptions: this.listaSerieSwal,          
          inputPlaceholder: 'Seleziona una Serie',
          title: 'Serie',
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value) {
                resolve()
              } else {
                resolve('Devi Selezionare una Serie')
              }
            })
          }          
        },
        {
          input: 'email',
          title: 'Email'
        },
      ]).then((result) => {
        if (result.value) {
          var parameterValue = JSON.parse(JSON.stringify(result.value));
          this.stagioneSelezionata = parameterValue[0];
          this.serieSelezionata = parameterValue[1];
          this.eMailAddress = parameterValue[2];
          this.sendExcelByMail();
        }
      })


  }

  ngOnInit() {

    this.activatedRoute.data.subscribe(({ sorteggioCheck }) => {
      this.setsorteggioFlag(sorteggioCheck);
      this.getListaStagioni();
      this.stagioneSelezionata =  "XXX";
      this.serieSelezionata = "X";
  });

  }

}
