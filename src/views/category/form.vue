<template>
  <el-dialog v-model="dialogVisible" :title="formData.id ? '修改' : '创建'">
    <el-form v-loading="loading" ref="formRef" :model="formData" :rules="formRules" label-width="90px">
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" placeholder="请输入标题" clearable style="width: 300px" />
      </el-form-item>
      <el-form-item prop="subtitle" label="副标题">
        <el-input v-model="formData.subtitle" placeholder="请输入副标题" clearable style="width: 500px" />
      </el-form-item>
      <el-form-item prop="parent_id" label="上级栏目">
        <el-tree-select
          placeholder="请选择栏目"
          v-model="formData.parent_id"
          :data="dataSource"
          filterable
          :check-strictly="true"
          node-key="id"
          default-expand-all
          :props="{ label: 'title', value: 'id', emitPath: false, expandTrigger: 'hover' }"
        />
      </el-form-item>
      <el-form-item prop="icon" label="图标">
        <IconSelect></IconSelect>
      </el-form-item>

      <el-form-item prop="path" label="路径">
        <el-input v-model="formData.path" placeholder="请输入路径" clearable style="width: 500px" />
      </el-form-item>

      <el-form-item prop="description" label="描述">
        <el-input v-model="formData.description" :rows="4" type="textarea" placeholder="请输入描述" clearable />
      </el-form-item>

      <el-form-item prop="thumbnail" label="图片">
        <Upload v-model="formData.thumbnail" name="file" />
      </el-form-item>

      <el-form-item prop="images" label="展示图">
        <Upload v-model="formData.images" name="file" :limit="3" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button v-loading="loading" type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import CategoryService from "@/api/category";
import { ElMessage, FormInstance } from "element-plus";
import { defineAsyncComponent, onMounted, reactive, ref, toRefs } from "vue";
import { TypeResponse } from "@/types/axios";

interface ImageInterface {
  id: any;
  title: string;
  path: string;
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
  images: Array<ImageInterface>;
  order: number;
  updated_at: Date;
}

const emit = defineEmits(["on-success"]);

const dialogVisible = ref(false);
const formRef = ref<FormInstance | null>();

const formRules = {
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  parent_id: [{ required: true, message: "请输入标题", trigger: "blur" }],
};
const formData = reactive(<FormDataInterface>{});

const state = reactive({
  loading: false,
  dialogVisible: false,
  dataSource: <Array<any>>[{ id: 0, title: "根目录", children: [] }],
});

const getCategoryList = async (params?: any) => {
  state.loading = true;
  await CategoryService.index(params)
    .then((response: TypeResponse) => {
      state.dataSource.push(...response.data.data);
    })
    .finally(() => (state.loading = false));
};

onMounted(async () => {
  await getCategoryList({ per_page: 1000 });
});

// 打开弹窗
const openDialog = async (row: any) => {
  if (row && row.id) {
    await CategoryService.show(row.id).then((response) => {
      Object.assign(formData, response.data.data);
    });
  }
  dialogVisible.value = true;
};

// 关闭弹窗
const closeDialog = () => (dialogVisible.value = false);

// 取消
const onCancel = () => closeDialog();

// 确定提交
const onSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return;
  }
  state.loading = true;
  let promise = null;
  if (formData.id) {
    promise = CategoryService.update(formData.id, formData);
  } else {
    promise = CategoryService.create(formData);
  }

  await promise
    .then(({ code, message }: Response) => {
      ElMessage({ type: code === 200 ? "success" : "error", message: message });
      if (code === 200) {
        closeDialog();
        emit("on-success");
      }
    })
    .finally(() => (state.loading = false));
};

const { loading, dataSource } = toRefs(state);

defineExpose({ openDialog });
</script>
