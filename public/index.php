<?php

$app = require_once __DIR__ . '/../app/app.php';

$app->after($app["cors"]);

$app->run();

?>