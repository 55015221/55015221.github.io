import request from "@/utils/request";

/**
 * 封装 ConfigService 类型的接口方法
 */
class ConfigService {
  static async index(params?: any): Promise<any> {
    return request.get("/api/config", { params: params });
  }

  static async show(id: number): Promise<any> {
    return request.get("/api/config/" + id);
  }

  static async create(payload: any): Promise<any> {
    return request.post("/api/config", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return request.put("/api/config/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return request.delete("/api/config/" + id);
  }

  static async delete_all(payload: any): Promise<any> {}
}

export default ConfigService;
