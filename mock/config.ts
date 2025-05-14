export default [
    {
        url: '/api/config',
        method: 'get',
        response: ({body}: any) => {
            return {
                code: 200,
                message: "",
                data: {
                    "per_page": 20,
                    "total": 100,
                    "current_page": 1,
                    "data|1-100": [
                        {
                            "id": "@increment()",
                            "name": "@name()",
                            "value": "@name()",
                            "title": "@ctitle()",
                            "description": "@ctitle()",
                            "class": "@ctitle()",
                            "order": "@integer(1, 10)",
                            "created_at": "2023-04-23 13:55:15",
                            "updated_at": "2023-04-23 13:55:15",
                            "deleted_at": null
                        },
                    ]
                }
            }
        },
    },
];
