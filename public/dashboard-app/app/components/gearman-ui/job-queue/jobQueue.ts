import {Job} from './job';

export class JobQueue {
    server_name: string;
    server_addr: string;
    server_running: boolean;
    worker_status: Job[];
}