import {BatchServerType} from './BatchServerType';

export class BatchServer {
    ip: string;
    port: number;
    id_host: number;
    video_convert_workers: number;
    pdf_convert_workers: number;
    server_type: BatchServerType;

    constructor() {
        this.port = 9001;
    }
}