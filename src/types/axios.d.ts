// api响应 扩展 axios 数据返回类型
import * as axios from "axios";

declare module "axios" {
  declare interface Response<T = any> {
    code: number;
    data?: T;
    message: string;
  }
}

interface TypeResponse<T = any> {
  code: number;
  data?: T;
  message: string;
}

// 分页行数据
declare interface TableDataRow {
  [x: string]: any;
}

// 接口响应分页数据
declare interface TypePaginate<T = any> {
  current_page: number;
  data: Array<TableDataRow>[];
  total: number;
  per_page: number;

  [key: string]: any;
}
