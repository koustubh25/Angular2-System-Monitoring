<?php

require_once __DIR__ . '/Supervisor/SupervisorController.php';
require_once __DIR__ . '/gearman/GearmanController.php';


$app->mount('/supervisor', new SupervisorController());

$app->mount('/gearman', new GearmanController());

?>

