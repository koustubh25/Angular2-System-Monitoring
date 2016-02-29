import {Component, AfterViewInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {BatchServersComponent} from '../batch-servers/batchServers.component';
import {GearmanComponent} from '../gearman/gearman.component';
import {SupervisorComponent} from '../supervisor/supervisor.component';
import {NetflixVectorComponent} from '../netflix-vector/netflixVector.component';
import {ElementRef} from "angular2/core";

declare var componentHandler:any;

@Component({
    selector: 'millvi-dashboard-app',
	templateUrl: 'app/components/dashboard/dashboard.html',
	directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
  {
  path: '/batch-servers',
  name: 'BatchServers',
  component: BatchServersComponent,
  useAsDefault: true
},
{
  path: '/gearman',
  name: 'Gearman',
  component: GearmanComponent
},
{
  path: '/supervisor',
  name: 'Supervisor',
  component: SupervisorComponent
},
{
  path: '/netflix-vector',
  name: 'NetflixVector',
  component: NetflixVectorComponent
}

])
export class DashboardComponent{}