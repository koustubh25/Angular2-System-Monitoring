import {Component, AfterViewChecked} from 'angular2/core';
import { PrivateServer } from './privateServer'
import {BatchServerType} from './BatchServerType';
import { BatchServerService } from '../../services/batch-server.service';
import {OnInit} from 'angular2/core';
import {ElementRef} from "angular2/core";
import {MDL} from '../../directives/MaterialDesignLiteUpgradeElement';
import {Injectable} from "angular2/core";


declare var componentHandler:any;

@Component({
    selector: 'private-server',
	templateUrl: 'app/components/private-server/privateServer.html',
    providers: [BatchServerService],
    directives: [MDL],
    styleUrls: ['app/components/private-server/styles/private-server.css']
})
export class PrivateServersComponent implements OnInit, AfterViewChecked{


    private batchServers: any;
    private newServer: boolean;
    private newServerType: BatchServerType;

    constructor(private _BatchServerService: BatchServerService) {}

    ngOnInit(){
        this.batchServers = null;
        this.newServer = false;
        this.newServerType = null;
        this.getBatchServers();
    }

    getBatchServers(){
        this._BatchServerService.getBatchServersInfo()
            .subscribe(
                data => {
                    this.batchServers = data;
                    console.log(data);
                },
                    error => console.log("some error")
            );


    }

    switchServers(batchServer){
        this.newServer = true;
        console.log(batchServer.type);
        let toggle = (type) => {
            if(type == "public")
                this.newServerType = BatchServerType.PRIVATE;
            else
                this.newServerType = BatchServerType.PUBLIC;
        };
        
        toggle(batchServer.type);
    }

    ngAfterViewChecked(){
        window.componentHandler.upgradeAllRegistered();
    }


}