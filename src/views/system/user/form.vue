<template>
  <el-dialog v-model="dialogVisible" :title="formData?.id ? '编辑' : '新增'" :before-close="onCancel">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="120px">
      <el-form-item prop="username" label="昵称">
        <el-input v-model="formData.username" placeholder="请输入昵称" clearable></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="formData.email" :disabled="!!formData.id" placeholder="请输入邮箱" clearable></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机号码">
        <el-input v-model="formData.mobile" placeholder="请输入手机号码" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="formData.password" placeholder="请输入密码" type="password" clearable></el-input>
      </el-form-item>
      <el-form-item prop="avatar" label="头像">
        <Upload v-model="formData.avatar" name="file" :data="{ token: 'TKE615916022101558' }" />
      </el-form-item>
      <el-form-item prop="roles" label="角色">
        <el-select v-model="formData.roles" multiple filterable clearable placeholder="请选择角色" style="width: 100%">
          <el-option v-for="role in allRoles" :key="role.id" :label="role.name" :value="role.name" />
        </el-select>
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
import { reactive, toRefs, onMounted, ref, defineAsyncComponent, nextTick } from "vue";
import AdminUserService from "@/api/admin";
import type { FormInstance } from "element-plus";
import RoleService from "@/api/admin/role";
import { TypePaginate, TypeResponse } from "@/types/axios";
import VxeUI from "vxe-pc-ui";

const Upload = defineAsyncComponent(() => import("@/components/Upload/index.vue"));

interface FormDataInterface {
  avatar?: string;
  created_at?: Date;
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  mobile?: string;
  password?: string;
  permissions?: string[];
  roles?: string[];
  updated_at?: Date;
}

const emit = defineEmits<{
  (event: "on-success"): void;
}>();

const loading = ref(false);
const dialogVisible = ref(false);
const formRef = ref<FormInstance | null>();
const formData = ref<FormDataInterface>({});

const formRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
};

const state = reactive({
  allRoles: <Array<TypePaginate>>{},
  allPermissions: <Array<TypePaginate>>{},
});

// 打开弹窗
const openDialog = async (row?: FormDataInterface) => {
  if (row && row.id) {
    formData.value = { ...row };
  } else {
    formData.value = {};
  }
  dialogVisible.value = true;
};

const onCancel = () => {
  formRef.value?.clearValidate();
  formRef.value?.resetFields();
  formData.value = {};
  dialogVisible.value = false;
};

// 新增
const onSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    console.log("error");
    return;
  }
  loading.value = true;
  let promise;
  if (formData.value?.id) {
    promise = AdminUserService.update(formData.value.id, formData.value);
  } else {
    promise = AdminUserService.create(formData.value);
  }
  await promise
    .then(async ({ code, message }) => {
      if (code === 200) {
        emit("on-success");
        onCancel();
        return;
      }
      await VxeUI.modal.message({ content: message, status: "error" });
    })
    .finally(() => (loading.value = false));
};

const getRoleAndAllPermissions = async () => {
  loading.value = true;
  const promises = [RoleService.index({ per_page: 1000 }).then((response: TypeResponse) => (state.allRoles = response.data.data))];
  Promise.all(promises).finally(() => (loading.value = false));
};

// 页面加载时
onMounted(() => {
  getRoleAndAllPermissions();
});

const { allRoles } = toRefs(state);

defineExpose({ openDialog });
</script>
