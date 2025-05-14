import request from "@/utils/request";

/**
 * 封装Media类型的接口方法
 */
class MediaService {
  static async index(params?: any): Promise<any> {
    return request.get("/api/media", { params: params });
  }

  static async show(id: number): Promise<any> {
    return request.get("/api/media/" + id);
  }

  static async create(payload: any): Promise<any> {
    return request.post("/api/media", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return request.put("/api/media/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return request.delete("/api/media/" + id);
  }

  static async delete_all(payload: any): Promise<any> {
    return request.delete("/api/media/delete_all", payload);
  }
}

export default MediaService;
