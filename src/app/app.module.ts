import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexPageComponent } from './index-page/index-page.component';
import { ScegliSerieComponent } from './scegli-serie/scegli-serie.component';
import { SerieAComponent } from './serie-a/serie-a.component';
import { SorteggioComponent } from './sorteggio/sorteggio.component';
import { Utils } from './models/utils';
import { SorteggioDoneResolver } from './index-page/sorteggioDone-resolver';
import { RankingPresentResolver } from './scegli-serie/rankingPresent-resolver';
import { SorteggioService } from './sorteggio.service';
import { SerieBComponent } from './serie-b/serie-b.component';
import { SerieCComponent } from './serie-c/serie-c.component';
import { StoricoSorteggiComponent } from './storico-sorteggi/storico-sorteggi.component';

import { ModalModule, AccordionModule } from 'ngx-bootstrap';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import {FormsModule} from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    ScegliSerieComponent,
    SerieAComponent,
    SorteggioComponent,
    SerieBComponent,
    SerieCComponent,
    StoricoSorteggiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    ShowHidePasswordModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: 'modal-content'
    })
  ],
  providers: [Utils, SorteggioDoneResolver, RankingPresentResolver, SorteggioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
