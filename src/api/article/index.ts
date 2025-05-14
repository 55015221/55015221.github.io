import request from "@/utils/request";

/**
 * 封装Article类型的接口方法
 */
class ArticleService {
  static async index(params?: any): Promise<any> {
    params.category_id = 8;
    return await request.get("/api/post", { params: params });
  }

  static async show(id: number): Promise<any> {
    return await request.get("/api/post/" + id);
  }

  static async create(payload: any): Promise<any> {
    return await request.post("/api/post", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return await request.put("/api/post/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return await request.delete("/api/post/" + id);
  }
}

export default ArticleService;
