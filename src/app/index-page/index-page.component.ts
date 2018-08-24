import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {SorteggioService} from '../sorteggio.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css'],
  providers: [SorteggioService]
})
export class IndexPageComponent implements OnInit {

  pwd: string;
  sorteggioDone: boolean;

  constructor(private sorteggioService: SorteggioService, private router: Router) { }

  checkPassword (): void {

    this.sorteggioService.checkSorteggio(this.pwd).subscribe(
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

    this.sorteggioService.checkPassword(this.pwd).subscribe(
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

  ngOnInit() {

    this.checkSorteggio();

  }

}
