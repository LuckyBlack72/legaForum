import {Injectable} from '@angular/core';

@Injectable()
export class Utils {

  BASE_URL_BACKEND = 'http://localhost:2108';

  constructor() { }

  getStagione (): string {

    let stagione: any;
    let annoIntero: string;
    let anno: any;

    stagione = new Date(Date.now());

    annoIntero = stagione.getFullYear().toString();
    anno = stagione.getFullYear().toString().substr(2);
    anno = +anno + 1;

    return annoIntero + '/' + anno;

  }

}
