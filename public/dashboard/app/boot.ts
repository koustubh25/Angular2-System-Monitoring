import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import {enableProdMode} from 'angular2/core';

enableProdMode();

bootstrap(DashboardComponent, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS]
  );



