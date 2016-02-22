import {Component, AfterViewInit, OnInit, OnDestroy} from 'angular2/core';

declare var angular:any;

declare var componentHandler:any;
@Component({
    selector: 'server-monitor',
	templateUrl: 'app/components/server-monitor/serverMonitor.html',
    styleUrls: ['app/components/server-monitor/styles/serverMonitor.css'
        ],
})
export class ServerMonitorComponent implements AfterViewInit, OnInit, OnDestroy{

    ngAfterViewInit(){
        componentHandler.upgradeAllRegistered();
    }

    ngOnInit(){
        //angular.bootstrap(document, ['app']);
    }

    ngOnDestroy(){
        console.log("now destroying");
    }


}
