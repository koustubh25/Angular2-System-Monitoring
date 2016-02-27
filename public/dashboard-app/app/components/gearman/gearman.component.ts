import {Component, AfterViewInit, OnInit, ElementRef} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {GearmanService} from '../../services/gearman.service';
import {MDL} from '../../directives/MaterialDesignLiteUpgradeElement';


@Component({
	   selector: 'gearman',
	templateUrl: 'app/components/gearman/gearman.html',
	providers: [GearmanService],
    directives: [ROUTER_DIRECTIVES, MDL]
})
export class GearmanComponent implements OnInit, AfterViewInit {
	protected gearmanServers:any;
	protected server:any;
	protected error:boolean;
	protected button:any;
	protected operationResult:any;
	private init: boolean;

	constructor(private _gearmanService:GearmanService,
				private _el:ElementRef) {
	}

	ngOnInit() {
		this.init = true;
		this.getGearmanServers();

	}

	initialize() {
		if (typeof this.gearmanServers != "undefined"
			&& this.gearmanServers.length > 0) {
			this.serverDetails(this.gearmanServers[0]);
		}
		else {
			this.serverDetails(null);
		}

	}

	getGearmanServers() {

		this._gearmanService.getGearmanInfo()
			.subscribe(
				data => {
					this.gearmanServers = data;
					if (this.init) {
						this.init = false;
						this.initialize();
					}
					else {
						//parse presently selected server
						for (var index in data) {
							let server = data[index];
							if (server.addr == this.server.addr)
								this.serverDetails(server);
						}

					}

				},
				error => {
					this.error = true;
					this.showError(error);
				}
			);
	}

	serverDetails(server) {
		this.server = server;
	}

	isConnected(status) {
		if (status)
			return "Connected";
		else
			return "Could not connect";

	}

	ngAfterViewInit(){

	}

	showError(errorMessage)
	{
		window.componentHandler.upgradeAllRegistered();

		let snackbarContainer = this._el.nativeElement.querySelector('#toast_error');

		let handler = (event) => {
            //handle if snackbar clicked
		};

		var data = {
			message: errorMessage,
			timeout: 3000,
			actionHandler: handler,
			actionText: 'Undo'
		};
		snackbarContainer.MaterialSnackbar.showSnackbar(data);


	}
}
