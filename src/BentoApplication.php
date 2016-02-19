<?php

/**
 * Created by IntelliJ IDEA.
 * User: koustubhgaikwad
 * Date: 2/19/16
 * Time: 2:23 PM
 */


namespace Bento;

use Monolog\Logger,
    Monolog\Handler\NullHandler,
    Silex\Application;



class BentoApplication extends Application
{

    const DEFAULT_LOG_FILE = __DIR__ . '/../var/logs/bento.log';

    public function __construct(array $values = array())
    {
        #Set run environment
        $this['env'] = getenv('APP_ENV') ?: 'prod';

        # Monolog service
        # In test env, do not log.
        $this->register(new MonologServiceProvider, array(
            'monolog.logfile' => __DIR__ . static::DEFAULT_LOG_FILE,
            'monolog.name' => 'Bento'
        ));

        if ('test' === $this['env']) {
            $this['monolog.handler'] = function () {
                return new NullHandler();
            };
        }

        $this->register(new SupervisorFacadeProvider());


    }

}