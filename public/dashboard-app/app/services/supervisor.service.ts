import {Injectable} from 'angular2/core';
import {SUPERVISOR_PROCESSES} from '../mock/supervisor_all_jobs';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {config} from '../config/config';

@Injectable()
export class SupervisorService {

    constructor(private http:Http){}

    getSupervisorProcesses(){
        //use these IP later
        let servers = config.SUPERVISOR_SERVERS;
        return SUPERVISOR_PROCESSES;
    }

}