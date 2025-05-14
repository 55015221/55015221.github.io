import request from "@/utils/request";

/**
 * 封装Category类型的接口方法
 */
class CategoryService {
  static async index(params?: any): Promise<any> {
    return request.get("/api/category", { params: params });
  }

  static async show(id: number): Promise<any> {
    return request.get("/api/category/" + id);
  }

  static async create(payload: any): Promise<any> {
    return request.post("/api/category", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return request.put("/api/category/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return request.delete("/api/category/" + id);
  }

  static async update_all(payload: any): Promise<any> {
    return request.post("/api/category/update_all", payload);
  }
}

export default CategoryService;
