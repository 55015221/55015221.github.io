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
            subtitle() {
              return `MT-${Mock.mock('@date("y-M-d")')}`;
            },
            description: "@cword(30)",
            thumbnail() {
              return Mock.Random.image("500x500", Mock.Random.color(), "#FFF", "png");
            },
            icon: "tos_1",
            created_at: "@datetime(yy-MM-dd HH:mm:ss)",
            content() {
              return JSON.stringify({text: "@cparagraph(15)"});
            },
            "contentType|0-3": 0,
            "serviceUnreadCount|0-10": 0,
            "badge|0-2": [Mock.Random.ctitle(3, 5)],
            "images|1-3": [
              {
                id: "@id",
                title: "@title",
                url() {
                  return Mock.Random.pick([`https://static.cms.me/static/house/${Mock.Random.integer(0, 55)}.jpg`, `https://static.cms.me/static/huawei/800_800_${Mock.Random.integer(0, 55)}.png`]);
                },
              },
            ],
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
