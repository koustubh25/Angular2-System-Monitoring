<?php

/**
 * Created by IntelliJ IDEA.
 * User: koustubhgaikwad
 * Date: 2/19/16
 * Time: 3:09 PM
 */

namespace Bento\Supervisor\SupervisorController;

use Silex\ServiceProviderInterface;
use Silex\Application;

class SupervisorController implements ServiceProviderInterface
{
    public function register(Application $app) {

        $controllers = $app['controllers_factory'];
        $app->get('/supervisor/processes', function() use ($app){

            error_log("supervisor prcoesses has ben called");
        });

        return $controllers;
    }

    public function boot(Application $app)
    {
        // TODO: Implement boot() method.
    }
}