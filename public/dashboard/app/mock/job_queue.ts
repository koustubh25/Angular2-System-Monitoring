export var JOBQUEUE: any = [
    {
        "name": "Server 1",
        "addr": "192.168.1.115",
        "port": "4730",
        "up": true,
        "version": "OK 1.1.12",
        "workers": [
            {
                "fd": "34",
                "ip": "127.0.0.1",
                "id": "-",
                "abilities": [
                    "public"
                ]
            },
            {
                "fd": "39",
                "ip": "192.168.1.53",
                "id": "-",
                "abilities": []
            },
            {
                "fd": "40",
                "ip": "127.0.0.1",
                "id": "-",
                "abilities": [
                    "public"
                ]
            },
            {
                "fd": "37",
                "ip": "127.0.0.1",
                "id": "-",
                "abilities": [
                    "public"
                ]
            },
            {
                "fd": "33",
                "ip": "127.0.0.1",
                "id": "-",
                "abilities": [
                    "public"
                ]
            },
            {
                "fd": "36",
                "ip": "127.0.0.1",
                "id": "-",
                "abilities": [
                    "public"
                ]
            },
            {
                "fd": "35",
                "ip": "127.0.0.1",
                "id": "-",
                "abilities": [
                    "public"
                ]
            },
            {
                "fd": "38",
                "ip": "127.0.0.1",
                "id": "-",
                "abilities": []
            }
        ],
        "status": [
            {
                "function_name": "public:video_convert",
                "in_queue": "0",
                "jobs_running": "0",
                "capable_workers": "4"
            },
            {
                "function_name": "public:pdf_convert",
                "in_queue": "0",
                "jobs_running": "0",
                "capable_workers": "2"
            }
        ]
    },
    {
        "name": "Server 2",
        "addr": "127.0.0.1",
        "port": "4730",
        "error": "Error in server Server 2: Could not connect to 127.0.0.1:4730",
        "up": false
    }
]