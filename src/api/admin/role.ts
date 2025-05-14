import request from "@/utils/request";

/**
 * 封装Role类型的接口方法
 */
class RoleService {
  static async index(params?: object): Promise<any> {
    return request.get("/api/admin/role", { params: params });
  }

  static async show(id: number): Promise<any> {
    return request.get("/api/admin/role/" + id);
  }

  static async create(payload: any): Promise<any> {
    return request.post("/api/admin/role", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return request.put("/api/admin/role/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return request.delete("/api/admin/role/" + id);
  }

  static async delete_all(payload: any): Promise<any> {
    return request.delete("/api/admin/role/delete_all", payload);
  }
}

export default RoleService;
