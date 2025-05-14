import request from "@/utils/request";

class PermissionService {
  static async index(params?: object): Promise<any> {
    return request.get("/api/admin/permission", { params: params });
  }

  static async show(id: number): Promise<any> {
    return request.get("/api/admin/permission/" + id);
  }

  static async create(payload: any): Promise<any> {
    return request.post("/api/admin/permission", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return request.put("/api/admin/permission/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return request.delete("/api/admin/permission/" + id);
  }

  static async delete_all(payload: any): Promise<any> {
    return request.delete("/api/admin/permission/delete_all", payload);
  }
}

export default PermissionService;
