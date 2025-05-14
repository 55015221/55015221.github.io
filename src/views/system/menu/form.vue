<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="formData.id ? '修改' : '创建'" :before-close="onCancel">
      <el-form v-loading="loading" ref="formRef" :model="formData" :rules="formRules" label-width="90px">
        <el-form-item prop="type" label="类型">
          <el-radio-group v-model="formData.type">
            <el-radio-button v-for="item in typeOptions" :key="item.value" :value="item.value">
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="parent_id" label="上级栏目">
          <el-tree-select
            ref="treeRef"
            placeholder="请选择栏目"
            v-model="formData.parent_id"
            :data="dataSource"
            :check-strictly="true"
            node-key="id"
            default-expand-all
            filterable
            clearable
            :props="defaultProps"
          />
        </el-form-item>
        <el-form-item prop="title" label="名称" v-if="!isCreateAllButton">
          <el-input v-model="formData.title" placeholder="请输入菜单名称" clearable />
        </el-form-item>
        <el-form-item v-if="formData.type === 2" prop="path" label="组件路径">
          <el-input v-model="formData.path" placeholder="请输入组件路径" clearable>
            <template #prepend>/src/views</template>
            <template #append>.vue</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="name" label="权限标识">
          <el-input v-model="formData.name" placeholder="请输入路权限标识" clearable />
        </el-form-item>
        <el-form-item prop="icon" label="图标">
          <IconSelect v-model="formData.icon" />
        </el-form-item>
        <el-form-item prop="visible" label="是否显示">
          <el-switch v-model="formData.visible" :active-value="1" :inactive-value="0" inline-prompt active-text="是" inactive-text="否" />
        </el-form-item>
        <el-form-item prop="order" label="排序">
          <el-input-number v-model="formData.order" :min="1" placeholder="请输入排序" clearable />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取 消</el-button>
          <el-button v-loading="loading" type="primary" @click="onSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import AdminMenuService from "@/api/admin/menu";
import { ElMessage, ElTree, FormInstance } from "element-plus";
import { onMounted, ref } from "vue";
import { TypeResponse } from "@/types/axios";

const typeOptions = [
  { label: "目录", value: 1 },
  { label: "菜单", value: 2 },
  { label: "按钮", value: 3 },
  { label: "链接", value: 4 },
];

const createOptions = [
  { title: "新增", name: "add" },
  { title: "删除", name: "del" },
  { title: "批量删除", name: "batch.del" },
  { title: "编辑", name: "edit" },
  { title: "导入", name: "import" },
  { title: "导出", name: "export" },
  { title: "打印", name: "print" },
];

interface ImageInterface {
  id?: any;
  filename: string;
  url: string;
}

interface RowV0 {
  created_at?: Date;
  id?: number;
  type?: number;
  parent_id?: number;
  name?: string;
  title?: string;
  path?: string;
  icon?: string;
  visible?: number;
  order?: number;
  permissions?: object;
  updated_at?: Date;
}

const emit = defineEmits(["on-success"]);

const defaultProps = { label: "title", value: "id", checkStrictly: true, emitPath: true, expandTrigger: "hover" };

const isCreateAllButton = ref(false);
const dialogVisible = ref(false);
const formRef = ref<FormInstance | null>();
const treeRef = ref<InstanceType<typeof ElTree>>();
const loading = ref(false);
const dataSource: Array<any> = [{ id: 0, title: "根目录", children: [] }];

const formData = ref<RowV0>({
  parent_id: 0,
  order: 0,
  type: 1,
  visible: 1,
});
const formRules = {
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  parent_id: [{ required: true, message: "请选择上级栏目", trigger: "blur" }],
};

const queryAllMenuList = async (params?: any) => {
  loading.value = true;
  await AdminMenuService.index(params)
    .then(({ data }: TypeResponse) => {
      dataSource.push(...data.data);
    })
    .finally(() => (loading.value = false));
};

// 监听路径变化，自动生成权限标识
watch(
  () => formData.value.path,
  (val) => {
    console.log(val);
    if (val) {
      formData.value.name = val.replace(/^\//, "").replace(/\//g, ".");
    }
  }
);

onMounted(async () => {
  await queryAllMenuList({ page: 1, pageSize: 9999 });
});

// 打开弹窗
const openDialog = async (row: any) => {
  if (row && row.id) {
    Object.assign(formData.value, row);
  }
  dialogVisible.value = true;
};

// 打开新增下级弹框
const openChildDialog = async (row: any) => {
  Object.assign(formData.value, {
    parent_id: row.id,
    name: row.name,
  });
  dialogVisible.value = true;
};

// 打开批量新增按钮弹框
const openCreateButtonDialog = async (row: any) => {
  isCreateAllButton.value = true;
  Object.assign(formData.value, {
    type: 3,
  });
  dialogVisible.value = true;
};

// 取消
const onCancel = () => {
  formRef.value?.resetFields();
  formRef.value?.clearValidate();
  formData.value = {
    parent_id: 0,
    order: 0,
    type: 1,
    visible: 1,
  };
  dialogVisible.value = false;
};

// 确定提交
const onSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return;
  }
  let promises = [];
  if (formData.value?.id) {
    promises.push(AdminMenuService.update(formData.value!.id, formData.value));
  } else {
    const temp = { ...formData.value };
    let prefix = formData.value.name;
    if (isCreateAllButton.value) {
      createOptions.forEach((item: any) => {
        temp.name = `${prefix}.${item.name}`;
        temp.title = item.title;
        promises.push(AdminMenuService.create(temp));
      });
    } else {
      promises.push(AdminMenuService.create(formData.value));
    }
  }
  await Promise.all(promises)
    .then(() => {
      emit("on-success");
      onCancel();
    })
    .finally(() => (loading.value = false));
};

defineExpose({ openDialog, openChildDialog, openCreateButtonDialog });
</script>
