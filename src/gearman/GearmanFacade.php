<?php

use Silex\Application;


class GearmanFacade
{
    /*
     * The connection to a gearman server is opened in the manager constructor (in Net_Gearman\Net_Gearman_Manager.
     * To handle connection errors in this class, we create the managers here instead of letting pimple do it.
     */
    private $managerFactory;
    private $servers;
    private $logger;
    const MANAGER_ERROR_DATA = "data";
    const MANAGER_ERROR_CONNECT = "connect";
    public function __construct($servers, $callable, $logger) {
        $this->setServers($servers);
        $this->setManagerFactory($callable);
        $this->setLogger($logger);
    }
    /**
     * Fetch status, worker and version information from Gearman servers
     *
     * @return array
     */
    public function getServersInfo() {
        $info = array();
        foreach ($this->getServers() as $server) {
            $info[] = $this->getServerInfo($server);
        }
        return $info;
    }
    /**
     * Get data from Gearman Server.
     *
     * @param $server
     * @return mixed
     */

    private function init($server){
        $managerFactory = $this->getManagerFactory();
        try { // Try to open to the correction
            $manager = $managerFactory($server['addr']);
            $server['up'] = true;
        }
        catch (\Exception $e) {
            $server['error'] = $this->serverErrorHandler($e, $server['name']);
            $server['up'] = false;
        }
        return array(
            "server" => $server,
            "manager" => $manager
        );
    }


    public function getServerInfo($server) {

        $init = $this->init($server);

        $server = $init["server"];
        $manager = $init["manager"];

        if ($server['up']) {
            try { // Get info from the server.
                $server['version'] = $manager->version();
                $server['workers'] = $manager->workers();
                $updated_status = $this->parse($manager->status());
                $server['status'] = $updated_status;
                $manager->disconnect();
            }
            catch (\Exception $e) {
                $server['error'] = $this->serverErrorHandler($e, $server['name']);
            }
        }
        return $server;
    }

    private function parse($status){

        $updated_status = array();
        $function_names = array_keys($status);
        $i = 0;
        foreach($status as $stat){
            //get Array key
            $new_status = array(
                "function_name" => $function_names[$i],
                "in_queue" => $stat["in_queue"],
                "jobs_running" => $stat["jobs_running"],
                "capable_workers" => $stat["capable_workers"]
            );

            array_push($updated_status, $new_status);
            $i= $i + 1;
        }
        return $updated_status;

    }

    /**
     * Log errors.
     *
     * @param \Exception $e
     * @param $serverName
     * @return string
     */
    protected function serverErrorHandler(\Exception $e, $serverName) {
        $errorMessage = "Error in server " . $serverName . ': ' . $e->getMessage();
        $this->getLogger()->addError($errorMessage);
        $this->getLogger()->addDebug($e);
        return $errorMessage;
    }
    protected function setLogger($logger) {
        $this->logger = $logger;
        return $this;
    }
    public function getLogger() {
        return $this->logger;
    }
    protected function setServers($servers) {
        $this->servers = $servers;
        return $this;
    }
    public function getServers() {
        return $this->servers;
    }
    protected function setManagerFactory(\Closure $callable) {
        $this->managerFactory = $callable;
        return $this;
    }
    public function getManagerFactory() {
        return $this->managerFactory;
    }
}