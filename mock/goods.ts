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
            icon: "tos_1",
            createTime: "@datetime(yy-MM-dd HH:mm:ss)",
            text: "@cparagraph(5)",
            content() {
              return JSON.stringify({ text: this.text });
            },
            "contentType|0-3": 0,
            "serviceUnreadCount|0-10": 0,
            thumbnail() {
              return Mock.Random.image("40x40", Mock.Random.color(), "#FFF", "png");
            },
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
