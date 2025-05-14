import request from "@/utils/request";

/**
 * 封装post类型的接口方法
 */
class PostService {
  static async index(params?: any): Promise<any> {
    return await request.get("/api/goods", { params: params });
  }

  static async show(id: number): Promise<any> {
    return await request.get("/api/goods/" + id);
  }

  static async create(payload: any): Promise<any> {
    return await request.post("/api/goods", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return await request.put("/api/goods/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return await request.delete("/api/goods/" + id);
  }

  static async deleteAll(ids: any): Promise<any> {
    return await request.delete("/api/goods/", { data: ids });
  }
}

export default PostService;
