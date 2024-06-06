import Mock from "./index";

export default [
  {
    url: "/api/goods",
    method: "get",
    response: () => {
      const data = Mock.mock({
        total: 100,
        "data|20": [
          {
            id: "@id",
            title: "@ctitle",
            description: "@cword(30)",
            thumbnail() {
              return Mock.Random.image("500x500", Mock.Random.color(), "#FFF", "png");
            },
            icon: "tos_1",
            created_at: "@datetime(yy-MM-dd HH:mm:ss)",
            content() {
              return JSON.stringify({ text: "@cparagraph(15)" });
            },
            "contentType|0-3": 0,
            "serviceUnreadCount|0-10": 0,
          },
        ],
      });
      return {
        code: 200,
        data: data,
        message: "ok",
      };
    },
  },
];