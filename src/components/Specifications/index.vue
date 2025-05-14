<template>
  <div class="main-wrapper">
    <!-- 新增规格-->
    <div class="add-specs">
      <el-space>
        <el-input ref="InputSpecsRef" v-model="inputSpecValue" style="width: 200px" />
        <el-button class="button-new-tag ml-1" @click="handleSpecsInputConfirm"> + 规格</el-button>
      </el-space>
    </div>

    <el-divider />

    <!--  规格选择  -->
    <el-table :data="specsData" style="width: 100%" border>
      <el-table-column align="center" prop="title" label="规格" width="180" />
      <el-table-column label="规格值">
        <template #default="{ row, $index }">
          <el-space>
            <el-switch v-for="item in row.values" :key="item.id" v-model="item.enabled" inline-prompt :active-text="item.title" :inactive-text="item.title" @change="handleChangeValue($index, item)" />

            <el-input v-if="row?.inputVisible" ref="InputRef" v-model="inputValue" class="w-20" @keyup.enter="handleInputConfirm($index)" @blur="handleInputConfirm($index)" />
            <el-button v-else class="button-new-tag" @click="showInput($index)"> + 规格值</el-button>
          </el-space>
        </template>
      </el-table-column>
    </el-table>

    <el-divider />

    <!--  规格展示  -->
    <el-table :data="tableData" v-if="tableData.length" border>
      <template v-for="(item, index) in Object.entries(tableData[0].title)" :key="index">
        <el-table-column :label="item[0]" min-width="120" align="center">
          <template #default="scope">
            {{ scope.row.title[item[0]] }}
          </template>
        </el-table-column>
      </template>
      <el-table-column align="center" label="图片" width="100">
        <template #default="{ row }">
          <Upload v-model="row.image" width="60px" height="60px">
            <template #tip></template>
          </Upload>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="150" label="售价" prop="price">
        <template #default="{ row }">
          <el-input-number v-model="row.price" :precision="2" :step="0.1" controls-position="right" :min="0">
            <template #prefix>
              <span>￥</span>
            </template>
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="150" label="成本价">
        <template #default="{ row }">
          <el-input-number v-model.number="row.cost" :precision="2" :step="0.1" controls-position="right" :min="0" />
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="150" label="库存">
        <template #default="{ row }">
          <el-input-number v-model.number="row.stock" controls-position="right" :min="0" />
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="150" label="商品编号">
        <template #default="{ row }">
          <el-input v-model="row.code" />
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="150" label="重量(KG)">
        <template #default="{ row }">
          <el-input-number v-model.number="row.weight" controls-position="right" :min="0" />
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="150" label="体积(m³)">
        <template #default="{ row }">
          <el-input-number v-model.number="row.volume" controls-position="right" :min="0" />
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" label="操作" fixed="right">
        <template #default="{ $index }">
          <el-link type="primary" @click="handleDeleteRow($index)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>

    <pre>{{ tableData }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ElInput } from "element-plus";
import { nextTick, reactive, ref, watchEffect } from "vue";
import SpecificationService from "@/api/specification";

interface SpecsInterface {
  id?: number;
  title: any;
  image?: string;
  price?: number;
  cost?: number;
  stock?: number;
}

type SpecType = {
  id?: number;
  title: string;
  values?: Array<SpecType>;
  enabled?: boolean;
  inputVisible?: boolean;
};

const defaultSpecs: Array<SpecType> = [
  {
    id: 1,
    title: "颜色",
    enabled: true,
    values: [
      { id: 1, title: "红", enabled: true },
      { id: 2, title: "黄", enabled: false },
      { id: 3, title: "蓝", enabled: false },
    ],
  },
  {
    id: 2,
    title: "尺码",
    enabled: true,
    values: [
      { id: 4, title: "S", enabled: true },
      { id: 5, title: "M", enabled: true },
      { id: 6, title: "L", enabled: false },
      { id: 7, title: "XL", enabled: false },
    ],
  },
  {
    id: 3,
    title: "款式",
    enabled: true,
    values: [
      { id: 8, title: "男款", enabled: false },
      { id: 9, title: "女款", enabled: false },
    ],
  },
];

/**
 * 定义接受的属性数据
 */
