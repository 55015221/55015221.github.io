<template>
  <el-form ref="formRef" :model="formData" label-position="right">
    <el-table :data="dataResource" border>
      <!-- 属性名称 -->
      <el-table-column prop="title" label="属性名称" align="right" width="200"></el-table-column>

      <!-- 属性值 -->
      <el-table-column label="属性值">
        <template #default="{ row, $index }">
          <el-form-item :prop="row.title">
            <!-- Input -->
            <el-input v-if="row.type === 'text'" v-model="formData[row.title]" placeholder="请输入" clearable />

            <!-- Radio -->

            <el-radio-group v-if="row.type === 'radio'" v-model="formData[row.title]">
              <el-radio v-for="(val, index) in row.values" :key="index" :value="val.title">{{ val.title }}</el-radio>
            </el-radio-group>

            <!-- Select -->
            <el-select v-if="row.type === 'select'" v-model="formData[row.title]" clearable>
              <el-option v-for="(val, index) in row.values" :key="index" :value="val.title">{{ val.title }}</el-option>
            </el-select>

            <!-- Checkbox -->
            <el-checkbox-group v-if="row.type === 'checkbox'" v-model="formData[row.title]">
              <el-checkbox v-for="(val, index) in row.values" :key="index" :label="val.title" :value="val.title" />
            </el-checkbox-group>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { TypeResponse } from "@/types/axios";
import AttributeService from "@/api/attribute";

const loading = ref(false);
const formRef = ref({});
const formData = reactive<{ [key: string]: string | (string | number)[] | undefined }>({
  // 应用: ["车载", "军工"],
  // 材料: ["玻", "璃"],
  // 安装方式: ["嵌入式"],
  // 按键技术: ["锅仔开关", "剪刀脚开关"],
  // 是否背光: "是",
  // 按键个数: "109",
});

const props = defineProps({
  modelValue: {
    type: Array<AttributeInterface>,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);
const dataResource = reactive([
  { id: 1, title: "材料", type: "text", values: [] },
  { id: 2, title: "安装方式", type: "checkbox", values: ["台式", "无线"] },
  // More attributes
]);

watch(
  () => props.modelValue,
  (newValue) => {
    const data: { [key: string]: string | string[] } = {};
    newValue.forEach((item) => {
      data[item.title] = item.value as string | string[];
    });
    // 更新 formData
    Object.assign(formData, data);
  },
  { deep: true, immediate: true }
);

watch(
  () => formData,
  (newValue) => {
    const data: Array<AttributeInterface> = [];

    // 遍历 dataResource 数据
    dataResource.map((item) => {
      Object.keys(newValue).map((key) => {
        if (item.title === key) {
          let value = newValue[key];
          if (value && value.length > 0) {
            data.push({ id: item.id, title: item.title, value: value });
          }
        }
      });
    });

    // 触发事件，将处理后的数据传递给父组件
    emit("update:modelValue", data);
  },
  { deep: true }
);
// 获取属性列表
onMounted(async () => {
  await getAttributeList();
});

const getAttributeList = async (params?: any) => {
  loading.value = true;
  try {
    const response: TypeResponse = await AttributeService.index(params);
    if (response.code === 200) {
      Object.assign(dataResource, response.data.data);
    }
  } finally {
    loading.value = false;
  }
};
</script>
