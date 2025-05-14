<template>
  <div class="wrapper">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="main">
          <template #header>
            <div class="card-header">
              <el-form :inline="true" :model="query" class="form-inline">
                <el-form-item>
                  <el-button type="primary" @click="handleSaveAll">保存排序</el-button>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="query.title" placeholder="Please input" class="input-with-select">
                    <template #append>
                      <el-button type="primary" :icon="Search" @click="onSearch" />
                    </template>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </template>

          <el-tree ref="treeRef" v-loading="loading" node-key="id" :data="dataSource" default-expand-all draggable>
            <template #default="{ data }">
              <div class="custom-tree-node">
                <span>{{ data.title }}</span>
                <span>
                  <el-link type="primary" @click="handleEdit(data)"> 修改 </el-link>
                  <el-link type="danger" @click="handleDelete(data)"> 删除 </el-link>
                </span>
              </div>
            </template>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="main">
          <el-form ref="formRef" :model="formData" :rules="formRules" label-width="90px">
            <el-form-item prop="title" label="标题">
              <el-input v-model="formData.title" placeholder="请输入标题" clearable />
            </el-form-item>
            <el-form-item prop="subtitle" label="副标题">
              <el-input v-model="formData.subtitle" placeholder="请输入副标题" clearable />
            </el-form-item>

            <el-form-item prop="parent_id" label="上级栏目">
              <el-tree-select
                style="width: 100%"
                placeholder="请选择栏目"
                v-model="formData.parent_id"
                :data="dataSource"
                filterable
                clearable
                :check-strictly="true"
                node-key="id"
                default-expand-all
                :props="{ label: 'title', value: 'id', emitPath: false, expandTrigger: 'hover' }"
              />
            </el-form-item>
            <el-form-item prop="path" label="路径">
              <el-input v-model="formData.path" placeholder="请输入路径" clearable />
            </el-form-item>

            <el-form-item prop="description" label="描述">
              <el-input v-model="formData.description" :rows="4" type="textarea" placeholder="请输入描述" clearable />
            </el-form-item>
            <el-form-item prop="order" label="排序">
              <el-input-number v-model="formData.order" :min="0" :max="9999" placeholder="请输入排序" clearable />
            </el-form-item>

            <el-form-item prop="thumbnail" label="图片">
              <Upload v-model="formData.thumbnail" name="file" />
            </el-form-item>

            <el-form-item>
              <el-button @click="onCancel">取消</el-button>
              <el-button type="primary" @click="handleSubmit">确定</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <dialog-form ref="dialogRef"></dialog-form>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, onMounted, reactive, ref, toRefs } from "vue";
import { Search } from "@element-plus/icons-vue";
import CategoryService from "@/api/category";
import { ElMessage, ElMessageBox } from "element-plus";

// 导入包
const DialogForm = defineAsyncComponent(() => import("./form.vue"));

interface ImageInterface {
  id: any;
  title: string;
  path: string;
}

interface QueryInterface {
  created_at: Date;
  title: string;
  parent_id: number;
  updated_at: Date;
}

interface FormDataInterface {
  created_at: Date;
  id: number | null;
  title: string;
  path: string;
  subtitle: string;
  parent_id: number;
  description: string;
  thumbnail: string;
  images: Array<ImageInterface>[];
  order: number;
  updated_at: Date;
}

const treeRef = ref();
const formRef = ref();
const dialogRef = ref();

const formRules = {
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  parent_id: [{ required: true, message: "请输入标题", trigger: "blur" }],
};

const formData = reactive(<FormDataInterface>{
  order: 0,
});

const loading = ref(false);
const activeIndex = ref(0);
const dataSource = reactive(<Array<any>>[]);
const query = reactive(<QueryInterface>{});

// 搜索
const onSearch = async () => {
  await getCategoryList(query);
};

const handleClick = (node: number) => {
  activeIndex.value = node;
  Object.assign(formData, node);
};

const getCategoryList = async (params?: any) => {
  loading.value = true;
  await CategoryService.index(params)
    .then((response: TypeResponse) => {
      Object.assign(dataSource, response.data.data);
    })
    .finally(() => (loading.value = false));
};

onMounted(async () => {
  await getCategoryList();
});

// 删除
const handleDelete = async (row: any) => {
  ElMessageBox.confirm(`此操作将永久删除，是否继续?`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      loading.value = true;
      await CategoryService.delete(row.id)
        .then(async ({ code, message }: Response) => {
          ElMessage({
            type: code === 200 ? "success" : "error",
            message: message,
          });
        })
        .finally(() => (loading.value = false));
      await getCategoryList();
    })
    .catch(() => {});
};

const handleCreate = () => dialogRef.value.openDialog();

const handleEdit = (node: any) => dialogRef.value.openDialog(node);

// 新增/修改
const handleSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return;
  }
  loading.value = true;
  let promise = null;
  if (formData.id) {
    promise = CategoryService.update(formData.id, formData);
  } else {
    promise = CategoryService.create(formData);
  }

  await promise
    .then(({ code, message }: Response) => {
      ElMessage({
        type: code === 200 ? "success" : "error",
        message: message,
      });
    })
    .finally(() => {
      loading.value = false;
    });
  await getCategoryList();
};

// 取消
const onCancel = () => {
  formRef.value.resetFields();
};

// 保存全部
const handleSaveAll = async () => {
  loading.value = true;
  await CategoryService.update_all(treeRef.value.data)
    .then(({ code, message }: Response) => {
      ElMessage({
        type: code === 200 ? "success" : "error",
        message: message,
      });
    })
    .finally(() => (loading.value = false));
};
</script>

<style scoped lang="scss">
:deep(.el-tree) {
  width: 100%;

  .el-tree-node__content {
    padding: 20px;
    border-bottom: dashed 1px #ddd;
  }

  .el-tree-node__label {
    width: 100%;
  }

  .custom-tree-node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .el-link {
      padding: 0 5px;
    }
  }
}
</style>
