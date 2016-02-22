import {Component, AfterViewInit, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {GearmanService} from '../../services/gearman.service';
import {JobQueueComponent} from './job-queue/jobQueue.component';
import {WorkersComponent} from './workers/workers.component';
import {GearmanStatusComponent} from './gearman-status/gearmanStatus.component'
import {MDL} from '../../directives/MaterialDesignLiteUpgradeElement';


@Component({
	   selector: 'gearman-ui',
	templateUrl: 'app/components/gearman-ui/gearmanUi.html',
	providers: [GearmanService],
    directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
    // {path: '/', redirectTo: ['Dashboard'] },
    {
        path: '/job-queue',
        name: 'JobQueue',
        component: JobQueueComponent,
        useAsDefault: true
    },
    {
        path: '/workers',
        name: 'Workers',
        component: WorkersComponent,

    },
    ,
    {
        path: '/gearman-status',
        name: 'GearmanStatus',
        component: GearmanStatusComponent,

    },

])
export class GearmanUiComponent implements OnInit{ 
	public gearman_data : string;
	constructor(private _gearmanStatusService: GearmanService) { }
	ngOnInit() {

  }


	ngAfterViewInit() {

		//componentHandler.upgradeElement(this.element.nativeElement);
		//componentHandler.upgradeAllRegistered();
	}

}
