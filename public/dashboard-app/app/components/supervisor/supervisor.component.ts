import {Component, OnInit, AfterViewChecked} from 'angular2/core';
import {Supervisor} from './supervisor';
import {Process} from './process';
import {SupervisorService} from '../../services/supervisor.service';
import {MDL} from '../../directives/MaterialDesignLiteUpgradeElement';

@Component({
	selector: 'supervisor-monitor',
	templateUrl: 'app/components/supervisor/supervisor.html',
    providers: [SupervisorService],
    styleUrls: ['app/components/supervisor/css/supervisor.css'],
})
export class SupervisorComponent implements OnInit, AfterViewChecked{

	supervisor : Supervisor[];
    detail : number;
    data: Process[];

	constructor(private _supervisorProcesses:SupervisorService){}

	ngOnInit(){
        this.detail = 0;
		this.getSupervisorServers();
        this.serverDetails(this.supervisor[0].data);
	}

	getSupervisorServers(){

		this.supervisor = this._supervisorProcesses.getSupervisorProcesses();

	}
    ngAfterViewChecked(){
        componentHandler.upgradeAllRegistered();
    }

    serverDetails(data){
        this.detail = 1;
        this.data = data;
        console.log(this.data);

    }

}
