<?php
use Supervisor\Supervisor;
use Supervisor\Connector\XmlRpc;
use fXmlRpc\Client;
use fXmlRpc\Transport\HttpAdapterTransport;
use Ivory\HttpAdapter\Guzzle5HttpAdapter;

use Supervisor\Exception\Fault;
use Supervisor\Exception\Fault\BadName;


class SupervisorFacade{

    private $servers;
    private $logger;

    public function __construct($servers, $logger)
    {
        $this->setServers($servers);
        $this->setLogger($logger);
    }


    public function getServersInfo(){

        $info = array();
        foreach ($this->servers as $server){
           $info[] = $this->getServerInfo($server);
        }

        return $info;

    }

    private function getSupervisor($ip, $port, $username = null, $password = null) {

        $guzzleClient = new \GuzzleHttp\Client ( [
            'auth' => [
                $username,
                $password
            ]
        ] );

        try{
            $client = new Client ( 'http://' . $ip .':' . $port . '/RPC2', new HttpAdapterTransport ( new Guzzle5HttpAdapter ( $guzzleClient ) ) );
            $connector = new XmlRpc ( $client );
            $supervisor = new Supervisor ( $connector );

        }
        catch(Exception $e){
            throw new Exception($e);
        }
        return $supervisor;
    }

    public function getServerInfo($server){


        $supervisor = self::getSupervisor($server['addr'], $server['port'], $server['uname'], $server['port']);

            try {
                $processes = $supervisor->getAllProcesses();
                $server['up'] = true;
            }
            catch(Exception $e){
                $server['error'] = $this->serverErrorHandler($e, $server['name'], "Error connecting to Server");
                $server['up'] = false;
            }
        if($server['up']) {
            $all_processes = array();
            foreach ($processes as &$process) {
                $payload = $process->getPayload();

                array_push($all_processes, array(
                    "pid" => $payload["pid"],
                    "name" => $payload["name"],
                    "group" => $payload["group"],
                    "statename" => $payload["statename"],
                    "description" => substr($payload["description"], strpos($payload["description"], ",") + 1),
                ));

                $server['processes'] = $all_processes;
            }
        }

        unset($server['uname']);
        unset($server['password']);

        return $server;

    }

    public function stopProcess($ip = "127.0.0.1", $port = "9001", $name){


        $supervisor = self::getSupervisor($ip, $port);
        try{
            $supervisor->stopProcess($name);
        } catch (BadName $e) {
            error_log(print_r($e, true));
        } catch (Fault $e) {
            error_log(print_r($e, true));
        }

    }

    public function startProcess($ip = "127.0.0.1", $port = "9001", $name){


        $supervisor = self::getSupervisor($ip, $port);
        try{
            $supervisor->startProcess($name);
        } catch (BadName $e) {
            error_log(print_r($e, true));
            return 0;
        } catch (Fault $e) {
            error_log(print_r($e, true));
            return 0;
        }

    }

    public function stopAllProcesses($ip = "127.0.0.1", $port = "9001"){


        $supervisor = self::getSupervisor($ip, $port);
        try{
            $supervisor->stopAllProcesses();
        } catch (BadName $e) {
            error_log(print_r($e, true));
            return 0;
        } catch (Fault $e) {
            error_log(print_r($e, true));
            return 0;
        }

    }

    public function startAllProcesses($ip = "127.0.0.1", $port = "9001"){


        $supervisor = self::getSupervisor($ip, $port);
        try{
            $supervisor->startAllProcesses();
        } catch (BadName $e) {
            error_log(print_r($e, true));
            return 0;
        } catch (Fault $e) {
            error_log(print_r($e, true));
            return 0;
        }

    }

    public function restartAllProcesses($ip = "127.0.0.1", $port = "9001"){
        $this->stopAllProcesses($ip, $port);
        $this->startAllProcesses($ip, $port);
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

    protected function serverErrorHandler(\Exception $e, $serverName, $type) {
        $errorMessage = "Error in server " . $serverName . ': ' . $e->getMessage();
        $this->getLogger()->addError($errorMessage);
        $this->getLogger()->addDebug($e);
        return $errorMessage;
    }

}

