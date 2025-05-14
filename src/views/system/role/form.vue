<template>
  <el-dialog v-model="dialogVisible" :title="formData.id ? '修改' : '创建'" :before-close="onCancel">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-position="right" label-width="90px">
      <el-form-item prop="title" label="名称">
        <el-input v-model="formData.title" placeholder="请输入名称" clearable></el-input>
      </el-form-item>
      <el-form-item prop="name" label="标识">
        <el-input v-model="formData.name" placeholder="请输入标识" clearable></el-input>
      </el-form-item>
      <ElButton type="primary" icon="expand" @click="expandAllTreeEvent">{{ isExpandAll ? "全部收缩" : "全部展开" }}</ElButton>
      <el-form-item label="权限">
        <el-tree
          ref="treeRef"
          :data="allPermissions"
          show-checkbox
          node-key="name"
          :default-expand-all="isExpandAll"
          :default-checked-keys="formData.permissions"
          :props="{ children: 'children', label: 'title', class: treeNodeClass }"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button v-loading="loading" type="primary" @click="onSubmit">{{ formData.id ? "修改" : "创建" }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import RoleService from "@/api/admin/role";
import { ElMessage, ElTree, FormInstance } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";
import AdminMenuService from "@/api/admin/menu";

interface FormDataInterface {
  created_at?: Date;
  id?: number;
  parent_id?: number;
  name?: string;
  title?: string;
  permissions?: Array<any>;
  updated_at?: Date;
}

const emit = defineEmits<{
  (event: "on-success"): void;
}>();

const loading = ref(false);
const dialogVisible = ref(false);
const formRef = ref<FormInstance | null>();
const formData = ref<FormDataInterface>({});
const allPermissions = ref([]);
const treeRef = ref<InstanceType<typeof ElTree>>();
const isExpandAll = ref(true);

const formRules = {
  title: [{ required: true, message: "请输入名称", trigger: "blur" }],
  name: [{ required: true, message: "请输入标识", trigger: "blur" }],
};

// 打开弹窗
const openDialog = async (row: any) => {
  await queryAllPermissions();
  if (row && row.id) {
    const { data } = await RoleService.show(row.id);
    Object.assign(formData.value, data);
  }
  nextTick(() => {
    const checkedNodes = row.permissions?.map((item: string) => item.split(":")[1]) || [];
    treeRef.value!.setCheckedKeys(checkedNodes, false);
  });
  dialogVisible.value = true;
};

// 获取权限列表
const queryAllPermissions = async () => {
  await AdminMenuService.index({ page: 1, pageSize: 9999 }).then((response) => {
    allPermissions.value = response.data.data;
  });
};

// 展开所有树
const expandAllTreeEvent = () => {
  const tree = treeRef.value;
};

// 取消
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
    return;
  }

  formData.value.permissions = treeRef.value!.getCheckedNodes(false, false);
  loading.value = true;
  let promise = null;
  if (formData.value.id) {
    promise = RoleService.update(formData.value.id, formData.value);
  } else {
    promise = RoleService.create(formData.value);
  }
  await promise
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

const treeNodeClass = (data: any, node: Node) => {
  if (node.isLeaf) return "";
  let addClass = true;
  for (const key in node.childNodes) {
    if (!node.childNodes[key].isLeaf) {
      addClass = false;
    }
  }
  return addClass ? "penultimate-node" : "";
};

// 页面加载时
onMounted(() => {});

defineExpose({ openDialog });
</script>

<style scoped lang="scss">
:deep(.penultimate-node) {
  .el-tree-node__children {
    padding-left: 60px;
    white-space: pre-wrap;
    line-height: 12px;

    .el-tree-node {
      display: inline-block;
    }

    .el-tree-node__content {
      padding-left: 5px !important;
      padding-right: 5px;

      .el-tree-node__expand-icon {
        display: none;
      }
    }
  }
}
</style>
