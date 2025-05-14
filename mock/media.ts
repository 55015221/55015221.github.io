import Mock from "mockjs";

export default [
  {
    url: "/api/media",
    method: "get",
    response: ({ body }: any) => {
      return {
        code: 200,
        message: "",
        data: {
          per_page: 20,
          total: 30,
          current_page: 1,
          "data|10-40": [
            {
              id: "@increment()",
              filename: "@ctitle()",
              url: () => `/public/img/${Mock.Random.integer(1, 40)}.jpeg`,
              disk: "s3",
              created_at: "2023-04-23 13:55:15",
              updated_at: "2023-04-23 13:55:15",
              deleted_at: null,
            },
          ],
        },
      };
    },
  },
  {
    url: "/api/media/:id",
    method: "get",
    response: {
      code: 200,
      message: "",
      data: {
        id: "@increment()",
        filename: "@ctitle()",
        url: () => `/public/img/${Mock.Random.integer(1, 40)}.jpeg`,
        disk: "s3",
        created_at: "2023-04-23 13:55:15",
        updated_at: "2023-04-23 13:55:15",
        deleted_at: null,
      },
    },
  },
  {
    url: "/api/media/:id",
    method: "post",
    response: {
      code: 200,
      message: "",
    },
  },
  {
    url: "/api/media/:id",
    method: "delete",
    response: {
      code: 200,
      message: "",
    },
  },
];
