<?php

    use \Silex\Application;

    require_once __DIR__ . '/bootstrap.php';
    require_once __DIR__ . '/../src/BentoApplication.php';

    $app = new BentoApplication();

    require_once __DIR__ . '/../src/routes.php';

    return $app;

?>