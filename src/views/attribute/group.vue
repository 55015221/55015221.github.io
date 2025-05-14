<template>
  <el-dialog v-model="dialogVisible" :title="formData.id ? '修改' : '创建'">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-position="right" label-width="90px">
      <el-form-item prop="title" label="分组名称">
        <el-input v-model="formData.title" placeholder="请输入名称" clearable style="width: 300px" />
      </el-form-item>
      <el-form-item prop="subtitle" label="副标题">
        <el-input v-model="formData.subtitle" placeholder="请输入名称" clearable style="width: 500px" />
      </el-form-item>

      <el-form-item prop="type" label="类型">
        <el-select v-model="formData.type">
          <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="description" label="描述">
        <el-input type="textarea" v-model="formData.description" placeholder="请输入描述" clearable />
      </el-form-item>
      <el-form-item prop="order" label="排序">
        <el-input-number v-model="formData.order" placeholder="请输入排序" clearable />
      </el-form-item>

      <el-form-item props="options" label="属性值">
        <el-input type="textarea" v-model="formData.options" :rows="6" autocomplete="off" />
        <div class="mt-2 w-100">
          <el-alert description="一行为一个属性值，多个属性值用回车换行隔开" type="info" show-icon :closable="false" />
        </div>
      </el-form-item>

      <el-form-item>
        <el-button @click="onCancel">取消</el-button>
        <el-button v-loading="loading" type="primary" @click="onConfirm">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import AttributeService from "@/api/attribute/index";
import { useRoute, useRouter } from "vue-router";

interface ParentInterface {
  id?: number;
  title?: string;
}

interface FormDataInterface {
  created_at: Date;
  id?: number;
  parent_id: number;
  title: string;
  subtitle: string;
  type: string;
  description: string;
  options: string;
  order: number;
  parent?: ParentInterface;
  updated_at: Date;
}

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const dialogVisible = ref(false);
const formRef = ref<FormInstance | null>();
const parentData = reactive([]);
const formData = reactive(<FormDataInterface>{
  type: "text",
  order: 0,
});

const formRules = {
  title: [
    { required: true, message: "请输入名称", trigger: "blur" },
    { min: 2, max: 100, message: "长度在 2 到 100 个字符", trigger: "change" },
  ],
  type: [{ required: true, message: "请选择类型", trigger: "blur" }],
};

const selectOptions = [
  { label: "文本框", value: "text" },
  { label: "单选框", value: "select" },
  { label: "多选框", value: "checkbox" },
];

// 页面加载时
onMounted(async () => {
  await getParentList();

  const id = route.params?.id;
  if (id) {
    const { data } = await AttributeService.show(id);
    Object.assign(formData, data);
  }
});

const getParentList = async () => {
  await AttributeService.index({ per_page: 1000 }).then((response: TypeResponse) => {
    Object.assign(parentData, response.data.data);
  });
};

// 取消
const onCancel = () => {
  dialogVisible.value = false;
};

// 确定
const onConfirm = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return;
  }

  loading.value = true;
  let promise = null;
  if (formData.id) {
    promise = AttributeService.update(formData.id, formData);
  } else {
    promise = AttributeService.create(formData);
  }

  await promise
    .then(({ code, message }: Response) => {
      ElMessage({ type: code === 200 ? "success" : "error", message: message });
      if (code === 200) {
        onCancel();
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const openDialog = () => (dialogVisible.value = true);

defineExpose({ openDialog });
</script>

<style lang="scss">
.mt-2 {
  margin-top: 5px;
}

.w-100 {
  width: 100%;
}
</style>
