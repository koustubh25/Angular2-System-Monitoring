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
    private $process_name;

    public function __construct($servers, $logger, $process_name = null)
    {
        $this->setServers($servers);
        $this->setLogger($logger);
        $this->setProcess($process_name);
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

        $stopProcess = array(
            "server" => $ip,
            "port" => $port,
            "name" => $name
        );

        $supervisor = self::getSupervisor($ip, $port);
        try{
            $supervisor->stopProcess($name);
            $stopProcess["status"] = "OK";
        }
        catch (BadName $e) {
            $stopProcess["error"] = $this->serverErrorHandler($e, $ip . ':' . $port . " " . $name);
        }
        catch (Fault $e) {
            $stopProcess["error"] = $this->serverErrorHandler($e, $ip . ':' . $port . " " . $name);
        }
        catch(Exception $e){
            $stopProcess["error"] = $this->serverErrorHandler($e, $ip . ':' . $port . " " . $name);
        }

        return $stopProcess;

    }

    public function startProcess($ip = "127.0.0.1", $port = "9001", $name){


        $startProcess = array(
            "server" => $ip,
            "port" => $port,
            "name" => $name
        );

        $supervisor = self::getSupervisor($ip, $port);

        try{
            $supervisor->startProcess($name);
        }
        catch (BadName $e) {
            $startProcess["error"] = $this->serverErrorHandler($e, $ip . ':' . $port . " " . $name);
        }
        catch (Fault $e) {
            $startProcess["error"] = $this->serverErrorHandler($e, $ip . ':' . $port . " " . $name);
        }
        catch (Exception $e){
            $startProcess["error"] = $this->serverErrorHandler($e, $ip . ':' . $port . " " . $name);
        }

        return $startProcess;

    }

    public function stopAllProcesses($ip = "127.0.0.1", $port = "9001"){


        $stopProcesses = array(
            "server" => $ip,
            "port" => $port
        );
        $supervisor = self::getSupervisor($ip, $port);
        try{
            $supervisor->stopAllProcesses();
            $stopProcesses["status"] = "OK";
        }
        catch (BadName $e) {
            $stopProcesses["error"] = $this->serverErrorHandler($e, $ip . ':' . $port);
        }
        catch (Fault $e) {
            $stopProcesses["error"] = $this->serverErrorHandler($e, $ip . ':' . $port);
        }
        catch(Exception $e){
            $stopProcesses['error'] = $this->serverErrorHandler($e, $ip . ':' . $port);
        }
        return $stopProcesses;

    }

    public function startAllProcesses($ip = "127.0.0.1", $port = "9001"){

        $startProcesses = array(
            "server" => $ip,
            "port" => $port
        );
        $supervisor = self::getSupervisor($ip, $port);
        try{
            $supervisor->startAllProcesses();
            $startProcesses["status"] = "OK";
        }
        catch (BadName $e) {
            $startProcesses["error"] = $this->serverErrorHandler($e, $ip . ':' . $port);
        }
        catch (Fault $e) {
            $startProcesses["error"] = $this->serverErrorHandler($e, $ip . ':' . $port);
        }
        catch(Exception $e){
            $startProcesses['error'] = $this->serverErrorHandler($e, $ip . ':' . $port);
        }

        return $startProcesses;

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

    protected function setProcess($process) {
        $this->process_name = $process;
        return $this;
    }

    public function getProcess() {
        return $this->process_name;
    }



    protected function serverErrorHandler(\Exception $e, $serverName) {
        $errorMessage = "Error in server " . $serverName . ': ' . $e->getMessage();
        $this->getLogger()->addError($errorMessage);
        $this->getLogger()->addDebug($e);
        return $errorMessage;
    }

}

