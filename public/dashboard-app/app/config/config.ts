

//Private Server configurations
export var config:any =
{
//Performance Measurement - Web API
"PM_WEBD_SERVER" : "192.0.1.126",
"PM_WEBD_PORT" : "44323",
"HOSTSPEC" : "localhost",
"POLLTIMEOUT" : 600,
"ARCHIVE_FILE" : "metric.txt",

//Private server information
"PRIVATE_SERVER_HOST" : "http://private-server.eviry.com",

//Gearman UI
"GEARMAN_UI_HOST" : "http://gearman.local.eviry.com",
"GEARMAN_DATA" : {"gearman_servers" :[{
        "name" : "server 1",
        "addr" : "192.168.1.115"
    },
    {
        "name" : "Server 2",
        "addr" : "192.0.1.126"
    }
]},


//SUPERVISOR
SUPERVISOR_SERVERS : ["127.0.0.1", "192.168.1.115"],


}