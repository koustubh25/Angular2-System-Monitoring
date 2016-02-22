<?php

use Silex\Application,
    Silex\ServiceProviderInterface;

require_once __DIR__ . '/GearmanFacade.php';


class GearmanFacadeProvider implements ServiceProviderInterface
{
    public function register(Application $app) {
        $app['gearman.manager'] = $app->protect(function ($server_adress) {
            return new \Net_Gearman_Manager($server_adress);
        });
        $app['gearman.serverInfo'] = $app->share(function() use ($app) {
            return new GearmanFacade(
                $app['gearman.servers'],
                $app['gearman.manager'],
                $app['monolog']);
        });
    }
    public function boot(Application $app) {}
}