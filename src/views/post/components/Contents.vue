<template>
  <div>
    <span style="position: absolute; right: 0; top: 1px; z-index: 999">
      <el-button icon="Plus" @click="addTab">添加一行</el-button>
    </span>
    <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-remove="removeTab">
      <el-tab-pane v-for="(content, index) in formData" :key="index" :label="content.title" :name="content.title">
        <Editor v-model="content.body" height="350" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { TabPaneName } from "element-plus";
import { defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";

const Editor = defineAsyncComponent(() => import("@/components/WangEditor/index.vue"));

interface ContentInterface {
  id?: number | null;
  title: string;
  body: string;
  order?: number;
}

const props = defineProps({
  modelValue: {
    type: [Array],
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const formData = reactive<Array<ContentInterface>>([{ title: "默认标题", body: "New Tab content" }]);

let tabIndex = 1;
const editableTabsValue = ref("默认标题");
watch(
  () => props.modelValue,
  () => {
    Object.assign(formData, props.modelValue);
  },
  { deep: true, immediate: true }
);

watch(
  () => formData,
  (newValue, oldValue) => {
    emit("update:modelValue", newValue);
  },
  { deep: true, immediate: true }
);

onMounted(async () => {});

const addTab = () => {
  const newTabTitle = "默认标题" + ` ${++tabIndex}`;
  console.log(newTabTitle);
  formData.push({ title: newTabTitle, body: "<p>New Tab content</p>" });
  editableTabsValue.value = newTabTitle;
};

const removeTab = (paneName: TabPaneName | undefined) => {
  const tabs = formData;
  let activeName = editableTabsValue.value;
  if (activeName === paneName) {
    tabs.forEach((tab, index) => {
      if (tab.title === paneName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.title;
        }
      }
    });
  }
  editableTabsValue.value = activeName;
  Object.assign(
    formData,
    tabs.filter((tab) => tab.title !== paneName)
  );
};

// 内容编辑
const handleTabsEdit = (paneName: TabPaneName | undefined, action: "remove" | "add") => {
  if (action === "add") {
    addTab();
  } else if (action === "remove") {
    removeTab(paneName);
  }
};
</script>

<style scoped lang="scss">
.demo-tabs {
  width: 100%;

  :deep(.el-tabs__header) {
    margin-bottom: -1px;
  }

  .el-tabs__new-tab {
  }
}
</style>
