import request from "@/utils/request";

/**
 * 封装 Classification类型的接口方法
 */
class ClassificationService {
  static async index(params?: any): Promise<any> {
    params.parent_id = 2;
    return request.get("/api/classification", { params: params });
  }

  static async show(id: number): Promise<any> {
    return request.get("/api/classification/" + id);
  }

  static async create(payload: any): Promise<any> {
    return request.post("/api/classification", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return request.put("/api/classification/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return request.delete("/api/classification/" + id);
  }

  static async update_all(payload: any): Promise<any> {
    return request.post("/api/classification/update_all", payload);
  }
}

export default ClassificationService;
