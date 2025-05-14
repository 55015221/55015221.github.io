import Mock from "mockjs";

export default [
  {
    url: "/api/login",
    method: "post",
    response: ({ body }: any) => {
      return {
        code: 200,
        message: "",
        data: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsInVzZXJuYW1lIjoiMTM2OTE2OTU0OTUiLCJuaWNrX25hbWUiOiJcdTkwZWRcdTZiNjMiLCJleHAiOjE3MTUxNzc1NTZ9.nMrrcAYtXgUtZo2S_CcFU5rrT1iRDMr-NGcI84YkpEw",
          data: {
            id: 1,
            username: "Administrator",
            name: "超级管理员",
            email: "admin@admin.com",
            mobile: "13800138000",
            avatar: `https://via.placeholder.com/300x200?image=${Mock.Random.integer(1, 10)}`,
            created_at: "2023-04-23 13:55:15",
            updated_at: "2023-04-23 13:55:15",
            deleted_at: null,
          },
        },
      };
    },
  },
  {
    url: "/api/admin/user",
    method: "get",
    response: {
      code: 200,
      message: "",
      data: {
        per_page: 20,
        total: 60,
        current_page: 1,
        "data|20": [
          {
            id: "@integer(10, 999999)",
            username: "@name()",
            name: "@name()",
            roles: [{ name: "@ctitle()" }, { name: "@ctitle()" }],
            email: "@email()",
            mobile: "13800138000",
            avatar: () => Mock.Random.image("100x100", Mock.Random.color()),
            created_at: "2023-04-23 13:55:15",
            updated_at: "2023-04-23 13:55:15",
            deleted_at: null,
          },
        ],
      },
    },
  },
  {
    url: "/api/admin/me",
    method: "get",
    response: {
      code: 200,
      message: "",
      data: {
        id: "@integer(10, 999999)",
        username: "@name()",
        name: "@name()",
        roles: [{ name: "@ctitle()" }, { name: "@ctitle()" }],
        email: "@email()",
        mobile: "13800138000",
        avatar: () => Mock.Random.image("100x100", Mock.Random.color()),
        created_at: "2023-04-23 13:55:15",
        updated_at: "2023-04-23 13:55:15",
        deleted_at: null,
      },
    },
  },
  {
    url: "/api/admin/user/:id",
    method: "get",
    response: {
      code: 200,
      message: "",
      data: {
        id: "@integer(10, 999999)",
        username: "@name()",
        name: "@name()",
        roles: [{ name: "@ctitle()" }, { name: "@ctitle()" }],
        email: "@email()",
        mobile: "13800138000",
        avatar: () => Mock.Random.image("100x100", Mock.Random.color()),
        created_at: "2023-04-23 13:55:15",
        updated_at: "2023-04-23 13:55:15",
        deleted_at: null,
      },
    },
  },
  {
    url: "/api/admin/user/:id",
    method: "put",
    response: {
      code: 200,
      message: "修改成功",
    },
  },
  {
    url: "/api/admin/user/:id",
    method: "delete",
    response: {
      code: 200,
      message: "删除成功",
    },
  },
  {
    url: "/api/admin/role/:id",
    method: "get",
    response: {
      code: 200,
      message: "",
      data: {
        id: "@increment()",
        name: "@name()",
        slug: "@ctitle()",
        permissions: [{ name: "@ctitle()" }, { name: "@ctitle()" }],
        created_at: "2023-04-23 13:55:15",
        updated_at: "2023-04-23 13:55:15",
        deleted_at: null,
      },
    },
  },
  {
    url: "/api/admin/role",
    method: "get",
    response: {
      code: 200,
      message: "",
      data: {
        per_page: 20,
        total: 100,
        current_page: 1,
        "data|100": [
          {
            id: "@increment()",
            name: "@name()",
            slug: "@ctitle()",
            permissions: [{ name: "@ctitle()" }, { name: "@ctitle()" }],
            created_at: "2023-04-23 13:55:15",
            updated_at: "2023-04-23 13:55:15",
            deleted_at: null,
          },
        ],
      },
    },
  },
  {
    url: "/api/admin/role/:id",
    method: "put",
    response: {
      code: 200,
      message: "修改成功",
    },
  },
  {
    url: "/api/admin/role/:id",
    method: "delete",
    response: {
      code: 200,
      message: "删除成功",
    },
  },
  {
    url: "/api/admin/permission",
    method: "get",
    response: {
      code: 200,
      message: "",
      data: {
        per_page: 20,
        total: 100,
        current_page: 1,
        "data|1-100": [
          {
            id: "@increment()",
            name: "@ctitle()",
            slug: "@title()",
            http_method: "GET,POST",
            http_path: "@url()",
            order: "@integer(1, 10)",
            created_at: "2023-04-23 13:55:15",
            updated_at: "2023-04-23 13:55:15",
            deleted_at: null,
          },
        ],
      },
    },
  },
  {
    url: "/api/admin/permission/:id",
    method: "get",
    response: {
      code: 200,
      message: "",
      data: {
        id: "@increment()",
        name: "@ctitle()",
        slug: "@title()",
        http_method: "GET,POST",
        http_path: "@url()",
        order: "@integer(1, 10)",
        created_at: "2023-04-23 13:55:15",
        updated_at: "2023-04-23 13:55:15",
        deleted_at: null,
      },
    },
  },
  {
    url: "/api/admin/permission/:id",
    method: "put",
    response: {
      code: 200,
      message: "修改成功",
    },
  },
  {
    url: "/api/admin/permission/:id",
    method: "delete",
    response: {
      code: 200,
      message: "删除成功",
    },
  },
  {
    url: "/api/admin/menu",
    method: "get",
    response: {
      code: 200,
      message: "",
      data: {
        per_page: 20,
        total: 30,
        current_page: 1,
        "data|1-5": [
          {
            id: "@increment()",
            title: "@ctitle()",
            icon: "fa fa-home",
            http_method: "GET,POST",
            uri: "@url()",
            order: "@integer(1, 10)",
            created_at: "2023-04-23 13:55:15",
            updated_at: "2023-04-23 13:55:15",
            deleted_at: null,
            "children|0-5": [
              {
                id: "@increment()",
                title: "@ctitle()",
                icon: "fa fa-home",
                http_method: "GET,POST",
                uri: "@url()",
                order: "@integer(1, 10)",
                created_at: "2023-04-23 13:55:15",
                updated_at: "2023-04-23 13:55:15",
                deleted_at: null,
                "children|0-5": [
                  {
                    id: "@increment()",
                    title: "@ctitle()",
                    icon: "fa fa-home",
                    http_method: "GET,POST",
                    uri: "@url()",
                    order: "@integer(1, 10)",
                    created_at: "2023-04-23 13:55:15",
                    updated_at: "2023-04-23 13:55:15",
                    deleted_at: null,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
  {
    url: "/api/admin/menu/:id",
    method: "get",
    response: {
      code: 200,
      message: "",
      data: {
        id: "@increment()",
        title: "@ctitle()",
        icon: "fa fa-home",
        http_method: "GET,POST",
        uri: "@url()",
        order: "@integer(1, 10)",
        created_at: "2023-04-23 13:55:15",
        updated_at: "2023-04-23 13:55:15",
        deleted_at: null,
      },
    },
  },
  {
    url: "/api/admin/menu/:id",
    method: "delete",
    response: {
      code: 200,
      message: "删除成功",
    },
  },
];
