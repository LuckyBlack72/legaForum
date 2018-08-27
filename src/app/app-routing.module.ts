import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';
import { ScegliSerieComponent } from './scegli-serie/scegli-serie.component';
import {SerieAComponent} from './serie-a/serie-a.component';
import {SerieBComponent} from './serie-b/serie-b.component';
import {SerieCComponent} from './serie-c/serie-c.component';
import {StoricoSorteggiComponent} from './storico-sorteggi/storico-sorteggi.component';
import {SorteggioComponent} from './sorteggio/sorteggio.component';
import {SorteggioDoneResolver} from './index-page/sorteggioDone-resolver';

//qui si mettono i resolver per i vari routing
const routes: Routes = [
  { path: '', redirectTo: '/index-page', pathMatch: 'full' },
  { path: 'index-page', component: IndexPageComponent, resolve: {sorteggioCheck: SorteggioDoneResolver} },
  { path: 'scegli-serie', component: ScegliSerieComponent },
  { path: 'serie-a', component: SerieAComponent },
  { path: 'serie-b', component: SerieBComponent },
  { path: 'serie-c', component: SerieCComponent },
  { path: 'storico-sorteggi', component: StoricoSorteggiComponent },
  { path: 'getStagioni', component: StoricoSorteggiComponent },
  { path: 'getSquadre', component: StoricoSorteggiComponent },
  { path: 'getSorteggioSquadra', component: StoricoSorteggiComponent },
  { path: 'getSorteggioStagione', component: StoricoSorteggiComponent },
  { path: 'getFasce', component: SorteggioComponent },
  { path: 'saveSerie', component: SorteggioComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

