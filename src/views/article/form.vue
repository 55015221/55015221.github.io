<template>
  <div class="layout-padding">
    <el-card shadow="hover" class="layout-padding-auto">
      <el-form v-loading="loading" ref="formRef" :model="formData" :rules="formRules" label-position="right" label-width="120px">
        <el-form-item prop="category_id" label="栏目">
          <el-cascader
            v-model="formData.category_id"
            :options="dataSource"
            placeholder="请选择栏目"
            :props="{
              label: 'title',
              value: 'id',
              emitPath: false,
              expandTrigger: 'hover',
            }"
            filterable
          />
        </el-form-item>

        <el-form-item prop="title" label="标题">
          <el-input v-model="formData.title" placeholder="请输入标题" :maxlength="32" show-word-limit clearable style="max-width: 300px" />
        </el-form-item>

        <el-form-item prop="subtitle" label="副标题">
          <el-input v-model="formData.subtitle" placeholder="请输入副标题" clearable style="max-width: 500px" :maxlength="64" show-word-limit />
        </el-form-item>

        <el-form-item prop="description" label="描述">
          <el-input
            v-model="formData.description"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            placeholder="请输入描述"
            :maxlength="200"
            show-word-limit
            style="max-width: 800px"
            clearable
          />
        </el-form-item>

        <el-form-item prop="order" label="排序">
          <el-input-number v-model="formData.order" placeholder="请输入排序" clearable />
        </el-form-item>

        <el-form-item prop="thumbnail" label="缩略图">
          <Upload v-model="formData.thumbnail" name="file" :extra="{ token: 'TKE615916022101558' }" />
        </el-form-item>

        <el-form-item prop="images" label="展示图">
          <Upload v-model="formData.images" name="file" :limit="5" />
        </el-form-item>
        <!-- 内容 -->
        <el-form-item prop="contents" label="内容">
          <Contents v-model="formData.contents" />
        </el-form-item>

        <fiexd-action-bar>
          <el-form-item>
            <el-button @click="onCancel">取消</el-button>
            <el-button v-loading="loading" type="primary" @click="handleSubmit">确定</el-button>
          </el-form-item>
        </fiexd-action-bar>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, defineAsyncComponent } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import ArticleService from "@/api/article";
import CategoryService from "@/api/category";

const Contents = defineAsyncComponent(() => import("@/views/post/components/Contents.vue"));

interface ContentInterface {
  id: any;
  title: string;
  content: string;
}

interface ImageInterface {
  id: any;
  title: string;
  path: string;
}

interface FormDataInterface {
  created_at: Date;
  id: number;
  title: string;
  subtitle: string;
  category_id: number;
  description: string;
  thumbnail: string;
  specifications: Array<any>[];
  attributes: Array<any>[];
  images: Array<ImageInterface>[];
  order: number;
  specs: Array<any>[];
  contents: Array<ContentInterface>[];
  updated_at: Date;
}

const emit = defineEmits(["success"]);

const route = useRoute();
const router = useRouter();
const formRef = ref<FormInstance | null>();

// 表单验证规则
const formRules = {
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  category_id: [{ required: true, message: "请选择栏目", trigger: "blur" }],
  thumbnail: [{ required: true, message: "请上传缩略图", trigger: "blur" }],
};

// 分类数据
const dataSource = ref<Array<any>>([]);

// 表单数据
const formData = reactive(<FormDataInterface>{
  order: 0,
});
const loading = ref(false);

// 获取栏目列表
const getCategoryList = async () => {
  await CategoryService.index({ per_page: 1000 })
    .then((response: TypeResponse) => {
      if (response.code === 200) {
        Object.assign(dataSource.value, response.data.data);
      }
    })
    .finally(() => {});
};

// 取消
const onCancel = () => router.back();

// 新增
const handleSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return;
  }
  loading.value = true;

  let promise = null;
  if (formData.id) {
    promise = ArticleService.update(formData.id, formData);
  } else {
    promise = ArticleService.create(formData);
  }
  await promise
    .then((response: TypeResponse) => {
      ElMessage({
        type: response.code === 200 ? "success" : "error",
        message: response.message,
      });
      router.push({ name: "article.index" });
    })
    .finally(() => (loading.value = false));
};

// 页面加载时 初始化数据
onMounted(async () => {
  const id: number = route.params?.id;
  loading.value = true;
  if (id) {
    const { data } = await ArticleService.show(id);
    Object.assign(formData, data);
  }
  await getCategoryList();
  loading.value = false;
});
</script>

<style lang="scss"></style>
