<!--
pnpm install @wangeditor/editor
pnpm install @wangeditor/editor-for-vue@next

-->

<template>
  <!--  <div class="editor" :style="toolbarStyle" :toolbarStyle="toolbarStyle">-->
  <!--    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />-->
  <!--    <Editor class="overflow-y-auto" :style="editorStyle" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />-->
  <!--  </div>-->
  <div class="editor">
    <Toolbar :style="toolbarStyle" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor :style="editorStyle" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
  </div>
</template>
<script setup lang="ts">
import { computed, CSSProperties, onBeforeUnmount, ref, shallowRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import type { IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    mode?: "default" | "simple";
    height?: string | number;
    width?: string | number;
    toolbarConfig?: Partial<IToolbarConfig>;
  }>(),
  {
    modelValue: "",
    mode: "default",
    height: "100px",
    width: "auto",
    toolbarConfig: () => ({}),
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const materialPickerRef = shallowRef<InstanceType<typeof MaterialPicker>>();
const fileType = ref("");

let insertFn: any;

const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {
    uploadImage: {
      customBrowseAndUpload(insert: any) {
        fileType.value = "image";
        materialPickerRef.value?.showPopup(-1);
        insertFn = insert;
      },
    },
    uploadVideo: {
      customBrowseAndUpload(insert: any) {
        fileType.value = "video";
        materialPickerRef.value?.showPopup(-1);
        insertFn = insert;
      },
    },
  },
};

const toolbarStyle = computed<CSSProperties>(() => ({ width: props.width !== "auto" ? `${props.width}px` : "auto" }));
const editorStyle = computed<CSSProperties>(() => ({ height: props.height !== "auto" ? `${props.height}px` : "auto" }));
const styles = computed<CSSProperties>(() => ({ height: `${props.height}px`, width: `${props.width}px` }));
const valueHtml = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const selectChange = (fileUrl: string[]) => {
  fileUrl.forEach((url) => {
    insertFn(url);
  });
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<style scoped lang="scss">
:deep(.w-e-text-container) {
  height: 350px !important;
}
:deep(.w-e-scroll) {
  height: 350px !important;
}
.editor {
  background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
  background-image: none;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  cursor: text;
  padding: 1px 11px;
  transform: translateZ(0);
  transition: var(--el-transition-box-shadow);

  .border-b {
    border-bottom: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  }
}

.overflow-y-auto {
  overflow-y: hidden;
}

.w-e-full-screen-container {
  z-index: 999;
}

.w-e-text-container [data-slate-editor] ul {
  list-style: disc;
}
.w-e-text-container [data-slate-editor] ol {
  list-style: decimal;
}
h1 {
  font-size: 2em;
}
h2 {
  font-size: 1.5em;
}
h3 {
  font-size: 1.17em;
}
h4 {
  font-size: 1em;
}
h5 {
  font-size: 0.83em;
}
h1,
h2,
h3,
h4,
h5 {
  font-weight: bold;
}
</style>
