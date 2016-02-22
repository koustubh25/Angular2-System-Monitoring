import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Response} from "angular2/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import '../config/config.js';

@Injectable()
export class ServerMonitorService {


    http:Http

    ServerMonitorService(http:Http){
        this.http = http;
    }


}

