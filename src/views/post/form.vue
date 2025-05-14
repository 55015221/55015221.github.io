<template>
  <div class="wrapper">
    <el-card class="main">
      <el-form v-loading="loading" ref="formRef" :model="formData" :rules="formRules" label-width="120px">
        <el-tabs :model-value="'General'">
          <el-tab-pane label="基本信息" name="General">
            <el-form-item prop="title" label="标题">
              <el-input v-model="formData.title" placeholder="请输入标题" :maxlength="64" show-word-limit clearable style="width: 500px" />
            </el-form-item>

            <el-form-item prop="subtitle" label="副标题">
              <el-input v-model="formData.subtitle" placeholder="请输入副标题" :maxlength="128" show-word-limit clearable style="width: 600px" />
            </el-form-item>

            <el-form-item prop="category" label="栏目">
              <el-tree-select
                v-model="treeSelection"
                :data="dataSource"
                :props="propsTreeSelect"
                :render-after-expand="false"
                :default-expanded-keys="formData.categories?.map((item) => Object.keys(item).includes('children'))"
                :default-checked-keys="formData.categories?.map((item) => item.id)"
                check-strictly
                show-checkbox
                node-key="id"
                multiple
                filterable
                default-expand-all
                style="width: 500px"
                @change="handleSelectChange"
              >
                <template #default="{ data: { title } }"> {{ title }}</template>
              </el-tree-select>
            </el-form-item>

            <el-form-item prop="description" label="描述">
              <el-input
                v-model="formData.description"
                :autosize="{ minRows: 6, maxRows: 10 }"
                :maxlength="200"
                type="textarea"
                placeholder="请输入描述"
                show-word-limit
                style="max-width: 600px"
                clearable
              />
            </el-form-item>

            <el-form-item prop="order" label="排序">
              <el-input-number v-model="formData.order" placeholder="请输入排序" clearable />
            </el-form-item>

            <el-form-item prop="thumbnail" label="缩略图">
              <Upload v-model="formData.thumbnail" width="80" height="80" name="file" :extra="{ token: 'TKE615916022101558' }" />
            </el-form-item>

            <el-form-item prop="images" label="展示图">
              <MultipleFileUpload v-model="formData.images" :width="80" :height="80" name="file" :limit="5" />
            </el-form-item>
          </el-tab-pane>

          <!-- 属性 -->
          <el-tab-pane label="属性" name="Attributes">
            <Attributes v-model="formData.attrs" />
          </el-tab-pane>

          <!-- 规格 -->
          <el-tab-pane label="规格" name="Specifications">
            <Specifications v-model="formData.specs" />
          </el-tab-pane>

          <!-- 内容 -->
          <el-tab-pane label="内容" name="Content">
            <Editor v-model="formData.content.body" height="350" />
            <!--            <Content v-model="formData.content" />-->
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <fiexd-action-bar>
      <el-button @click="onCancel">取消</el-button>
      <el-button v-loading="loading" type="primary" @click="handleSubmit">确定</el-button>
    </fiexd-action-bar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineAsyncComponent } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import PostService from "@/api/post";
import CategoryService from "@/api/category";
import { TypeResponse } from "@/types/axios";
import { flattenTree } from "@/utils";

// 导入组件
const Specifications = defineAsyncComponent(() => import("./components/Specs.vue"));
const Attributes = defineAsyncComponent(() => import("./components/Attributes.vue"));
// const Content = defineAsyncComponent(() => import("./components/Content.vue"));
const Editor = defineAsyncComponent(() => import("@/components/WangEditor/index.vue"));

interface MetaInterface {
  title?: string;
  keyword?: string;
  description?: string;
}

interface FormDataInterface {
  id?: number;
  title?: string;
  subtitle?: string;
  description?: string;
  thumbnail?: string;
  order?: number;
  attrs?: Array<AttributeInterface>;
  specs: Array<SpecificationInterface>;
  images?: Array<FileInterface>;
  content: ContentInterface;
  categories?: Array<CategoryInterface>;
  created_at?: Date;
  updated_at?: Date;
}

const emit = defineEmits(["success"]);
const route = useRoute();
const router = useRouter();
const formRef = ref<FormInstance | null>();
const loading = ref(false);
const treeSelection = ref<number[]>([]);
// 分类数据
const dataSource = ref<Array<any>>([]);

const propsTreeSelect = {
  label: "title",
  value: "id",
  multiple: true,
  emitPath: false,
  expandTrigger: "hover",
  checkStrictly: true,
  renderAfterExpand: false,
};

// 表单验证规则
const formRules = {
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  categories: [{ required: true, message: "请选择栏目", trigger: "blur" }],
  thumbnail: [{ required: true, message: "请上传缩略图", trigger: "blur" }],
};

// 表单数据
const formData = ref<FormDataInterface>({
  thumbnail: "",
  title: "",
  subtitle: "",
  description: "",
  order: 0,
  attrs: [],
  images: [],
  content: {
    title: "",
    body: "",
  },
  specs: [],
  categories: [],
});

const handleSelectChange = (value: any) => {
  const flatArray = flattenTree(dataSource.value);
  formData.value.categories = flatArray.filter((item) => treeSelection.value.includes(item.id));
};

// 获取栏目列表
const getCategoryList = async () => {
  await CategoryService.index({ path: "product", per_page: 1000 })
    .then((response: TypeResponse) => {
      if (response.code === 200) {
        if (response.data.data.length) {
          Object.assign(dataSource.value, response.data.data);
        }
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
  await (formData.value.id ? PostService.update(formData.value.id, formData.value) : PostService.create(formData.value))
    .then((response: TypeResponse) => {
      ElMessage({
        type: response.code === 200 ? "success" : "error",
        message: response.message,
      });
      router.back();
    })
    .finally(() => (loading.value = false));
};

// 设置默认选中
const setDefaultSelection = (data: Array<CategoryInterface>) => {
  treeSelection.value = data.map((item) => item.id) as number[];
};

// 页面加载时 初始化数据
onMounted(async () => {
  const id: number = parseInt(<string>route.params?.id);
  loading.value = true;
  await getCategoryList();
  if (id) {
    await Promise.all([
      PostService.show(id)
        .then((response: TypeResponse) => {
          const data = response.data;
          Object.assign(formData.value, data);
          setDefaultSelection(data.categories);
        })
        .finally(() => (loading.value = false)),
    ]);
  }
  loading.value = false;
});
</script>

<style lang="scss"></style>
