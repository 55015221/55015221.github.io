import request from "@/utils/request";

/**
 * 封装 SpecificationService 类型的接口方法
 */
class SpecificationService {
  static async index(params?: any): Promise<any> {
    return request.get("/api/spec", { params: params });
  }

  static async show(id: number): Promise<any> {
    return request.get("/api/spec/" + id);
  }

  static async create(payload: any): Promise<any> {
    return request.post("/api/spec", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return request.put("/api/spec/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return request.delete("/api/spec/" + id);
  }
}

export default SpecificationService;
