<?php

    require_once __DIR__ . '/bootstrap.php';

    $app = new Silex\Application();

    require_once __DIR__ . '/../src/routes.php';

    return $app;

?>