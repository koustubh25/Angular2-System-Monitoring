import {Injectable} from 'angular2/core';
import {SUPERVISOR_PROCESSES} from '../mock/supervisor_all_jobs';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {config} from '../config/config';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SupervisorService {

    constructor(private http:Http){}

    makeHttpGetRequest(url){

        return Observable.interval(config.SUPERVISOR_REFRESH_INTERVAL * 1000)
            .switchMap(() => this.http.get(url))
            .map(res => res.json())
            .timeout(config.REQUEST_TIMEOUT * 1000, new Error('Time out occurred'))

        /*return this.http.get(url)
            .map(res =>res.json());*/
    }

    makeHttpPostRequest(url, body, options){
        return this.http.post(url, body, options)
            .map(res =>  res.json())
            .timeout(config.REQUEST_TIMEOUT * 1000, new Error('Time out occurred'));
    }

    getSupervisorInfo(){
        let url = config.SUPERVISOR_API_BASE + "/info"

        return this.makeHttpGetRequest(url);
    }

    buildBody(ip, port, processName){
        let data = {
            "ip": ip,
            "port": port,
            "process": processName
        };
        let body = JSON.stringify(data);
        return body;
    }

    stopProcess(ip, port, processName){

        let url = config.SUPERVISOR_API_BASE + "/stop/process";
        let body = this.buildBody(ip, port, processName);
        let options = new RequestOptions({ headers:
            new Headers({ 'Content-Type': 'application/json'}) });
        return this.makeHttpPostRequest(url, body, options)

    }

    startProcess(ip, port, processName){

        let url = config.SUPERVISOR_API_BASE + "/start/process";
        let body = this.buildBody(ip, port, processName);
        let options = new RequestOptions({ headers:
            new Headers({ 'Content-Type': 'application/json'}) });
        return this.makeHttpPostRequest(url, body, options)

    }

    startAll(ip, port){
        let url = config.SUPERVISOR_API_BASE + "/start/all";
        let body = this.buildBody(ip, port, null);
        let options = new RequestOptions({ headers:
            new Headers({ 'Content-Type': 'application/json'}) });
        return this.makeHttpPostRequest(url, body, options)

    }

    stopAll(ip, port){
        let url = config.SUPERVISOR_API_BASE + "/stop/all";
        let body = this.buildBody(ip, port, null);
        let options = new RequestOptions({ headers:
            new Headers({ 'Content-Type': 'application/json'}) });
        return this.makeHttpPostRequest(url, body, options)

    }

    restartAll(ip, port){
        let url = config.SUPERVISOR_API_BASE + "/restart/all";
        let body = this.buildBody(ip, port, null);
        let options = new RequestOptions({ headers:
            new Headers({ 'Content-Type': 'application/json'}) });
        return this.makeHttpPostRequest(url, body, options)

    }

}