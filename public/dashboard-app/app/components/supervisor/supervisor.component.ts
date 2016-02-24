import {Component, OnInit, ElementRef} from 'angular2/core';
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
    protected button:any;
    protected operationResult: any;

	constructor(private _supervisorInfo:SupervisorService,
                private el:ElementRef){}

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


    getButtonData(state){

        if(state == 'RUNNING')
            this.button = 'Stop';
        else
            this.button = 'Start';
        return 'btn_' + state;

    }

    alterProcess(server, process){
        //stop here
        if(process.statename == "RUNNING"){

            let stopProcess = () => {
                this._supervisorInfo.stopProcess(server.addr,
                    server.port,
                    process.group + ":" + process.name)
                    .subscribe(
                        data => {this.operationResult = data;},
                        error => {this.error = true; console.log(error);},
                        () => console.log('Process Stopped')
                    );
            };

            stopProcess();
        }
        else{//start here
            let startProcess = () => {
                this._supervisorInfo.startProcess(server.addr,
                    server.port,
                    process.group + ":" + process.name)
                    .subscribe(
                        data => {this.operationResult = data;},
                        error => {this.error = true; console.log(error);},
                        () => console.log('Process Started')
                    );
            };
            startProcess();

        }
    }


}