<template>
  <el-dialog v-model="dialogVisible" :title="formData.id ? '修改' : '创建'" :before-close="handleClose">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-position="right" label-width="120px">
      <el-form-item prop="title" label="名称">
        <el-input v-model="formData.title" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item prop="description" label="说明">
        <el-input type="textarea" v-model="formData.placeholder" placeholder="请输入说明" clearable />
      </el-form-item>
      <el-form-item prop="order" label="排序">
        <el-input-number v-model="formData.order" placeholder="请输入排序" clearable />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-loading="loading" type="primary" @click="handleSubmit">修 改</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import type { FormInstance } from "element-plus";
import TagService from "@/api/tag";
import { TypeResponse } from "@/types/axios";

interface FormDataInterface {
  created_at?: Date;
  id?: number | null;
  title?: string;
  name?: string;
  type?: string;
  value?: string;
  class?: string;
  subtitle?: string;
  description?: string;
  placeholder?: string;
  order?: number;
  updated_at?: Date;
}

const emit = defineEmits(["success"]);

const formRef = ref<FormInstance | null>();

const dialogVisible = ref(false);

const formRules = {
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  name: [{ required: true, message: "请输入名称", trigger: "blur" }],
};

const selectOptions = [
  { label: "文本框", value: "text" },
  // { label: '单选框', value: 'select' },
  // { label: '多选框', value: 'checkbox' },
  { label: "图片", value: "image" },
  { label: "文件", value: "file" },
];

const loading = ref(false);

const formData = reactive(<FormDataInterface>{
  order: 1,
  type: "text",
  value: "",
});

// 打开弹窗
const openDialog = async (row?: any) => {
  if (row && row.id) {
    loading.value = true;
    await TagService.show(row.id)
      .then((response: TypeResponse) => {
        Object.assign(formData, response.data);
      })
      .finally(() => (loading.value = false));
  }

  dialogVisible.value = true;
};

// 取消
const handleClose = () => {
  formRef.value?.clearValidate();
  formRef.value?.resetFields();
  dialogVisible.value = false;
};

// 确定
const handleSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return;
  }
  loading.value = true;
  if (formData.id) {
    const { code, message } = await TagService.update(formData.id, formData).finally(() => {
      loading.value = false;
    });
    if (200 === code) {
      emit("success");
    }
  } else {
    const { code, message } = await TagService.create(formData).finally(() => {
      loading.value = false;
    });
    if (200 === code) {
      emit("success");
    }
  }

  dialogVisible.value = false;
};

// 页面加载时
onMounted(() => {});

defineExpose({ openDialog });
</script>

<style lang="scss"></style>
