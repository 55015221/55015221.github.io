import request from "@/utils/request";

/**
 * 封装Tag类型的接口方法
 */
class TagService {
  static async index(params?: any): Promise<any> {
    return request.get("/api/tag", { params: params });
  }

  static async show(id: number): Promise<any> {
    return request.get("/api/tag/" + id);
  }

  static async create(payload: any): Promise<any> {
    return request.post("/api/tag", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return request.put("/api/tag/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return request.delete("/api/tag/" + id);
  }
}

export default TagService;
