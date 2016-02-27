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
    private init: boolean;

	constructor(private _supervisorService:SupervisorService,
                private _el:ElementRef){}

	ngOnInit(){
        //this.show_error("something");
        this.init = true;
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

		this._supervisorService.getSupervisorInfo()
            .subscribe(
                data => {
                    this.supervisorServers = data;
                    if(this.init){
                        this.init = false;
                        this.initialize();
                    }
                    else{
                        //parse presently selected server
                        for(var index in data){
                            let server = data[index];
                            if(server.addr == this.server.addr)
                                this.serverDetails(server);
                        }

                    }

                },
                error => {
                    this.error = true;
                    console.log(error);
                    this.showError(error);
                }
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
                this._supervisorService.stopProcess(server.addr,
                    server.port,
                    process.group + ":" + process.name)
                    .subscribe(
                        data => {this.operationResult = data;},
                        error => {
                            this.error = true;
                            console.log(error);
                            this.showError(error);
                        },
                        () => console.log('Process Stopped')
                    );
            };

            stopProcess();
        }
        else{//start here
            let startProcess = () => {
                this._supervisorService.startProcess(server.addr,
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

    startAll(server){
        let startAll = () => {
            this._supervisorService.startAll(server.addr,
                                        server.port)
                .subscribe(
                    data => {this.operationResult = data;},
                    error => {this.error = true; console.log(error);},
                    () => console.log('All processes Started')
                );
        };

        startAll();


    }

    stopAll(server){
        let stopAll = () => {
            this._supervisorService.stopAll(server.addr,
                server.port)
                .subscribe(
                    data => {this.operationResult = data;},
                    error => {
                        this.error = true;
                        console.log(error);
                        this.showError(error);
                    },
                    () => console.log('All processes stopped')
                );
        };

        stopAll();

    }

    restartAll(server){
        let restartAll = () => {
            this._supervisorService.restartAll(server.addr,
                server.port)
                .subscribe(
                    data => {this.operationResult = data;},
                    error => {
                        this.error = true;
                        console.log(error);
                        this.showError(error);
                    },
                    () => console.log('All processes restarted')
                );
        };

        restartAll();

    }

    showError(errorMessage)
    {
        window.componentHandler.upgradeAllRegistered();

        let snackbarContainer = this._el.nativeElement.querySelector('#toast_error');

        let handler = (event) => {
            snackbarContainer.className= "";
            console.log("handler called");
        };

        var data = {
            message: errorMessage.json(),
            timeout: 3000,
            actionHandler: handler,
            actionText: 'Undo'
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);


    }
}