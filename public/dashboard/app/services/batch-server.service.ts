import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {PRIVATE_SERVERS} from "../mock/private_servers_list";
import {config} from '../config/config';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class BatchServerService {

    constructor(private http:Http){}

    makeHttpGetRequest(url){

        /*return Observable.interval(config.BATCH_SERVERS_REFRESH_INTERVAL * 1000)
            .switchMap(() => this.http.get(url))
            .map(res => res.json()
            );*/
        return this.http.get(url)
         .map(res =>res.json())
         .timeout(config.REQUEST_TIMEOUT * 1000, new Error('Time out occurred'));
    }

    makeHttpPostRequest(url, body, options){
        return this.http.post(url, body, options)
            .map(res =>  res.json())
            .timeout(config.REQUEST_TIMEOUT * 1000, new Error('Time out occurred'));

    }

    buildBody(ip, port, id_host, video_workers, pdf_workers){
        let data = {
            "ip" : ip,
            "port" : parseInt(port),
            "id_host" : parseInt(id_host),
            "video_workers" : parseInt(video_workers),
            "pdf_workers" : parseInt(pdf_workers)
        }
        let body = JSON.stringify(data);
        return body;
    }

    getBatchServersInfo(){
        let url = config.BATCH_SERVERS_API_BASE + "/info";

        return this.makeHttpGetRequest(url);
    }

    switchPublicToPrivate(ip, port, id_host, video_workers, pdf_workers){
        let url = config.BATCH_SERVERS_API_BASE + "/switch/private"
        let body = this.buildBody(ip, port,id_host, video_workers, pdf_workers);
        let options = new RequestOptions({ headers:
            new Headers({ 'Content-Type': 'application/json'}) });
        return this.makeHttpPostRequest(url, body, options);
    }

    switchPrivateToPublic(ip, port){
        let url = config.BATCH_SERVERS_API_BASE + "/switch/public";
        let body = this.buildBody(ip, port, null, null, null);
        let options = new RequestOptions({ headers:
            new Headers({ 'Content-Type': 'application/json'}) });

        return this.makeHttpPostRequest(url, body, options);

    }

    addServersByHostId(hostData){

        let url = config.BATCH_SERVERS_API_BASE + "/private/host";

        let data = {
            "servers" : hostData.servers,
            "video_workers" : parseInt(hostData.video_workers),
            "pdf_workers" : parseInt(hostData.pdf_workers),
            "id_host" : parseInt(hostData.id_host)
        };
        let body = JSON.stringify(data);

        let options = new RequestOptions({ headers:
            new Headers({ 'Content-Type': 'application/json'}) });
        return this.makeHttpPostRequest(url, body, options);
    }


}

