import {Component, OnInit} from 'angular2/core';
import {GearmanService} from '../../../services/gearman.service';
import {JobQueue} from './jobQueue';

@Component({
    selector: 'job-queue',
    templateUrl: 'app/components/gearman-ui/job-queue/jobQueue.html',
    providers: [GearmanService],
    styleUrls: ['app/components/gearman-ui/styles/gearman.css'],

})
export class JobQueueComponent implements OnInit{

    constructor(private _gearmanStatusService: GearmanService) {}

    jobQueue : JobQueue[] = [];

    ngOnInit(){
        this.getJobQueue();
    }

    getJobQueue(){
        var jobQueue = this._gearmanStatusService.getJobQueue();
        //this.jobQueue = this.parse(jobQueue);
        this.jobQueue = jobQueue;
    }

    //parse traditional Javascript style. Find a better way to do this.
    parse(jobQueue : any){


        var parsedJobqueue : JobQueue[] = [];
        for(var i=0; i < jobQueue.length;i++){
            var tempJobQueue = new JobQueue();
            tempJobQueue.server_addr = jobQueue[i].addr;
            tempJobQueue.server_name = jobQueue[i].name;
            tempJobQueue.server_running = jobQueue[i].up;
            tempJobQueue.worker_status = jobQueue[i].status;
            if(jobQueue.up) {
                for(var j =0 ; j<jobQueue.status.length; j++) {
                    tempJobQueue.worker_status[j].job_name = jobQueue[i].status[j].function_name;
                    tempJobQueue.worker_status[j].in_queue = jobQueue[i].status[j].in_queue;
                    tempJobQueue.worker_status[j].jobs_running = jobQueue[i].status[j].jobs_running;
                    tempJobQueue.worker_status[j].capable_workers = jobQueue[i].status[j].capable_workers;
                }
            }
            parsedJobqueue[i] = tempJobQueue;
        }
        return parsedJobqueue;
    }
}
