import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import { SorteggioService } from '../sorteggio.service';
import { Utils } from '../models/utils';

@Injectable()
export class SorteggioDoneResolver implements Resolve<boolean> {

    constructor(private sorteggioService: SorteggioService, private utils: Utils) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.sorteggioService.checkSorteggio(this.utils.getStagione().substring(0,4));
    }
}
