<template>
  <el-dialog v-model="dialogVisible" :title="formData.id ? '修改' : '创建'" :before-close="onCancel">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-position="right" label-width="120px">
      <el-form-item prop="title" label="名称">
        <el-input v-model="formData.title" placeholder="请输入名称" clearable style="width: 300px" />
      </el-form-item>
      <el-form-item prop="subtitle" label="副标题">
        <el-input v-model="formData.subtitle" placeholder="请输入名称" clearable style="width: 500px" />
      </el-form-item>

      <el-form-item prop="category_id" label="上级栏目">
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

      <el-form-item prop="type" label="类型">
        <el-select v-model="formData.type">
          <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item prop="required" label="是否必填">
        <el-switch v-model="formData.required" inline-prompt active-text="是" inactive-text="否" />
      </el-form-item>

      <el-form-item prop="description" label="描述">
        <el-input type="textarea" v-model="formData.description" placeholder="请输入描述" clearable style="width: 500px" />
      </el-form-item>
      <el-form-item prop="order" label="排序">
        <el-input-number v-model="formData.order" :min="0" :max="999" placeholder="请输入排序" clearable />
      </el-form-item>

      <el-form-item props="values" label="属性值">
        <el-input type="textarea" v-model="valuesTransform" :rows="6" autocomplete="off" />
        <div class="mt-2 w-100">
          <el-alert description="一行为一个属性值，多个属性值用回车换行隔开" type="info" show-icon :closable="false" />
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
import { reactive, onMounted, ref, watch, computed } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import AttributeService from "@/api/attribute/index";
import { useRoute, useRouter } from "vue-router";
import CategoryService from "@/api/category";
import { Response } from "axios";
import useDictStore from "@/store/dict";

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
  category_id?: number;
  parent_id?: number;
  title?: string;
  subtitle?: string;
  type?: string;
  required?: number;
  description?: string;
  options?: string;
  values?: Array<ValueInterface>;
  order?: number;
  parent?: CategoryInterface;
  updated_at: Date;
}

const emit = defineEmits<{
  (event: "on-success"): void;
}>();

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const dialogVisible = ref(false);

const valuesTransform = ref();
const formRef = ref<FormInstance | null>();
const dataSource = ref(<Array<CategoryInterface>>[{ id: 0, title: "根目录", values: [] }]);
const formData = reactive(<FormDataInterface>{
  category_id: 0,
  order: 0,
  type: "text",
});

const formRules = {
  category_id: [{ required: true, message: "请输入名称", trigger: "blur" }],
  title: [
    { required: true, message: "请输入名称", trigger: "blur" },
    { min: 2, max: 100, message: "长度在 2 到 100 个字符", trigger: "change" },
  ],
  type: [{ required: true, message: "请选择类型", trigger: "blur" }],
};

const selectOptions = useDictStore().attrTypeDict;

watch(
  () => formData.values,
  (newValue, oldValue) => {
    if (newValue) {
      valuesTransform.value = newValue.map((x) => x.title).join("\n");
    }
  }
);
watch(
  () => valuesTransform.value,
  (newValue, oldValue) => {
    if (newValue) {
      formData.values = newValue.split("\n").map((val: string) => ({ title: val }));
    }
  }
);

// 取消
const onCancel = () => {
  loading.value = false;
  formRef.value?.resetFields();
  formRef.value?.clearValidate();
  valuesTransform.value = "";
  dialogVisible.value = false;
};

// 打开弹窗
const openDialog = async (row: any) => {
  if (row && row.id) {
    Object.assign(formData, row);
  }
  dialogVisible.value = true;
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

// 页面加载时
onMounted(async () => {
  await getCategoryList({ path: "product" });

  const id = <number>(<unknown>route.params?.id);
  if (id) {
    const { data } = await AttributeService.show(id);
    Object.assign(formData.value, data);
  }
});

const getCategoryList = async (params?: any) => {
  loading.value = true;
  await CategoryService.index(params)
    .then((response: TypeResponse) => {
      dataSource.value.push(...response.data.data);
    })
    .finally(() => (loading.value = false));
};

// 确定
const onSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return;
  }

  loading.value = true;
  let promise = null;
  if (formData.value.id) {
    promise = AttributeService.update(formData.value.id, formData.value);
  } else {
    promise = AttributeService.create(formData.value);
  }

  await promise
    .then(({ code, message }: Response) => {
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
