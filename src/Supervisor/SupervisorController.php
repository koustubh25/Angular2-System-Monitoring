<?php

/**
 * Created by IntelliJ IDEA.
 * User: koustubhgaikwad
 * Date: 2/19/16
 * Time: 3:09 PM
 */

use Silex\ControllerProviderInterface;
use Silex\Application;

class SupervisorController implements ControllerProviderInterface
{
    public function connect(Application $app) {

        $controllers = $app['controllers_factory'];
        $controllers->get('/processes', function() use ($app){

            error_log("supervisor prcoesses has ben called", false);
            return new \Symfony\Component\HttpFoundation\Response('supervisor prcoesses has ben called');
        });

        return $controllers;
    }

    public function boot(Application $app)
    {
        // TODO: Implement boot() method.
    }
}