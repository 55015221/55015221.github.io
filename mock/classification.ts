import Mock from "mockjs";

export default [
    {
        url: "/api/classification",
        method: "get",
        response: () => {
            return {
                "code": 200,
                "message": "操作成功",
                "data": {
                    "current_page": 1,
                    "data": [
                        {
                            "id": 1,
                            "parent_id": 0,
                            "title": "首页",
                            "subtitle": "Home",
                            "description": "",
                            "thumbnail": `https://placekitten.com/200/80?image=${Mock.Random.integer(1, 10)}`,
                            "path": "/",
                            "icon": "fa fa-home",
                            "order": 0,
                            "created_at": "2023-04-11 15:53:48",
                            "updated_at": "2023-04-11 15:53:48",
                            "deleted_at": null,
                            "children": [],
                            "images": []
                        },
                        {
                            "id": 2,
                            "parent_id": 0,
                            "title": "产品展示",
                            "subtitle": "Recommended products and services",
                            "description": "",
                            "thumbnail": `https://placekitten.com/200/80?image=${Mock.Random.integer(1, 10)}`,
                            "path": "product",
                            "icon": "fa fa-home",
                            "order": 0,
                            "created_at": "2023-04-11 15:53:48",
                            "updated_at": "2023-04-11 15:53:48",
                            "deleted_at": null,
                            "children": [
                                {
                                    "id": 3,
                                    "parent_id": 2,
                                    "title": "大键盘",
                                    "subtitle": "",
                                    "description": "",
                                    "thumbnail": `https://placekitten.com/200/80?image=${Mock.Random.integer(1, 10)}`,
                                    "path": "product",
                                    "icon": "fa fa-home",
                                    "order": 0,
                                    "created_at": "2023-04-11 15:53:48",
                                    "updated_at": "2023-04-11 15:53:48",
                                    "deleted_at": null,
                                    "children": [],
                                    "images": []
                                },
                                {
                                    "id": 4,
                                    "parent_id": 2,
                                    "title": "角色管理",
                                    "subtitle": "",
                                    "description": "",
                                    "thumbnail": `https://placekitten.com/200/80?image=${Mock.Random.integer(1, 10)}`,
                                    "path": "product",
                                    "icon": "fa fa-home",
                                    "order": 0,
                                    "created_at": "2023-04-11 15:53:48",
                                    "updated_at": "2023-04-11 15:53:48",
                                    "deleted_at": null,
                                    "children": [],
                                    "images": []
                                },
                                {
                                    "id": 5,
                                    "parent_id": 2,
                                    "title": "鼠标",
                                    "subtitle": "",
                                    "description": "",
                                    "thumbnail": `https://placekitten.com/200/80?image=${Mock.Random.integer(1, 10)}`,
                                    "path": "product",
                                    "icon": "fa fa-home",
                                    "order": 0,
                                    "created_at": "2023-04-11 15:53:48",
                                    "updated_at": "2023-04-11 15:53:48",
                                    "deleted_at": null,
                                    "children": [],
                                    "images": []
                                },
                                {
                                    "id": 6,
                                    "parent_id": 2,
                                    "title": "配件",
                                    "subtitle": "",
                                    "description": "",
                                    "thumbnail": `https://placekitten.com/200/80?image=${Mock.Random.integer(1, 10)}`,
                                    "path": "product",
                                    "icon": "fa fa-home",
                                    "order": 0,
                                    "created_at": "2023-04-11 15:53:48",
                                    "updated_at": "2023-04-11 15:53:48",
                                    "deleted_at": null,
                                    "children": [],
                                    "images": []
                                }
                            ],
                            "images": []
                        },
                        {
                            "id": 7,
                            "parent_id": 0,
                            "title": "关于我们",
                            "subtitle": "About us and company introduction",
                            "description": "",
                            "thumbnail": `https://placekitten.com/200/80?image=${Mock.Random.integer(1, 10)}`,
                            "path": "/post/13",
                            "icon": "fa fa-home",
                            "order": 0,
                            "created_at": "2023-04-11 15:53:48",
                            "updated_at": "2023-04-11 15:53:48",
                            "deleted_at": null,
                            "children": [],
                            "images": []
                        },
                        {
                            "id": 8,
                            "parent_id": 0,
                            "title": "新闻动态",
                            "subtitle": "Latest news and information",
                            "description": "",
                            "thumbnail": `https://placekitten.com/200/80?image=${Mock.Random.integer(1, 10)}`,
                            "path": "news",
                            "icon": "fa fa-home",
                            "order": 0,
                            "created_at": "2023-04-11 15:53:48",
                            "updated_at": "2023-04-11 15:53:48",
                            "deleted_at": null,
                            "children": [],
                            "images": []
                        },
                        {
                            "id": 9,
                            "parent_id": 0,
                            "title": "联系我们",
                            "subtitle": "Contact Us",
                            "description": "",
                            "thumbnail": `https://placekitten.com/200/80?image=${Mock.Random.integer(1, 10)}`,
                            "path": "/post/7",
                            "icon": "fa fa-home",
                            "order": 0,
                            "created_at": "2023-04-11 15:53:48",
                            "updated_at": "2023-04-11 15:53:48",
                            "deleted_at": null,
                            "children": [],
                            "images": []
                        },
                        {
                            "id": 10,
                            "parent_id": 0,
                            "title": "资料下载",
                            "subtitle": "Download",
                            "description": "",
                            "thumbnail": `https://placekitten.com/200/80?image=${Mock.Random.integer(1, 10)}`,
                            "path": "download",
                            "icon": "fa fa-home",
                            "order": 0,
                            "created_at": "2023-04-11 15:53:48",
                            "updated_at": "2023-04-11 15:53:48",
                            "deleted_at": null,
                            "children": [],
                            "images": []
                        },
                        {
                            "id": 11,
                            "parent_id": 0,
                            "title": "行业应用",
                            "subtitle": "Industrial Applications",
                            "description": "",
                            "thumbnail": `https://placekitten.com/200/80?image=${Mock.Random.integer(1, 10)}`,
                            "path": "specification",
                            "icon": "fa fa-home",
                            "order": 0,
                            "created_at": "2023-04-11 15:53:48",
                            "updated_at": "2023-04-11 15:53:48",
                            "deleted_at": null,
                            "children": [],
                            "images": []
                        },
                        {
                            "id": 12,
                            "parent_id": 0,
                            "title": "定制服务",
                            "subtitle": "Customized Service",
                            "description": "",
                            "thumbnail": `https://placekitten.com/200/80?image=${Mock.Random.integer(1, 10)}`,
                            "path": "post",
                            "icon": "fa fa-home",
                            "order": 0,
                            "created_at": "2023-04-11 15:53:48",
                            "updated_at": "2023-04-11 15:53:48",
                            "deleted_at": null,
                            "children": [],
                            "images": []
                        }
                    ],
                    "per_page": 10,
                    "total": 8
                }
            }
        }
    },
    {
        url: /^\/api\/classification\/\d+/,
        method: "get",
        response: {
            code: 200,
            message: "",
            data: {
                "id": 7,
                "parent_id": 0,
                "title": "关于我们",
                "subtitle": "About us and company introduction",
                "description": "",
                "thumbnail": `https://placekitten.com/200/80?image=${Mock.Random.integer(1, 10)}`,
                "path": "/post/13",
                "icon": "fa fa-home",
                "order": 0,
                "created_at": "2023-04-11 15:53:48",
                "updated_at": "2023-04-11 15:53:48",
                "deleted_at": null,
                "children": [],
                "images": []
            }
        }
    }
]