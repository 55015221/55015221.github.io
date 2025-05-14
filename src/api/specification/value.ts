import request from "@/utils/request";

/**
 * 封装 SpecificationValueService 类型的接口方法
 */
class SpecificationValueService {
  static async index(params?: object): Promise<any> {
    return request.get("/api/specification/value", { params: params });
  }

  static async show(id: number): Promise<any> {
    return request.get("/api/specification/value/" + id);
  }

  static async create(payload: any): Promise<any> {
    return request.post("/api/specification/value", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return request.put("/api/specification/value/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return request.delete("/api/specification/value/" + id);
  }
}

export default SpecificationValueService;
