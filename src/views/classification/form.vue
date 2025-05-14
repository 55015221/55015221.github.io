<template>
  <el-dialog v-model="dialogVisible" :title="formData.id ? '修改' : '创建'" :before-close="onCancel">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-position="right" label-width="90px">
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" placeholder="请输入标题" style="max-width: 300px" clearable />
      </el-form-item>
      <el-form-item prop="subtitle" label="副标题">
        <el-input v-model="formData.subtitle" placeholder="请输入副标题" clearable />
      </el-form-item>
      <el-form-item prop="parent_id" label="上级栏目">
        <el-tree-select
          :empty-values="[null, undefined, 0]"
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
        <icon-select v-model="formData.icon" />
      </el-form-item>

      <el-form-item prop="thumbnail" label="图片">
        <Upload v-model="formData.thumbnail" name="file" :width="100" :height="100" :data="{ token: 'TKE615916022101558' }" />
      </el-form-item>

      <el-form-item prop="images" label="展示图">
        <MultipleFileUpload v-model="formData.images" name="file" :width="200" :height="100" :limit="3" />
      </el-form-item>

      <el-form-item prop="order" label="排序">
        <el-input-number v-model="formData.order" placeholder="请输入排序" clearable />
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

<script lang="ts" setup>
import CategoryService from "@/api/category";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { TypeResponse } from "@/types/axios";

const emit = defineEmits<{
  (event: "on-success"): void;
}>();

interface RowVO {
  created_at?: Date;
  id?: number;
  parent_id?: number | null;
  title: string;
  subtitle: string;
  description?: string;
  path?: string;
  icon?: string;
  images?: Array<any>;
  thumbnail: string;
  order: number;
  updated_at?: Date;
}

const route = useRoute();
const dialogVisible = ref(false);
const formRef = ref();

const loading = ref(false);
const formData = reactive<RowVO>({
  order: 1,
  title: "",
  subtitle: "",
  description: "",
  icon: "",
  parent_id: null,
  images: [],
  thumbnail: "",
});
const dataSource = ref(<Array<CategoryInterface>>[{ id: 0, title: "根目录", children: [] }]);

const formRules = {
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
};

const openDialog = async (row?: RowVO) => {
  if (row && row.id) {
    const { data } = await CategoryService.show(row.id);
    Object.assign(formData, data);
  }
  dialogVisible.value = true;
};

const getCategoryList = async (params?: any) => {
  loading.value = true;
  await CategoryService.index(params)
    .then((response: TypeResponse) => {
      Object.assign(dataSource.value, response.data.data);
    })
    .finally(() => (loading.value = false));
};

onMounted(async () => {
  await getCategoryList({ path: "product", per_page: 1000 });
});

// 取消
const onCancel = () => {
  formRef.value?.clearValidate();
  formRef.value?.resetFields();
  dialogVisible.value = false;
};

// 保存
const onSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return;
  }
  loading.value = true;
  try {
    const response: TypeResponse = await (formData.id ? CategoryService.update(formData.id, formData) : CategoryService.create(formData));

    ElMessage({
      type: response.code === 200 ? "success" : "error",
      message: response.message,
    });
    if (response.code === 200) {
      // 通过 emit 通知父组件刷新列表
      emit("on-success");
    }

    onCancel();
  } catch (error) {
    ElMessage({
      type: "error",
      message: error?.message || "操作失败",
    });
  } finally {
    loading.value = false;
  }
};

defineExpose({ openDialog });
</script>

<style lang="scss" scoped></style>
