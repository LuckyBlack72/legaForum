export interface ParametriPaginaSorteggi {
  serie: string;
  bgTitolo: string;
  g1: string;
  g2: string;
  g3: string;
  g4: string;
}

export interface DatiSquadra {
  id: number;
  squadra: string;
  allenatore: string;
  stagione: number;
  serie: string;
  fascia: any;
  ranking: any;
  girone: string;
  ods: any;
}

export interface SquadraSorteggiata {
  squadra: string;
  allenatore: string;
  fasciaSquadra: string;
}

export interface SquadraSorteggiataGirone extends SquadraSorteggiata {
  ods: any;
}

export interface SquadraEstrattaGironeImmagini {
  squadra: string;
  allenatore: string;
  imgLogo: string;
  imgAllenatore: string;
  imgMaglia: string;
}

export interface SquadraGironeStorico {
  squadra: string;
  allenatore: string;
  fascia: string;
  ods: string;
}

export interface SquadraGironeStoricoFormatted {
  squadra: string;
  allenatore: string;
  ods: string;
  fasciaSquadra: string;
}

export interface StoricoSquadra {

  stagione: string;
  serie: string;
  squadra: string;
  allenatore: string;
  ranking: any;
  fascia: any;
  ods: any;
  girone: string;

}

export interface StoricoSquadraFormatted {

  stagione: number;
  serie: string;
  squadra: string;
  allenatore: string;
  ranking: any;
  ods: any;
  girone: string;
  fasciaSquadra: string;
  serieSquadra: string;

}

export interface Stagione {
  stagione: string;
}

export interface Squadra {
  squadra: string;
}

export interface ExcelRow {
  squadra: string;
  allenatore: string;
  ods: string;
}
