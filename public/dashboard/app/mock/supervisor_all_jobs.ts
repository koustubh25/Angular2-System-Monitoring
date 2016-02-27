export var SUPERVISOR_PROCESSES : any = [
    {
        "supervisor_server" : "192.168.1.115",
        "data" : [
            {
                "job_name" : "video_convert_00",
                "group_name" : "public_video_convert",
                "state" : "RUNNING",
                "description" : "show uptime"
            },
            {
                "job_name" : "video_convert_01",
                "group_name" : "public_video_convert",
                "state" : "RUNNING",
                "description" : "show uptime"
            },
            {
                "job_name" : "pdf_convert_00",
                "group_name" : "public_video_convert",
                "state" : "RUNNING",
                "description" : "show uptime"
            }
        ]

    },
    {
        "supervisor_server" : "127.0.0.1",
        "data" : [
            {
                "job_name" : "video_convert_00",
                "group_name" : "public_video_convert",
                "state" : "RUNNING",
                "description" : "show uptime"
            },
            {
                "job_name" : "video_convert_01",
                "group_name" : "public_video_convert",
                "state" : "RUNNING",
                "description" : "show uptime"
            }

        ]

    }


]