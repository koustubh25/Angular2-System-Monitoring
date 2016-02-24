import {Injectable} from 'angular2/core';
import {JOBQUEUE} from '../mock/job_queue';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {config} from '../config/config';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GearmanService {


    constructor(private http:Http) {}

    makeHttpGetRequest(url){

        return Observable.interval(config.SUPERVISOR_REFRESH_INTERVAL * 1000)
            .switchMap(() => this.http.get(url))
            .map(res => res.json()
            );
        /*return this.http.get(url)
         .map(res =>res.json());*/
    }

    getGearmanInfo(){

        let url = config.GEARMAN_API_BASE + "/info"

        return this.makeHttpGetRequest(url);

    }

}

