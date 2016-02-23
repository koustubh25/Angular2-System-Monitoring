import {Injectable} from 'angular2/core';
import {SUPERVISOR_PROCESSES} from '../mock/supervisor_all_jobs';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {config} from '../config/config';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SupervisorService {

    constructor(private http:Http){}

    makeHtpGetRequest(url){
        return this.http.get(url)
            .map(res =>res.json())

    }

    makeHttpPostRequest(){

    }

    getSupervisorInfo(){
        //use these IP later
        /*let servers = config.SUPERVISOR_SERVERS;
        return SUPERVISOR_PROCESSES;*/
        let url = config.SUPERVISOR_API_BASE + "/info"

        return this.makeHtpGetRequest(url);
    }

    stopProcess(ip, port, processName){

        let url = config.SUPERVISOR_API_BASE + "/stop/process";
        let data = {
            "ip": ip,
            "port": port,
            "process": processName
        }
        let body = JSON.stringify(data);
        console.log(body);
        let head = new Headers({
            'Content-Type': 'application/json'
        });
        //headers.append('application/json');
        //let options = new RequestOptions({ headers: headers });

        this.http.post(url, body, {headers : head})
            .map(res =>  res.json())
            .subscribe(
                data => {console.log(data);},
                err => console.log(err),
                () => console.log('Fetching complete for Server Metrics')
            );

    }

}