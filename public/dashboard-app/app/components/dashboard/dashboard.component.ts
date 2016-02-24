import {Component, AfterViewInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {PrivateServersComponent} from '../private-server/privateServers.component';
import {GearmanComponent} from '../gearman/gearman.component';
import {SupervisorComponent} from '../supervisor/supervisor.component';
import {ServerMonitorComponent} from '../server-monitor/serverMonitor.component';
import {ElementRef} from "angular2/core";

declare var componentHandler:any;

@Component({
    selector: 'millvi-dashboard-app',
	templateUrl: 'app/components/dashboard/dashboard.html',
	directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
  // {path: '/', redirectTo: ['Dashboard'] },
  {
  path: '/private-server', 
  name: 'PrivateServers',
  component: PrivateServersComponent,
  useAsDefault: true
},
{
  path: '/gearman',
  name: 'Gearman',
  component: GearmanComponent
},
{
  path: '/supervisor-monitor', 
  name: 'Supervisor',
  component: SupervisorComponent
},
{
  path: '/server-monitor', 
  name: 'ServerMonitor', 
  component: ServerMonitorComponent
}

])
export class DashboardComponent{

    element : ElementRef;
  /*  constructor(el:ElementRef){
         this.element = el;
  }

    ngAfterViewInit() {
        //console.log(this.element);
        //componentHandler.upgradeElement(this.element.nativeElement);
        //componentHandler.upgradeAllRegistered();
    }*/

}