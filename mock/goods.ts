import Mock from "./index";

const imageList = [
  "00488ab8159cc22bb7182126a338fd32.jpeg",
  "3a5e766f0ecee8230aa8c1d0b2d951c6.jpeg",
  "6af1c9825845fee47b39298c51dea3f3.jpeg",
  "bc76145a4bf533259e6337741061df42.jpeg",
  "06e8149691d5add750024828d98f32d6.jpeg",
  "3abafcd659e8c46be83ce697c5222f11.jpeg",
  "6e7817d4087c4f0070c5a31d81eaa191.jpeg",
  "d7d31b81fcce82b6cf4f7bd54b865f8f.jpeg",
  "113c2e6ee903c7aa07bca3201e177483.jpeg",
  "3de42b983a44965a260f20e2dbafe6b0.jpeg",
  "716fc38a5ab1e1633e89e4a33915e028.jpeg",
  "dd63b703c2bee9be4475ec961a792a51.jpeg",
  "1636d80d46f19f8fae44ddc62b382037.jpeg",
  "3f96df8d3376214c1668f7347db59e1b.jpeg",
  "7759887a9e1daa6717b5372ad85e8194.jpeg",
  "e039745303897ba29e57476f7f613156.jpeg",
  "17a74d5d5b9489b5f820c602e3b33069.jpeg",
  "4557a1c8fdc24537a485a1837a4b11a2.jpeg",
  "95dd023139fd88bf5089c7762b9101b8.jpeg",
  "e79b202cd35a46de6fe08226d89c987e.jpeg",
  "1ae8b0b18160ab4e98dcb9cde4523157.jpeg",
  "589ceb5f76abb1c38c5bc07251be3012.jpeg",
  "96bc290533b5bcc86b879e943d2e23e4.jpeg",
  "edfa37ea1dbb7938b4a5e707e7784e31.jpeg",
  "2415033c08d05d6c49a2a2f0c41149e6.jpeg",
  "5c3ab076c45967d4a4dc59dc4df12e8e.jpeg",
  "9aa722371e43d664732c958749d40e7c.jpeg",
  "f4866656b5c2ac75628e7157502e3dcd.jpeg",
  "2ddfcc788b1284cbcfa8de4f4f5dae02.jpeg",
  "5ec9331daed0226e8e08ecedfe0524ae.jpeg",
  "a8df729a01674f7372bcba192f226b13.jpeg",
  "f71a064b0b683605ce65f59461be7795.jpeg",
  "37c3b2367b16d98ee399bda66bbcd940.jpeg",
  "65ff88ed88235782a91e7463ed2077d2.jpeg",
  "b1d356aef350f596f740aaa14a3947f6.jpeg",
  "fd949984879f2e5d08afad4d84f230b2.jpeg",
  "38fbdc218b14cd34d7ebbac6a640cbad.jpeg",
  "6702b0c5bd96123b15e42df3795edc86.jpeg",
  "b407576c03b2a44faf8bf160cb44529b.jpeg",
];

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
            title() {
              return Mock.Random.ctitle(6, 30);
            },
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
            "badge|0-2": [Mock.Random.ctitle(2, 4)],
            "images|1-3": [
              {
                id: "@id",
                title: "@title",
                url() {
                  return `/public/img/product/${Mock.Random.pick(imageList)}`;
                  // return Mock.Random.pick([`https://static.cms.me/static/house/${Mock.Random.integer(0, 55)}.jpg`, `https://static.cms.me/static/huawei/800_800_${Mock.Random.integer(0, 55)}.png`]);
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
