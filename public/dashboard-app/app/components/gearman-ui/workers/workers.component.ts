import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'workers',
    templateUrl: 'app/components/gearman-ui/workers/workers.html',
    directives: [ROUTER_DIRECTIVES],
})
export class WorkersComponent{

}
