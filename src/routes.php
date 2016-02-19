<?php

$app->mount('/supervisor', new \Bento\Supervisor\SupervisorController\SupervisorController());

$app->mount('/gearman', new \Gearman\GearmanController\GearmanController());

?>

