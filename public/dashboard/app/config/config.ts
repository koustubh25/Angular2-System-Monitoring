

//Private Server configurations
export var config:any =
{

//Private server information
BATCH_SERVERS_API_BASE : "http://batch-servers",
BATCH_SERVERS_REFRESH_INTERVAL : 10,

//Gearman
"GEARMAN_API_BASE" : "http://bento/gearman",
GEARMAN_REFRESH_INTERVAL : 10, //in seconds

//SUPERVISOR
SUPERVISOR_API_BASE : "http://bento/supervisor",
SUPERVISOR_REFRESH_INTERVAL : 10, //in seconds

REQUEST_TIMEOUT : 120 //in seconds


};