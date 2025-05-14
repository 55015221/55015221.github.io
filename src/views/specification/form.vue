<template>
  <el-dialog v-model="dialogVisible" :title="formData.id ? '修改' : '创建'" :before-close="onCancel">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-position="right" label-width="120px">
      <el-form-item prop="title" label="名称">
        <el-input v-model="formData.title" placeholder="请输入名称" clearable style="width: 300px" />
      </el-form-item>
      <el-form-item prop="subtitle" label="副标题">
        <el-input v-model="formData.subtitle" placeholder="请输入名称" clearable style="width: 500px" />
      </el-form-item>

      <el-form-item prop="category_id" label="上级栏目" style="width: 500px">
        <el-tree-select
          placeholder="请选择栏目"
          v-model="formData.category_id"
          :data="dataSource"
          filterable
          :check-strictly="true"
          node-key="id"
          default-expand-all
          :props="{ label: 'title', value: 'id', emitPath: false, expandTrigger: 'hover' }"
        />
      </el-form-item>

      <el-form-item prop="description" label="描述">
        <el-input type="textarea" v-model="formData.description" placeholder="请输入描述" :rows="4" clearable style="width: 500px" />
      </el-form-item>
      <el-form-item prop="order" label="排序">
        <el-input-number v-model="formData.order" :min="0" :max="999" placeholder="请输入排序" clearable />
      </el-form-item>
      <el-form-item props="values" label="值">
        <el-input type="textarea" v-model="valuesTransform" :rows="6" autocomplete="off" />
        <div class="mt-2 w-100">
          <el-alert description="一行为一个属性值，多个值用回车换行隔开" type="info" show-icon :closable="false" />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button v-loading="loading" type="primary" @click="onSubmit">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance } from "element-plus";
import CategoryService from "@/api/category";
import SpecificationService from "@/api/specification";
import { TypeResponse } from "@/types/axios";

interface CategoryInterface {
  id?: number;
  title?: string;
  values?: Array<ValueInterface>;
}

interface ValueInterface {
  id?: number;
  title?: string;
  values?: Array<ValueInterface>;
}

interface FormDataInterface {
  created_at: Date;
  id?: number;
  category_id: number;
  parent_id: number;
  title: string;
  subtitle: string;
  type: string;
  required: number;
  description: string;
  options: string;
  values: Array<ValueInterface>;
  order: number;
  parent?: CategoryInterface;
  updated_at: Date;
}

const emit = defineEmits<{
  (event: "on-success"): void;
}>();

const loading = ref(false);
const dialogVisible = ref(false);

const valuesTransform = ref("");
const formRef = ref<FormInstance | null>();
const dataSource = ref(<Array<CategoryInterface>>[{ id: 0, title: "根目录", values: [] }]);
const formData = reactive(<FormDataInterface>{
  category_id: 0,
  order: 0,
});

const formRules = {
  category_id: [{ required: true, message: "请输入名称", trigger: "blur" }],
  title: [
    { required: true, message: "请输入名称", trigger: "blur" },
    { min: 2, max: 100, message: "长度在 2 到 100 个字符", trigger: "change" },
  ],
  type: [{ required: true, message: "请选择类型", trigger: "blur" }],
};

// 处理值换行
watch(
  () => formData.values,
  (newValue, oldValue) => {
    valuesTransform.value = newValue.map((x) => x.title).join("\n");
  }
);

watch(
  () => valuesTransform.value,
  (newValue, oldValue) => {
    formData.values = newValue.split("\n").map((val: string) => ({ title: val }));
  }
);

// 页面加载时
onMounted(async () => {
  await getCategoryList({ path: "product" });
});

const getCategoryList = async (params?: any) => {
  loading.value = true;
  await CategoryService.index(params)
    .then((response: TypeResponse) => {
      dataSource.value.push(...response.data.data);
    })
    .finally(() => (loading.value = false));
};

// 取消
const onCancel = () => {
  loading.value = false;
  formRef.value?.resetFields();
  formRef.value?.clearValidate();
  valuesTransform.value = "";
  dialogVisible.value = false;
};

// 确定
const onSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return;
  }

  loading.value = true;
  let promise = null;
  if (formData.id) {
    promise = SpecificationService.update(formData.id, formData);
  } else {
    promise = SpecificationService.create(formData);
  }

  await promise
    .then(({ code, message }: TypeResponse) => {
      ElMessage({ type: code === 200 ? "success" : "error", message: message });
      if (code === 200) {
        emit("on-success");
        onCancel();
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

// 打开弹窗
const openDialog = async (row: any) => {
  dialogVisible.value = true;
  if (row) {
    Object.assign(formData, row);
  }
};

// 规格值
const openValueDialog = async (row: any) => {
  dialogVisible.value = true;
  if (row) {
    Object.assign(formData, {
      category_id: row.category_id || 0,
      parent_id: row.id,
    });
  }
};

defineExpose({ openDialog, openValueDialog });
</script>

<style lang="scss">
.mt-2 {
  margin-top: 5px;
}

.w-100 {
  width: 100%;
}
</style>
