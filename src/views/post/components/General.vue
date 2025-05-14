<template>
  <div>
    <el-form-item prop="category_id" label="栏目">
      <el-cascader v-model="modelValue.category_id" :options="categoryList" placeholder="请选择栏目" :props="{ label: 'title', value: 'id', emitPath: false, expandTrigger: 'hover' }" filterable />
    </el-form-item>

    <el-form-item prop="title" label="标题">
      <el-input v-model="modelValue.title" placeholder="请输入标题" clearable style="max-width: 300px" />
    </el-form-item>

    <el-form-item prop="subtitle" label="副标题">
      <el-input v-model="modelValue.subtitle" placeholder="请输入副标题" clearable style="max-width: 500px" />
    </el-form-item>

    <el-form-item prop="description" label="描述">
      <el-input v-model="modelValue.description" :rows="4" type="textarea" placeholder="请输入描述" clearable />
    </el-form-item>

    <el-form-item prop="order" label="排序">
      <el-input-number v-model="modelValue.order" placeholder="请输入排序" clearable />
    </el-form-item>

    <el-form-item prop="thumbnail" label="缩略图">
      <Upload v-model="modelValue.thumbnail" name="file" :multiple="false" :extra="{ token: 'TKE615916022101558' }" />
    </el-form-item>

    <el-form-item prop="images" label="展示图">
      <Upload v-model="modelValue.images" name="file" :multiple="true" />
    </el-form-item>

    <el-form-item prop="contents" label="内容">
      <template #default="scope">
        <Contents v-model="modelValue.contents" />
      </template>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [Object],
    default: () => {},
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
