import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Response} from "angular2/http";
import {PRIVATE_SERVERS} from "../mock/private_servers_list";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {config} from '../config/config';

@Injectable()
export class BatchServerService {

    constructor(private http:Http){}

    makeHttpGetRequest(url){

        return Observable.interval(config.BATCH_SERVERS_REFRESH_INTERVAL * 1000)
            .switchMap(() => this.http.get(url))
            .map(res => res.json()
            );
        /*return this.http.get(url)
         .map(res =>res.json());*/
    }

    makeHttpPostRequest(url, body, options){
        return this.http.post(url, body, options)
            .map(res =>  res.json());
    }

    getBatchServersInfo(){
        let url = config.BATCH_SERVERS_API_BASE + "/info"

        return this.makeHttpGetRequest(url);
    }

    switchPublicToPrivate(){
        //let url = config.BATCH_SERVERS_API_BASE + "/switch/private"
    }


}