const props = defineProps({
  modelValue: {
    type: Array<SpecsInterface>,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

// 表格表头数据
const tableHeader = reactive([
  { prop: "image", label: "图片", value: "http://127.0.0.1:5173/public/img/17.jpeg" },
  { prop: "price", label: "价格", value: 100 },
  { prop: "cost", label: "成本价", value: 100 },
  { prop: "stock", label: "库存", value: 9999 },
  { prop: "code", label: "编码", value: "VPS_00000001" },
  { prop: "weight", label: "重量", value: 1 },
  { prop: "volume", label: "体积", value: 1 },
]);

const specsData = ref<SpecType[]>(defaultSpecs);
const inputValue = ref<string>();
const inputSpecValue = ref<string>();
const tableData = ref<SpecsInterface[]>([]);
const InputRef = ref<InstanceType<typeof ElInput>>();
const InputSpecsRef = ref<InstanceType<typeof ElInput>>();

// 加载规格数据
const loadSpecsData = async () => {
  const payload = {};
  await SpecificationService.index(payload).then((response) => {
    specsData.value = setDefaultSpecs(response.data.data);
  });
};

const transformData = (original: []) => {
  // 创建一个存储转换结果的对象
  const result: { [key: string]: Set<string> } = {};

  // 遍历原始数组，将每个键的值添加到对应的Set中
  original.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (!result[key]) {
        result[key] = new Set();
      }
      result[key].add(item[key]);
    });
  });

  // 将对象转换为目标格式
  return Object.keys(result).map((key) => ({
    title: key,
    values: Array.from(result[key]).map((value) => ({ title: value })),
  }));
};

// 设置默认值
const setDefaultSpecs = (data: SpecType[]) => {
  const specs = props.modelValue.map((x) => x.title);
  const newData = data.concat(transformData(specs as []));
  newData?.forEach((value, _) => {
    value.enabled = false;
    specs.map((x: string) => {
      if (Object.keys(x).includes(value.title)) {
        value.enabled = true;
      }
    });
    value.values?.forEach((val, _) => {
      val.enabled = false;
      specs.map((x: string) => {
        if (Object.values(x).includes(val.title)) {
          val.enabled = true;
        }
      });
    });
  });
  return newData;
};

onMounted(() => {
  loadSpecsData();
});

const showInput = (index: number) => {
  specsData.value[index].inputVisible = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

// 添加规格值
const handleInputConfirm = (index: number) => {
  if (inputValue.value) {
    specsData.value[index].values?.push({ title: inputValue.value, enabled: true });
  }
  specsData.value[index].inputVisible = false;
  inputValue.value = "";
};

// 添加规格
const handleSpecsInputConfirm = () => {
  if (inputSpecValue.value) {
    specsData.value.push({ title: inputSpecValue.value, values: [], enabled: true });
    inputSpecValue.value = "";
  }
};

// 切换规格值是否启用
const handleChangeValue = (index: number, value: any) => {
  // 获取到 values 数组，避免重复访问
  const values = specsData.value[index]?.values;
  // 如果 values 数组存在，继续执行操作
  // 如果 values 数组存在，继续执行操作
  if (values) {
    let i = values.indexOf(value);
    if (i !== -1 && values[i]) {
      // 确保 values[i] 是有效的
      values[i].enabled = !!values[i].enabled; // 给 enabled 赋值
    }
  }

  // let i = specsData.value[index].values?.indexOf(value);
  // if (i && specsData.value.length) {
  //   specsData.value[index].values[i].enabled = !!specsData.value[index].values[i].enabled;
  // }
};

// 生成table数据
const SpecsConGenerate = (values: any) => {
  if (!values?.length) {
    return [];
  }
  let temp: any[][] = [];
  values.map((spec: { values: any[]; title: any }, _) => {
    let item = spec.values
      ?.map((x: any) => {
        if (x.enabled) return { [spec.title]: x.title };
      })
      .filter((x: any) => typeof x !== "undefined");
    if (item) temp.push(item);
  });

  let res = temp
    .filter((x) => x.length)
    .reduce(
      (x, y) => {
        let arr: any[] = [];
        x.forEach((x) =>
          y.forEach((y) => {
            arr.push(x.concat([y]));
          })
        );

        return arr;
      },
      [[]]
    );

  return res
    .map((x) => {
      let obj: any = {};
      x.map((y: any) => Object.assign(obj, y));
      // 补充额外字段
      return Object.assign({ title: obj }, ...tableHeader.map((x) => ({ [x.prop]: x.value })));
    })
    .filter((x) => Object.keys(x.title).length > 0);
};

// 删除行
const handleDeleteRow = (index: number) => {
  Object.assign(tableData, tableData.value?.splice(index, 1));
};

// 页面加载时
watchEffect(() => {
  tableData.value = SpecsConGenerate(specsData.value);
  emit("update:modelValue", tableData.value);
});
</script>

<style lang="scss" scoped>
.w-20 {
  width: 80px;
}
</style>
