export interface Job{
    job_name: string;
    in_queue: number;
    jobs_running: number;
    capable_workers: number;
}