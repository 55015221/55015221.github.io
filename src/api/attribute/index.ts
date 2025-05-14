import request from "@/utils/request";

/**
 * 封装 AttributeService 类型的接口方法
 */
class AttributeService {
  static selectOptions: any = [
    { label: "文本框", value: "text" },
    { label: "单选框", value: "select" },
    { label: "多选框", value: "checkbox" },
    { label: "文件框", value: "file" },
  ];

  static async index(params?: any): Promise<any> {
    return request.get("/api/attribute", { params: params });
  }

  static async show(id: number): Promise<any> {
    return request.get("/api/attribute/" + id);
  }

  static async create(payload: any): Promise<any> {
    return request.post("/api/attribute", payload);
  }

  static async update(id: number, payload: any): Promise<any> {
    return request.put("/api/attribute/" + id, payload);
  }

  static async delete(id: number): Promise<any> {
    return request.delete("/api/attribute/" + id);
  }
}

export default AttributeService;
