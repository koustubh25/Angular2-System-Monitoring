<?php

/**
 * Created by IntelliJ IDEA.
 * User: koustubhgaikwad
 * Date: 2/19/16
 * Time: 3:09 PM
 */

use Silex\ControllerProviderInterface,
    Silex\Application,
    Symfony\Component\HttpFoundation\JsonResponse;

class SupervisorController implements ControllerProviderInterface
{
    public function connect(Application $app) {

        $controllers = $app['controllers_factory'];
        $controllers->get('/info', function() use ($app){

            $info = $app['supervisor.serverInfo']->getServersInfo();

            return new JsonResponse($info);
        });

        return $controllers;
    }

    public function boot(Application $app)
    {
        // TODO: Implement boot() method.
    }
}