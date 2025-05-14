import request from "@/utils/request";

/**
 * 封装 AdminMenu 类型的接口方法
 */
class AdminMenuService {
  static async index(params?: object): Promise<any> {
    return request.get("/api/admin/menu", { params: params });
  }

  static async show(id: number): Promise<any> {
    return request.get("/api/admin/menu/" + id);
  }

  static async create(payload: any): Promise<any> {
    return request.post("/api/admin/menu", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return request.put("/api/admin/menu/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return request.delete("/api/admin/menu/" + id);
  }

  static async update_all(payload: any): Promise<any> {
    return request.post("/api/admin/menu/update_all", payload);
  }

  static async delete_all(payload: any): Promise<any> {
    return request.delete("/api/admin/menu/delete_all", payload);
  }
}

export default AdminMenuService;
