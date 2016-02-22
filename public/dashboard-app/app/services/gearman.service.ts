import {Injectable} from 'angular2/core';
import {JOBQUEUE} from '../mock/job_queue';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {config} from '../config/config';
/*import {Response} from "../../node_modules/angular2/http.d.ts";*/

@Injectable()
export class GearmanService {
	
		//var temp = Promise.resolve('http://192.0.1.118/gearman-status');
	constructor(private http:Http){
      /*  http.get('http://192.0.1.118/gearman-status')
        .subscribe(res => {
            console.log(res);
            //this.gearman_status = res;
        })*/
    }

    logError(err:Response){
        console.log("some error");
        console.log(err);
    }

    getJobQueue(){


        /*var url = config.GEARMAN_UI_HOST +
            '/info';

        let body = JSON.stringify(config.GEARMAN_DATA);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(body);
        console.log(headers);
        console.log(options);

        this.http.post(url, body, options)
            .map(res =>  res.json())
            .subscribe(
                data => {console.log(data);},
                err => this.logError(err),
                () => console.log('Fetching complete for Server Metrics')
            );*/

        return JOBQUEUE;
    }



}

