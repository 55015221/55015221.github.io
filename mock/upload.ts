import Mock from "mockjs";
export default [
  {
    url: "/api/upload",
    method: "post",
    response: ({ body }: any) => {
      return {
        code: 200,
        message: "上传成功",
        data: {
          filename: "placekitten-400-400.png",
          url: `https://via.placeholder.com/400x400?t=${Mock.Random.integer(1, 10)}`,
          path: "placekitten-400-400.png"
        }
      };
    }
  }
];
