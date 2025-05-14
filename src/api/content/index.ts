import request from "@/utils/request";

/**
 * 封装post类型的接口方法
 */
class ContentService {
  static async index(params?: any): Promise<any> {
    return await request.get("/api/content", { params: params });
  }

  static async show(id: number): Promise<any> {
    return await request.get("/api/content/" + id);
  }

  static async create(payload: any): Promise<any> {
    return await request.post("/api/content", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return await request.put("/api/content/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return await request.delete("/api/content/" + id);
  }
}

export default ContentService;
