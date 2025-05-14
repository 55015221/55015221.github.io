import Mock from "mockjs";

export default [
  {
    url: "/api/category",
    method: "get",
    response: ({ query }: any) => {
      const keyword = query.path;

      let data = [
        {
          id: 1,
          parent_id: 0,
          title: "首页",
          subtitle: "Home",
          description: "",
          thumbnail: () => Mock.Random.image("120x60", Mock.Random.color(), "#FFF", "png"),
          path: "/",
          order: 0,
          created_at: "2023-04-11 15:53:48",
          updated_at: "2023-04-11 15:53:48",
          deleted_at: null,
          children: [],
          images: [],
        },
        {
          id: "@integer(20, 30)",
          parent_id: "@integer(1, 10)",
          title: "产品展示",
          subtitle: "Recommended products and services",
          description: "",
          thumbnail: () => Mock.Random.image("120x60", Mock.Random.color(), "#FFF", "png"),
          path: "product",
          order: 0,
          created_at: "2023-04-11 15:53:48",
          updated_at: "2023-04-11 15:53:48",
          deleted_at: null,
          "images|3-5": [
            {
              id: "@integer(1, 10)",
              disk: "s3",
              filename: "OOOM6aCmXp4_9Ac7KLQql7UoKF_T9Z-B.png",
              url: () => `/public/img/${Mock.Random.integer(1, 40)}.jpeg`,
              created_at: "2024-05-10 18:19:03",
              updated_at: "2024-05-10 18:19:03",
              deleted_at: null,
              pivot: {
                model_id: 10,
                image_id: 93,
                model_type: "App\\Models\\Product",
                order: null,
              },
            },
          ],
          "children|3-5": [
            {
              id: "@integer(30, 40)",
              parent_id: "@integer(1, 10)",
              title: "@ctitle(4, 6)",
              subtitle: "@ctitle(10, 30)",
              description: "@ctitle(100, 200)",
              thumbnail: () => Mock.Random.image("120x60", Mock.Random.color(), "#FFF", "png"),
              path: "product",
              order: 0,
              created_at: "2023-04-11 15:53:48",
              updated_at: "2023-04-11 15:53:48",
              deleted_at: null,
              "images|3-5": [
                {
                  id: "@id",
                  disk: "s3",
                  filename: "OOOM6aCmXp4_9Ac7KLQql7UoKF_T9Z-B.png",
                  url: () => `/public/img/${Mock.Random.integer(1, 40)}.jpeg`,
                  created_at: "2024-05-10 18:19:03",
                  updated_at: "2024-05-10 18:19:03",
                  deleted_at: null,
                  pivot: {
                    model_id: 10,
                    image_id: 93,
                    model_type: "App\\Models\\Product",
                    order: null,
                  },
                },
              ],
              "children|3-5": [
                {
                  id: "@integer(40, 50)",
                  parent_id: "@integer(30, 40)",
                  title: "@ctitle(4, 6)",
                  subtitle: "@ctitle(10, 30)",
                  description: "@ctitle(100, 200)",
                  thumbnail: () => Mock.Random.image("120x60", Mock.Random.color(), "#FFF", "png"),
                  path: "product",
                  order: 0,
                  created_at: "2023-04-11 15:53:48",
                  updated_at: "2023-04-11 15:53:48",
                  deleted_at: null,
                  "images|3-5": [
                    {
                      id: "@integer()",
                      disk: "s3",
                      filename: "OOOM6aCmXp4_9Ac7KLQql7UoKF_T9Z-B.png",
                      url: () => `/public/img/${Mock.Random.integer(1, 40)}.jpeg`,
                      created_at: "2024-05-10 18:19:03",
                      updated_at: "2024-05-10 18:19:03",
                      deleted_at: null,
                      pivot: {
                        model_id: 10,
                        image_id: 93,
                        model_type: "App\\Models\\Product",
                        order: null,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];

      if (keyword) {
        data = data.filter((e) => e.path == keyword);
      }
      return {
        code: 200,
        message: "操作成功",
        data: {
          current_page: 1,
          data: data,
          per_page: 10,
          total: "@integer(20, 50)",
        },
      };
    },
  },
  {
    url: /^\/api\/category\/\d+/,
    method: "get",
    response: {
      code: 200,
      message: "",
      data: {
        id: 7,
        parent_id: 0,
        title: "关于我们",
        subtitle: "About us and company introduction",
        description: "",
        thumbnail() {
          return Mock.Random.image("120x60", Mock.Random.color(), "#FFF", "png");
        },
        path: "/post/13",
        order: 0,
        created_at: "2023-04-11 15:53:48",
        updated_at: "2023-04-11 15:53:48",
        deleted_at: null,
        children: [],
        images: [],
      },
    },
  },
];
