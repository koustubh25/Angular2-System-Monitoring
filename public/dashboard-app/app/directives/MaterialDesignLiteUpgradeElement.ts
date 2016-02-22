import {Directive, ElementRef, Input} from 'angular2/core';
declare var componentHandler;

@Directive({
    selector: '[mdl]'
})
export class MDL {
    /*ngAfterViewInit() {
     componentHandler.upgradeAllRegistered();
     }*/
    constructor(el:ElementRef) {
        componentHandler.upgradeAllRegistered();

    }
}