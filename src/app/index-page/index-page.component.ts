import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {SorteggioService} from '../sorteggio.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css'],
  providers: [SorteggioService]
})
export class IndexPageComponent implements OnInit {

  pwd: string;

  constructor(private sorteggioService: SorteggioService, private router: Router) { }

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

  ngOnInit() {
  }

}
