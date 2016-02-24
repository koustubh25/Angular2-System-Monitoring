<?php

/**
 * Created by IntelliJ IDEA.
 * User: koustubhgaikwad
 * Date: 2/19/16
 * Time: 2:23 PM
 */

require_once __DIR__ . '/../src/ConfigurationProvider.php';
require_once __DIR__ . '/../src/gearman/GearmanFacadeProvider.php';
require_once __DIR__ . '/../src/supervisor/SupervisorFacadeProvider.php';
use Silex\Application,
    Silex\Provider\MonologServiceProvider,
    JDesrosiers\Silex\Provider\CorsServiceProvider;


class BentoApplication extends Application
{

    const DEFAULT_LOG_FILE = "/../logs/bento.log";

    public function __construct(array $values = array())
    {
        parent::__construct($values);

        #Set run environment
        $this['env'] = getenv('APP_ENV') ?: 'prod';

        # Monolog service
        $this->register(new MonologServiceProvider, array(
            'monolog.logfile' => __DIR__ . static::DEFAULT_LOG_FILE,
            'monolog.name' => 'Bento'
        ));

        $this->register(new ConfigurationProvider());

        //Registering Gearman components
        $this->register(new GearmanFacadeProvider());

        $this->register(new SupervisorFacadeProvider());

        $this->register(new CorsServiceProvider(), array(
            "cors.allowOrigin" => "*",
        ));


    }

}