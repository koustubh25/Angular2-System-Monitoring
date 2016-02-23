import {Injectable} from 'angular2/core';
import {SUPERVISOR_PROCESSES} from '../mock/supervisor_all_jobs';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {config} from '../config/config';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SupervisorService {

    constructor(private http:Http){

    }

    makeHtpGetRequest(url){
        return this.http.get(url)
            .map(res =>res.json())

    }

    getSupervisorInfo(){
        //use these IP later
        /*let servers = config.SUPERVISOR_SERVERS;
        return SUPERVISOR_PROCESSES;*/
        let url = config.SUPERVISOR_API_BASE + "/info"

        return this.makeHtpGetRequest(url);
    }

}