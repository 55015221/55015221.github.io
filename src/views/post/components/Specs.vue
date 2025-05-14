<template>
  <div class="specs">
    <Spec-Selector v-model="selectedSpecs" />
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
          <el-input-number v-model="row.price" :precision="2" :step="0.1" controls-position="right" :min="0" />
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
import SpecSelector from "@/views/post/components/SpecSelector.vue";
import { ElInput } from "element-plus";
import { nextTick, ref } from "vue";

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

/**
 * 定义接受的属性数据
 */
const props = defineProps<{
  modelValue: SpecItem[];
}>();

const emit = defineEmits<{
  "update:modelValue": [value: SpecItem[]];
}>();

/**
 [
 { "title": "颜色", "enabled": true, "values": [
 { "title": "星云灰", "enabled": true },
 { "title": "曜石黑", "enabled": true },
 { "title": "寰宇红", "enabled": true }
 ]
 },
 { "title": "版本", "enabled": true, "values": [
 { "title": "12GB+256GB", "enabled": true },
 { "title": "12GB+512GB", "enabled": true }
 ]
 }
 ]
 */
const defaultSpecs: any[] = [];

// 表格表头数据
const tableHeader = reactive([
  { prop: "image", label: "图片", value: "http://127.0.0.1:5173/public/img/17.jpeg" },
  { prop: "price", label: "价格", value: 100 },
  { prop: "cost", label: "成本价", value: 100 },
  { prop: "stock", label: "库存", value: 9999 },
  { prop: "code", label: "编码", value: "VPS_00000001" },
  { prop: "weight", label: "重量(KG)", value: 1 },
  { prop: "volume", label: "体积(m³)", value: 1 },
  { prop: "status", label: "状态", value: 1 },
  { prop: "order", label: "排序", value: 0 },
  { prop: "goods_id", label: "商品ID", value: 1 },
  { prop: "subtitle", label: "副标题", value: "" },
  { prop: "description", label: "描述", value: "" },
]);

// 用于存储选中的规格
const selectedSpecs = ref<Record<string, string>[]>([]);
const specsData = ref<SpecGroup[]>([]);
const inputValue = ref<string>();
const inputSpecValue = ref<string>();
const tableData = ref<SpecItem[]>([]);
const InputRef = ref<InstanceType<typeof ElInput>>();
const InputSpecsRef = ref<InstanceType<typeof ElInput>>();

function extractUniqueValues(data: SpecTitle[]): Record<string, string>[] {
  const result: Record<string, string>[] = [];
  if (!data?.length) return result;
  const keys = Array.from(new Set(data.flatMap(Object.keys)));
  keys.forEach((key) => {
    const uniqueValues = Array.from(new Set(data.map((item) => item[key]).filter(Boolean)));
    uniqueValues.forEach((value) => {
      result.push({ [key]: value });
    });
  });
  return result;
}

const setDefaultSpecs = () => {
  try {
    const specs = props.modelValue?.map((x) => x?.title || {}) || [];
    if (!specs.length) return [];
    const keys = Array.from(new Set(specs.flatMap((spec) => Object.keys(spec || {}))));
    if (!keys.length) return [];
    const transformedData = keys.map((key) => {
      const values = Array.from(new Set(specs.map((spec) => spec?.[key]).filter(Boolean)));
      return {
        title: key,
        enabled: true,
        values: values.map((value) => ({
          title: value,
          enabled: true,
        })),
      };
    });
    selectedSpecs.value = extractUniqueValues(specs);
    return transformedData;
  } catch (error) {
    console.error("Error in setDefaultSpecs:", error);
    return [];
  }
};

const SpecsConGenerate = (values: SpecGroup[]): SpecItem[] => {
  try {
    if (!values?.length) {
      return [];
    }

    let temp: any[][] = [];
    values.forEach((spec: SpecGroup) => {
      if (spec?.values) {
        const enabledValues = spec.values
          .filter((x) => x?.enabled)
          .map((x) => ({ [spec.title]: x.title }))
          .filter(Boolean);

        if (enabledValues.length) {
          temp.push(enabledValues);
        }
      }
    });

    if (!temp.length) return [];

    let res = temp.reduce(
      (x, y) => {
        const arr: any[] = [];
        x.forEach((x) =>
          y.forEach((y) => {
            if (x && y) {
              arr.push(x.concat([y]));
            }
          })
        );
        return arr;
      },
      [[]]
    );

    return res
      .map((x) => {
        if (!Array.isArray(x)) return null;

        const obj: Record<string, string> = {};
        x.forEach((y) => y && Object.assign(obj, y));

        if (!Object.keys(obj).length) return null;

        return {
          id: 0,
          status: 1,
          created_at: null,
          updated_at: null,
          deleted_at: null,
          goods_id: 1,
          title: obj,
          subtitle: "",
          description: "",
          ...Object.fromEntries(tableHeader.map((x) => [x.prop, x.value])),
        };
      })
      .filter(Boolean) as SpecItem[];
  } catch (error) {
    console.error("Error in SpecsConGenerate:", error);
    return [];
  }
};

watch(
  selectedSpecs,
  (newValue) => {
    if (newValue?.length) {
      specsData.value = transformData(newValue);
    }
  },
  { immediate: true }
);

onMounted(() => {
  specsData.value = setDefaultSpecs();
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
};

// 删除行
const handleDeleteRow = (index: number) => {
  Object.assign(tableData, tableData.value?.splice(index, 1));
};

// 转换数据的函数
function transformData(data: Record<string, string>[]): SpecGroup[] {
  const categories: Record<string, SpecGroup> = {};

  data.forEach((item) => {
    Object.entries(item).forEach(([category, value]) => {
      if (!categories[category]) {
        categories[category] = {
          title: category,
          enabled: true,
          values: [],
        };
      }
      if (!categories[category].values.some((v) => v.title === value)) {
        categories[category].values.push({
          title: value,
          enabled: true,
        });
      }
    });
  });

  return Object.values(categories);
}

/**
 * 动态规格组合（笛卡尔积）
 * @param groups
 */
const generateCombinations = (groups: Array<Array<any>>): Array<Array<any>> => {
  return groups.reduce(
    (acc, group) => {
      const result: Array<Array<any>> = [];
      acc.forEach((prev) => {
        group.forEach((value) => {
          result.push([...prev, value]);
        });
      });
      return result;
    },
    [[]]
  );
};

watchEffect(() => {
  try {
    if (specsData.value?.length) {
      const generatedData = SpecsConGenerate(specsData.value);
      if (Array.isArray(generatedData)) {
        tableData.value = generatedData;
        // 只在数据真正变化时才触发更新
        if (JSON.stringify(tableData.value) !== JSON.stringify(props.modelValue)) {
          emit("update:modelValue", generatedData);
        }
      }
    }
  } catch (error) {
    console.error("Error in watchEffect:", error);
  }
});
</script>
