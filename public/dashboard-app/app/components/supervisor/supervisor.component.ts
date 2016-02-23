import {Component, OnInit} from 'angular2/core';
import {Supervisor} from './supervisor';
import {Process} from './process';
import {SupervisorService} from '../../services/supervisor.service';
import {MDL} from '../../directives/MaterialDesignLiteUpgradeElement';
import {NgClass, NgSwitch} from 'angular2/common';

@Component({
	selector: 'supervisor-monitor',
	templateUrl: 'app/components/supervisor/supervisor.html',
    providers: [SupervisorService],
    directives: [MDL, NgClass, NgSwitch],
    styleUrls: ['app/components/supervisor/css/supervisor.css'],
})
export class SupervisorComponent implements OnInit{

	protected supervisorServers : any;
    protected server: any;
    protected error: boolean;
	constructor(private _supervisorInfo:SupervisorService){}

	ngOnInit(){
        this.getSupervisorServers();
	}

    initialize(){
        if(typeof this.supervisorServers != "undefined"
            && this.supervisorServers.length > 0)
        {
            this.serverDetails(this.supervisorServers[0]);
        }
        else {
            this.serverDetails(null);
        }

    }

	getSupervisorServers(){

		this._supervisorInfo.getSupervisorInfo()
            .subscribe(
                data => {
                    this.supervisorServers = data;
                    this.initialize()

                },
                error => {this.error = true; console.log(error);}
            );
	}

    serverDetails(server){
        this.server = server;
    }


    isConnected(status){
        if(status)
            return "Connected";
        else
            return "Could not connect";

    }


}