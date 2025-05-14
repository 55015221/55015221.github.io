<template>
  <el-dialog v-model="dialogVisible" :title="formData.id ? '修改' : '创建'" :before-close="onCancel">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-position="right" label-width="90px">
      <el-form-item prop="title" label="名称">
        <el-input v-model="formData.name" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item prop="name" label="标识">
        <el-input v-model="formData.slug" placeholder="请输入标识" clearable />
      </el-form-item>
      <el-form-item prop="parent_id" label="上级栏目">
        <el-tree-select
          placeholder="请选择栏目"
          v-model="formData.parent_id"
          :data="dataSource"
          :check-strictly="true"
          :props="defaultProps"
          filterable
          node-key="id"
          default-expand-all
        ></el-tree-select>
      </el-form-item>
      <el-form-item prop="method" label="方法">
        <el-select v-model="formData.method" filterable placeholder="请选择方法" style="width: 100%">
          <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="path" label="路径">
        <el-input :rows="5" type="textarea" v-model="formData.path" placeholder="请输入路由" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button v-loading="loading" type="primary" @click="handleSubmit">{{ formData.id ? "修改" : "确定" }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import PermissionService from "@/api/admin/permission";
import type { FormInstance } from "element-plus";
import AdminMenuService from "@/api/admin/menu";
import { TypeResponse } from "@/types/axios";

interface RowV0 {
  created_at?: Date;
  id?: number;
  name?: string;
  slug?: string;
  parent_id?: number;
  method?: string;
  path?: string;
  icon?: string;
  order?: number;
  updated_at?: Date;
}

const emit = defineEmits(["on-success"]);
const defaultProps = { label: "title", value: "id", emitPath: false, expandTrigger: "hover" };

const formRef = ref<FormInstance | null>();
const loading = ref<boolean>(false);
const dialogVisible = ref<boolean>(false);
const dataSource = ref([]);
const formData = ref<RowV0>({});

const formRules = {
  name: [{ required: true, message: "请输入名称", trigger: "blur" }],
  slug: [{ required: true, message: "请输入标识", trigger: "blur" }],
};

const selectOptions = [
  { label: "ANY", value: "ANY" },
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "DELETE", value: "DELETE" },
  { label: "PATCH", value: "PATCH" },
  { label: "OPTIONS", value: "OPTIONS" },
  { label: "HEAD", value: "HEAD" },
];

// 打开弹窗
const openDialog = async (row: any) => {
  if (row && row.id) {
    const { data } = await PermissionService.show(row.id);
    formData.value = data.data;
  }
  dialogVisible.value = true;
};
// 关闭弹窗
// 取消
const onCancel = () => {
  formRef.value?.resetFields();
  formRef.value?.clearValidate();
  formData.value = {};
  dialogVisible.value = false;
};

// 新增
const handleSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return;
  }
  loading.value = true;
  let promise = null;
  if (formData.value?.id) {
    promise = PermissionService.update(formData.value.id, formData.value);
  } else {
    promise = PermissionService.create(formData.value);
  }

  await promise
    .then(({ code, message }: TypeResponse) => {
      ElMessage({ type: code === 200 ? "success" : "error", message: message });
      if (code === 200) {
        emit("on-success");
        onCancel();
      }
    })
    .finally(() => (loading.value = false));
};

// 获取上级栏目
const getMenuList = async (params?: any) => {
  loading.value = true;
  await AdminMenuService.index(params)
    .then(({ data }: TypeResponse) => {
      Object.assign(dataSource.value, data.data);
    })
    .finally(() => (loading.value = false));
};

// 页面加载时
onMounted(async () => {
  await getMenuList();
});

defineExpose({ openDialog });
</script>
