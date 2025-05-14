<template>
  <el-dialog v-model="dialogVisible" :title="formData.id ? '分配权限' : '创建'" :before-close="onCancel">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-position="right" label-width="90px">
      <el-form-item prop="name" label="名称">
        <el-input v-model="formData.username" disabled placeholder="请输入标识" clearable />
      </el-form-item>
      <el-form-item label="角色">
        <el-tree ref="treeRef" :data="allRoles" show-checkbox node-key="id" default-expand-all :default-checked-keys="formData.roles" :props="defaultProps" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button v-loading="loading" type="primary" @click="onSubmit">{{ formData.id ? "确定" : "创建" }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage, ElTree, FormInstance } from "element-plus";
import AdminMenuService from "@/api/admin/menu";
import AdminUserService from "@/api/admin";

interface FormDataInterface {
  created_at?: Date;
  id: number;
  username?: string;
  roles?: string[];
  updated_at?: Date;
}

const emit = defineEmits<{
  (event: "on-success"): void;
}>();

const defaultProps = {
  children: "children",
  label: "title",
};

const loading = ref(false);
const dialogVisible = ref(false);
const formRef = ref<FormInstance | null>();
const treeRef = ref<InstanceType<typeof ElTree>>();
const allRoles = ref([]);
const formData = reactive(<FormDataInterface>{});

const formRules = {
  // name: [{ required: true, message: "请输入名称", trigger: "blur" }],
};

const queryAllRoles = async () => {
  await AdminMenuService.index({ page: 1, pageSize: 9999 }).then((response) => {
    allRoles.value = response.data.data;
  });
};

// 打开弹窗
const openDialog = async (row: any) => {
  await queryAllRoles();

  row.permissions = Array.from({ length: 100 }, (_, index) => allRoles.value[0].id + 1);
  Object.assign(formData, row);
  dialogVisible.value = true;
};

// 取消
const onCancel = () => (dialogVisible.value = false);

// 新增
const onSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return;
  }
  let checkedNodes = treeRef.value!.getCheckedNodes(true, true);
  loading.value = true;
  await AdminUserService.assign_roles(
    formData.id,
    checkedNodes.map((item) => item.id)
  )
    .then(({ code, message }) => {
      ElMessage({
        type: code === 200 ? "success" : "error",
        message: message,
      });
      if (200 === code) {
        emit("on-success");
        onCancel();
      }
    })
    .finally(() => (loading.value = false));
};

// 勾选权限
const setCheckedKeys = () => {
  treeRef.value!.setCheckedKeys([3], false);
};
// 初始化数据
const initTableData = () => {};
// 页面加载时
onMounted(() => {
  initTableData();
});

defineExpose({ openDialog });
</script>

<style lang="scss">
.is-penultimate > .el-tree-node__content {
}

.el-tree-node.is-expanded.is-penultimate > .el-tree-node__children {
  display: flex;
  flex-direction: row;
}

.is-penultimate > .el-tree-node__children > div {
  width: 25%;
}
</style>
