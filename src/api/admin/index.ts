import request from "@/utils/request";

/**
 * 封装User类型的接口方法
 */
class AdminUserService {
  static async index(params?: object): Promise<any> {
    return request.get("/api/admin/user", { params: params });
  }

  static async show(id: number): Promise<any> {
    return request.get("/api/admin/user/" + id);
  }

  static async create(payload: any): Promise<any> {
    return request.post("/api/admin/user", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return request.put("/api/admin/user/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return request.delete("/api/admin/user/" + id);
  }

  static async assign_roles(id: number, roles: number[]): Promise<any> {
    return request.post(`/api/admin/user/${id}/roles`, { roles });
  }

  /**
     * 使用

     const handleLogin = async () => {
     const loginParams = {
     username: state.Account,
     password: state.Password,
     }
     const res = await UserService.login(loginParams)
     console.log(res)
     }

     */
}

export default AdminUserService;
