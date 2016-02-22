<?php

use Silex\Application,
    Silex\ServiceProviderInterface;

require_once __DIR__ . '/SupervisorFacade.php';


class SupervisorFacadeProvider implements ServiceProviderInterface
{
    public function register(Application $app) {
        $app['supervisor.serverInfo'] = $app->share(function() use ($app) {
            return new SupervisorFacade(
                $app['supervisor.servers'],
                $app['monolog']);
        });


        $app['supervisor.stopAll'] = $app->share(function() use ($app) {
            return new SupervisorFacade(
                null,
                $app['monolog']);
        });

        $app['supervisor.startAll'] = $app->share(function() use ($app) {
            return new SupervisorFacade(
                null,
                $app['monolog']);
        });

        $app['supervisor.stopProcess'] = $app->share(function() use ($app) {
            return new SupervisorFacade(
                null,
                $app['monolog']);
        });

        $app['supervisor.startProcess'] = $app->share(function() use ($app) {
            return new SupervisorFacade(
                null,
                $app['monolog']);
        });

        $app['supervisor.restartAll'] = $app->share(function() use ($app) {
            return new SupervisorFacade(
                null,
                $app['monolog']);
        });
    }
    public function boot(Application $app) {}
}