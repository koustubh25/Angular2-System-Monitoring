<?php

/**
 * Created by IntelliJ IDEA.
 * User: koustubhgaikwad
 * Date: 2/19/16
 * Time: 3:09 PM
 */

use Silex\ControllerProviderInterface,
    Silex\Application,
    Symfony\Component\HttpFoundation\JsonResponse,
    \Symfony\Component\HttpFoundation\Request;

class SupervisorController implements ControllerProviderInterface
{
    public function connect(Application $app) {

        $controllers = $app['controllers_factory'];
        $controllers->get('/info', function() use ($app){

            $info = $app['supervisor.serverInfo']->getServersInfo();

            return new JsonResponse($info);
        });


        $controllers->post('/stop/all', function(Request $req) use ($app){

            $ip = $req->get("ip");
            $port = $req->get("port");

            $status = $app['supervisor.stopAll']->stopAllProcesses($ip, $port);

            return new JsonResponse($status);
        });

        $controllers->post('/start/all', function(Request $req) use ($app){

            $ip = $req->get("ip");
            $port = $req->get("port");

            $status = $app['supervisor.startAll']->startAllProcesses($ip, $port);

            return new JsonResponse($status);
        });

        $controllers->post('/stop/process', function(Request $req) use ($app){

            $ip = $req->get("ip");
            $port = $req->get("port");
            $processName = $req->get("process");

            $status = $app['supervisor.stopProcess']->stopProcess($ip, $port, $processName);

            return new JsonResponse($status);
        });

        $controllers->post('/start/process', function(Request $req) use ($app){

            $ip = $req->get("ip");
            $port = $req->get("port");
            $processName = $req->get("process");

            $status = $app['supervisor.startProcess']->startProcess($ip, $port, $processName);

            return new JsonResponse($status);
        });

        $controllers->post('/restart/all', function(Request $req) use ($app){

            $ip = $req->get("ip");
            $port = $req->get("port");

            $status = $app['supervisor.restartAll']->restartAllProcesses($ip, $port);

            return new JsonResponse($status);
        });


        return $controllers;
    }

    public function boot(Application $app)
    {
        // TODO: Implement boot() method.
    }
}