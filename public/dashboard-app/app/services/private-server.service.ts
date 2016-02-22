import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Response} from "angular2/http";
import {PRIVATE_SERVERS} from "../mock/private_servers_list";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {config} from '../config/config';

@Injectable()
export class PrivateServerService {

    //var temp = Promise.resolve('http://192.0.1.118/gearman-status');
    privateServers:any;

    constructor(private http:Http){}

    logError(err:Response){
        console.log("some error");
    }

    /*makeHttpCall(url){
        console.log(url);
        return this.http.get(url)
            .map(res => res.json()
            )
            .catch();
    }*/

    getPrivateServers(){
        //return this.makeHttpCall(config.PRIVATE_SERVER_HOST + '/get_private_servers');
        return PRIVATE_SERVERS;
    }

    ///http://private-server.eviry.com/public_to_private_server/127.0.0.1/9001/2/2/2
    addPrivateServer(ip, port, id_host, video_convert_workers, pdf_convert_workers){
        var url = config.PRIVATE_SERVER_HOST +
            '/public_to_private_server/' +
            ip + "/" +
            port + "/" +
            id_host + "/" +
            video_convert_workers + "/" +
            pdf_convert_workers;

        /*return this.http.get(url)
            .catch();*/

    }

    //http://private-server.eviry.com/private_to_public_server/127.0.0.1/9001
    removePrivateServer(ip, port){
       /* var url = config.PRIVATE_SERVER_HOST +
            '/private_to_public_server/' +
            ip + "/" +
            port;
        return this.http.get(url)
            .catch();*/
    }

    putPrivateServer(){

    }

}

