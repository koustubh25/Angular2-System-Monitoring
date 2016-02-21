<?php


use Silex\Application,
    Silex\ServiceProviderInterface,
    Symfony\Component\Yaml\Parser;

class ConfigurationProvider implements ServiceProviderInterface{


    const CONFIG_FILE = '/../config.yml';

    public function register(Application $app)
    {
        // TODO: Implement register() method.

        try {
            $config = (new Parser())->parse(file_get_contents(__DIR__ . static::CONFIG_FILE));
        }
        catch (\Symfony\Component\Yaml\Exception\ParseException $e){
            sprintf("Error parsing yaml config file -> %s", __DIR__ . static::CONFIG_FILE);
            //
            //exit;
        }

        foreach ($config as $key => $param) {
            $app[$key] = $param;
        }

    }

    public function boot(Application $app)
    {
        // TODO: Implement boot() method.
    }
}

?>