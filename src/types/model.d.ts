declare interface FileInterface {
  id?: number;
  filename: string;
  url: string;
}

declare interface CategoryInterface {
  id?: number;
  goods_id?: number;
  title?: string;
  children?: Array<CategoryInterface>;
}

declare interface ContentInterface {
  id?: number;
  goods_id?: number;
  title: string;
  body: string;
}

declare interface AttributeInterface {
  id?: number;
  goods_id?: number;
  title: string;
  value: string | string[];
}

interface SpecTitle {
  [key: string]: string;
}

interface SpecItem {
  id: number;
  status: number;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  goods_id: number;
  title: SpecTitle;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  cost: number;
  stock: number;
  code: string;
  weight: number;
  volume: number;
  order: number;
}

interface SpecValue {
  title: string;
  enabled: boolean;
}

interface SpecGroup {
  title: string;
  enabled: boolean;
  values: SpecValue[];
  inputVisible?: boolean;
}
