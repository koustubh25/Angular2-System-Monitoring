import {Component} from '../public/dashboard-app/node_modules/angular2/core.d';
import {RouteConfig, ROUTER_DIRECTIVES} from '../public/dashboard-app/node_modules/angular2/router.d';

@Component({
    selector: 'workers',
    templateUrl: 'app/components/gearman-ui/workers/workers.html',
    directives: [ROUTER_DIRECTIVES],
})
export class WorkersComponent{

}
