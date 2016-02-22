import {Component, AfterViewChecked} from 'angular2/core';
import { PrivateServer } from './privateServer'
import { PrivateServerService } from '../../services/private-server.service';
import {OnInit} from 'angular2/core';
import {ElementRef} from "angular2/core";
import {MDL} from '../../directives/MaterialDesignLiteUpgradeElement';
import {Injectable} from "angular2/core";


declare var componentHandler:any;

@Component({
    selector: 'private-server',
	templateUrl: 'app/components/private-server/privateServer.html',
    providers: [PrivateServerService],
    directives: [MDL],
    styleUrls: ['app/components/private-server/styles/private-server.css']
})
export class PrivateServersComponent implements OnInit, AfterViewChecked{

    element : ElementRef;
    constructor(private _privateServerService: PrivateServerService) {

        //this.element =el;
    }
    privateServers: PrivateServer[];
    private newEntry: number; //Add form for entering new private server details
    private newServer: PrivateServer;
    private loading:boolean;

    ngOnInit(){
        this.newEntry = 0;
        this.loading = true;
        this.getPrivateServers();
    }

    /*ngAfterViewInit(){
        window.componentHandler.upgradeAllRegistered();
    }*/

    getPrivateServers(){
        /*this._privateServerService.getPrivateServers()
            .subscribe(
                data => this.privateServers = data,
                error =>  console.log("error")
            );*/
        this.privateServers = this._privateServerService.getPrivateServers();

    }
    newServerEntry(){
        this.newServer = new PrivateServer();
        this.newEntry = 1;
    }

    addPrivateServer(newServer){

        //supervisor port number can be changed here -> 9001
        /*this._privateServerService.addPrivateServer(newServer.ip, "9001", newServer.id_host, newServer.pdf_workers, newServer.video_workers)
            .subscribe(
                data => {this.getPrivateServers(); this.cancelPrivateServer();},
                error =>  console.log(error)
            );*/


    }

    privateToPublic(ip){
       /* this._privateServerService.removePrivateServer(ip, "9001")
            .subscribe(
                data => this.getPrivateServers(),
                error =>  console.log(error)
        );*/

    }

    cancelPrivateServer(){
        this.newEntry = 0;
    }

    ngAfterViewChecked(){
        //componentHandler.upgradeAllRegistered();

    }
}