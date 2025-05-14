<template>
  <div class="wrapper">
    <el-card class="main">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-position="right" label-width="90px">
        <el-form-item prop="title" label="标题">
          <el-input v-model="formData.title" placeholder="请输入标题" clearable />
        </el-form-item>

        <el-form-item prop="path" label="图片">
          <template #default="scope">
            <Upload v-model="formData.path" name="file" :data="{ token: 'TKE615916022101558' }" />
          </template>
        </el-form-item>

        <el-form-item prop="order" label="排序">
          <el-input-number v-model="formData.order" placeholder="请输入排序" clearable />
        </el-form-item>

        <el-form-item>
          <el-button @click="onCancel">取 消</el-button>
          <el-button v-loading="loading" type="primary" @click="handleSubmit">修 改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import MediaService from "@/api/media";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";

interface FormDataInterface {
  created_at: Date;
  id: number;
  title: string;
  path: string;
  order: number;
  updated_at: Date;
}

const route = useRoute();
const router = useRouter();

const formRef = ref();
const formRules = {
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
};

const state = reactive({
  loading: false,
  formData: <FormDataInterface>{},
});

const initData = async () => {
  const id = route.params?.id;
  if (id) {
    const { data } = await MediaService.show(id);
    data.order = parseInt(data.order);
    state.formData = data;
  }
};

onMounted(async () => {
  await initData();
});

// 取消
const onCancel = () => router.back();

// 保存
const handleSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return;
  }
  state.loading = true;
  await MediaService.update(state.formData.id, state.formData)
    .then((response: TypeResponse) => {
      ElMessage({
        type: response.code === 200 ? "success" : "error",
        message: response.message,
      });
      onCancel();
    })
    .finally(() => (state.loading = false));
};

const { loading, formData } = toRefs(state);
</script>

<style lang="scss" scoped></style>
