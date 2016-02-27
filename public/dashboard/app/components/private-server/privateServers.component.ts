import {Component, AfterViewInit, AfterViewChecked, ElementRef} from 'angular2/core';
import { BatchServer } from './batchServer';
import {BatchServerType} from './batchServerType';
import { BatchServerService } from '../../services/batch-server.service';
import {OnInit} from 'angular2/core';
import {MDL} from '../../directives/MaterialDesignLiteUpgradeElement';
import {Injectable} from "angular2/core";
import {AddByHostBatchServer} from './addbyhost/addByHostBatchServer';
import {BatchServers} from './addbyhost/batchServers';


declare var componentHandler:any;
declare var dialogPolyfill:any;

@Component({
    selector: 'private-server',
	templateUrl: 'app/components/private-server/privateServer.html',
    providers: [BatchServerService],
    directives: [MDL],
    styleUrls: ['app/components/private-server/styles/private-server.css']
})
export class PrivateServersComponent implements OnInit, AfterViewChecked, AfterViewInit{


    private batchServers: any;
    private editServer: boolean; //switch button
    private newServer: boolean; //add button
    private newBatchServer: BatchServer;
    private addByHostServers: AddByHostBatchServer;
    private addByHost: boolean;

    constructor(private _BatchServerService: BatchServerService, private _el:ElementRef) {}

    ngOnInit(){
        this.batchServers = null;
        this.editServer = false;
        this.newServer = false;
        this.newBatchServer = new BatchServer();
        this.addByHost = false;
        this.addByHostServers = null;
        this.addByHostServers = new AddByHostBatchServer();
        this.getBatchServers();
    }

    getBatchServers(){
        this._BatchServerService.getBatchServersInfo()
            .subscribe(
                data => {
                    this.batchServers = data;
                },
                    error => {console.log(error);}
            );
    }

    switchServers(batchServer){


        let toggle = (type) => {
            if(type == "public")
                this.newBatchServer.server_type = BatchServerType.PRIVATE;
            else
                this.newBatchServer.server_type = BatchServerType.PUBLIC;
        };
        
        toggle(batchServer.type);
        this.newBatchServer.ip = batchServer.ip;

        if(this.newBatchServer.server_type == "private")
            this.editServer = true;
        else
            this.switchBatchServer(this.newBatchServer);

    }

    cancelEditServer(){
        this.editServer = false;
        this.newServer = false;
        window.componentHandler.upgradeAllRegistered();
    }

    switchBatchServer(newBatchServer){
        if(newBatchServer.length == 0 )
            newBatchServer.port = 9001;


        //convert to private
        if(newBatchServer.server_type == "private")
        {
            this._BatchServerService.switchPublicToPrivate(newBatchServer.ip,
                newBatchServer.port,
                newBatchServer.id_host,
                newBatchServer.video_convert_workers,
                newBatchServer.pdf_convert_workers)
                .subscribe(
                    data => {
                        console.log(data);
                        this.getBatchServers();
                        this.cancelEditServer();
                    },
                    error => {console.log(error);}
                );
        }
        //switch to public server
        else{
            //call modal here
            this._BatchServerService.switchPrivateToPublic(newBatchServer.ip,
                                                        newBatchServer.port)
                .subscribe(
                    data => {
                        console.log(data);
                        this.getBatchServers();
                        this.cancelEditServer();
                    },
                    error => {console.log(error);}
                );
        }

    }

    newEntry(){
        this.newServer = true;
    }

    ngAfterViewChecked(){
        componentHandler.upgradeAllRegistered();
    }

    ngAfterViewInit(){
        componentHandler.upgradeAllRegistered();
    }

    addBatchServersById(){
        this.addByHost = true;

    }

    addToServersByHostIdList(hostId, videoWorkers, pdfWorkers, currentIp, currentPort){


        console.log(hostId)
        console.log(videoWorkers);
        this.addByHostServers.id_host = hostId;
        this.addByHostServers.video_workers = videoWorkers;
        this.addByHostServers.pdf_workers = pdfWorkers;
        this.addByHostServers.servers.push(new BatchServers(
                                    currentIp, currentPort
                                        ));
        console.log(this.addByHostServers);

    }

    addServersByIps(){

        this._BatchServerService.addServersByHostId(this.addByHostServers)
            .subscribe(
                data => {
                    console.log(data);
                    this.getBatchServers();
                    this.cancelEditServer();
                    this.addByHost = false;
                },
                error => {console.log(error);}
            );

    }

}