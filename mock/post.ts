import Mock from "mockjs";

export default [
  {
    url: "/api/post",
    method: "get",
    response: () => {
      // 20240323214952
      // http://localhost:8000/api/post
      return {
        code: 200,
        message: "操作成功",
        data: {
          current_page: 1,
          "data|10-30": [
            {
              id: "@id",
              category_id: () => Mock.Random.integer(1, 10),
              title: () => Mock.Random.cword(10, 30),
              subtitle: () => `MKT-${Mock.Random.integer(100000000, 999999999)}`,
              description: () => Mock.Random.cword(100, 200),
              thumbnail: () => `/public/img/${Mock.Random.integer(1, 40)}.jpeg`,
              attributes: [
                { title: "应用", value: ["车载", "军工"] },
                { title: "材料", value: "玻璃" },
                { title: "安装方式", value: "嵌入式" },
                { title: "按键技术", value: ["锅仔开关", "剪刀脚开关"] },
                { title: "是否背光", value: "是" },
                { title: "按键个数", value: "109" },
              ],
              order: 0,
              created_at: "2021-01-22 09:43:33",
              updated_at: "2024-05-10 18:53:45",
              deleted_at: null,
              "category|1-3": [
                {
                  id: "@id",
                  parent_id: Mock.Random.integer(1, 10),
                  title: "@cword(5, 10)",
                  subtitle: "",
                  description: "",
                  thumbnail: "",
                  path: "product",
                  order: null,
                  created_at: "2024-03-21 11:30:20",
                  updated_at: "2024-03-21 11:30:20",
                  deleted_at: null,
                  pivot: {
                    product_id: 10,
                    category_id: 3,
                  },
                },
              ],
              "images|1-5": [
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
              "specs|2-6": [
                {
                  id: "@id",
                  product_id: 10,
                  title: () => {
                    let obj = {};
                    obj["颜色"] = Mock.Random.pick(["红", "蓝", "黄"]);
                    obj["尺码"] = Mock.Random.pick(["S", "M", "L"]);
                    obj["款式"] = Mock.Random.pick(["男款", "女款"]);
                    return obj;
                  },
                  image: "",
                  price: () => Mock.Random.float(10, 999),
                  cost: () => Mock.Random.float(10, 999),
                  stock: () => Mock.Random.integer(10, 999),
                  code: "VPS_00000001",
                  weight: "1",
                  volume: "1",
                  order: 0,
                  created_at: "2024-05-10 18:53:45",
                  updated_at: "2024-05-10 18:53:45",
                  deleted_at: null,
                },
              ],
              "contents|1-2": [
                {
                  id: "@id",
                  model_id: "@integer(1, 10)",
                  model_type: "App\\Models\\Product",
                  title: "默认标题",
                  body: () => Mock.Random.cparagraph(100, 200),
                  order: 0,
                  created_at: null,
                  updated_at: null,
                  deleted_at: null,
                },
              ],
            },
          ],
          per_page: 10,
          total: "@integer(10, 30)",
        },
      };
    },
  },
  {
    url: /^\/api\/post\/\d+/,
    method: "get",
    response: {
      code: 200,
      message: "操作成功",
      data: {
        id: "@id",
        category_id: () => Mock.Random.integer(1, 10),
        title: () => Mock.Random.cword(10, 30),
        subtitle: () => `MKT-${Mock.Random.integer(100000000, 999999999)}`,
        description: () => Mock.Random.cword(100, 200),
        thumbnail: () => `/public/img/${Mock.Random.integer(1, 40)}.jpeg`,
        attributes: [
          { title: "应用", value: ["车载", "军工"] },
          { title: "材料", value: "玻璃" },
          { title: "安装方式", value: ["嵌入式"] },
          { title: "按键技术", value: ["锅仔开关", "剪刀脚开关"] },
          { title: "是否背光", value: ["是"] },
          { title: "按键个数", value: "109" },
        ],
        order: 0,
        created_at: "2021-01-22 09:43:33",
        updated_at: "2024-05-10 18:53:45",
        deleted_at: null,
        "category|1-3": [
          {
            id: "@id",
            parent_id: Mock.Random.integer(1, 10),
            title: "大键盘",
            subtitle: "",
            description: "",
            thumbnail: "",
            path: "product",
            order: null,
            created_at: "2024-03-21 11:30:20",
            updated_at: "2024-03-21 11:30:20",
            deleted_at: null,
            pivot: {
              product_id: 10,
              category_id: 3,
            },
          },
        ],
        "images|1-5": [
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
        "specs|2-6": [
          {
            id: "@id",
            product_id: 10,
            title: () => {
              let obj = {};
              obj["颜色"] = Mock.Random.pick(["红", "蓝", "黄"]);
              obj["尺码"] = Mock.Random.pick(["S", "M", "L"]);
              return obj;
            },
            image: "",
            price: () => Mock.Random.float(10, 999),
            cost: () => Mock.Random.float(10, 999),
            stock: () => Mock.Random.integer(10, 999),
            code: "VPS_00000001",
            weight: "1",
            volume: "1",
            order: 0,
            created_at: "2024-05-10 18:53:45",
            updated_at: "2024-05-10 18:53:45",
            deleted_at: null,
          },
        ],
        "contents|1-2": [
          {
            id: "@id",
            model_id: 10,
            model_type: "App\\Models\\Product",
            title: "默认标题",
            body: () => Mock.Random.cparagraph(100, 200),
            order: 0,
            created_at: null,
            updated_at: null,
            deleted_at: null,
          },
        ],
      },
    },
  },
  {
    url: /^\/api\/post\/\d+/,
    method: "patch",
    response: {
      code: 200,
      message: "保存成功",
      data: {},
    },
  },
  {
    url: /^\/api\/post\/\d+/,
    method: "delete",
    response: {
      code: 200,
      message: "删除成功",
      data: {},
    },
  },
];
