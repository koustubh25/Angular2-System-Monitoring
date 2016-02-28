import {Component, AfterViewInit, OnInit, OnDestroy, ElementRef} from 'angular2/core';

declare var angular:any;

declare var componentHandler:any;
@Component({
    selector: 'netflix-vector',
	templateUrl: 'app/components/netflix-vector/dist/netflixVector.html'

})
export class NetflixVectorComponent implements AfterViewInit, OnInit, OnDestroy{

    constructor(private _el: ElementRef){}

    ngAfterViewInit(){
        componentHandler.upgradeAllRegistered();
    }

    ngOnInit(){
        angular.bootstrap(this._el.nativeElement, ['app']);
    }

    ngOnDestroy(){

        //Destroy angular 1.x app to avoid error messages on console
        this._el.nativeElement.querySelector("#ng-view")
            .innerHTML = "";
    }


}
