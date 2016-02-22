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
    public function getServerInfo($server) {
        $managerFactory = $this->getManagerFactory();
        try { // Try to open to the correction
            $manager = $managerFactory($server['addr']);
            $server['up'] = true;
        }
        catch (\Exception $e) {
            $server['error'] = $this->serverErrorHandler($e, $server['name']);
            $server['up'] = false;
        }
        if ($server['up']) {
            try { // Get info from the server.
                $server['version'] = $manager->version();
                $server['workers'] = $manager->workers();
                $server['status'] = $manager->status();
                $manager->disconnect();
            }
            catch (\Exception $e) {
                $server['error'] = $this->serverErrorHandler($e, $server['name']);
            }
        }
        return $server;
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