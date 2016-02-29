import {Component, AfterViewInit, AfterViewChecked, ElementRef} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import { BatchServer } from './batchServer';
import {BatchServerType} from './batchServerType';
import { BatchServerService } from '../../services/batch-server.service';
import {OnInit} from 'angular2/core';
import {MDL} from '../../directives/MaterialDesignLiteUpgradeElement';
import {Injectable} from "angular2/core";
import {AddByHostBatchServer} from './addbyhost/addByHostBatchServer';
import {BatchServers} from './addbyhost/batchServers';
import {exists} from "fs";
import {config} from '../../config/config';


declare var componentHandler:any;
declare var dialogPolyfill:any;

@Component({
    selector: 'private-server',
	templateUrl: 'app/components/batch-servers/batchServers.html',
    providers: [BatchServerService],
    directives: [MDL, FORM_DIRECTIVES],
    styleUrls: ['app/components/batch-servers/styles/batch-servers.css']
})
export class BatchServersComponent implements OnInit, AfterViewChecked, AfterViewInit{


    private batchServers: any;
    private editServer: boolean; //switch button
    private newServer: boolean; //add button
    private newBatchServer: BatchServer;
    private addByHostServers: AddByHostBatchServer;
    private addByHost: boolean;

    constructor(private _BatchServerService: BatchServerService, private _el:ElementRef) {}

    ngOnInit(){

        this.reset();
        this.getBatchServers();
    }

    reset(){

        this.editServer = false;
        this.newServer = false;
        this.addByHost = false;

        if (typeof this.addByHostServers != "undefined")
            delete this.addByHostServers;

        if (typeof this.batchServers != "undefined")
            delete this.batchServers;

        this.newBatchServer = new BatchServer();
        this.addByHostServers = new AddByHostBatchServer();

    }

    getBatchServers(){
        this._BatchServerService.getBatchServersInfo()
            .subscribe(
                data => {
                    this.batchServers = data;
                    if ('error' in data) {
                        this.showError(data.error);
                    }
                },
                    error => {
                        console.log(error);
                        this.showError(error);
                    }
            );
        this.reset();

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
        this.addByHost = false;
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
                        this.reset();
                        this.getBatchServers();
                        this.cancelEditServer();
                        if('error' in data){
                            this.showError(data.error);
                        }
                    },
                    error => {
                        this.showError(error);
                        console.log(error);
                    }
                );
        }
        //switch to public server
        else{
            //call modal here
            this._BatchServerService.switchPrivateToPublic(newBatchServer.ip,
                                                        newBatchServer.port)
                .subscribe(
                    data => {
                        this.reset();
                        this.getBatchServers();
                        this.cancelEditServer();
                        if('error' in data) {
                            this.showError(data.error);
                        }
                    },
                    error => {
                        this.showError(error);
                        console.log(error);
                        console.log("public");
                    }
                );
        }

    }

    newEntry(){
        this.newServer = true;
        this.newBatchServer.server_type = "public";
    }

    ngAfterViewChecked(){
        componentHandler.upgradeAllRegistered();
    }

    ngAfterViewInit(){
        componentHandler.upgradeAllRegistered();
    }

    addBatchServersById(){
        this.addByHost = true;
        this.newBatchServer.server_type = "private";

    }

    addToServersByHostIdList(hostId, videoWorkers, pdfWorkers, currentIp, currentPort){

        this.addByHostServers.id_host = hostId;
        this.addByHostServers.video_workers = videoWorkers;
        this.addByHostServers.pdf_workers = pdfWorkers;
        this.addByHostServers.servers.push(new BatchServers(
                                    currentIp, currentPort
                                        ));


    }

    addServersByhostList(hostId, videoWorkers, pdfWorkers, currentIp, currentPort){

        this.addToServersByHostIdList(hostId, videoWorkers, pdfWorkers, currentIp, currentPort)
        this._BatchServerService.addServersByHostId(this.addByHostServers)
            .subscribe(
                data => {
                    this.cancelEditServer();
                    this.getBatchServers();
                    if ('error' in data) {
                        this.showError(data.error);
                    }
                },
                error => {
                    this.showError(error);
                }
            )
        this.reset();
        this.getBatchServers();
    }


    showError(errorMessage)
    {
        window.componentHandler.upgradeAllRegistered();

        let snackbarContainer = this._el.nativeElement.querySelector('#toast_error');

        let handler = (event) => {
            //handle if snackbar clicked
        };

        if(this.isJson(errorMessage))
            errorMessage = errorMessage.json();

        var data = {
            message: errorMessage,
            timeout: config.DISPLAY_ERROR_MESSAGE_TIMEOUT * 1000,
            actionHandler: handler,
            actionText: 'Undo'
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);


    }

    isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

}