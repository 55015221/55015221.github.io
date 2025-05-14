<template>
  <div class="editor">
    <CKEditor.component :editor="ClassicEditor" :config="editorConfig" v-model="editorData" @ready="onReady" @input="onChange"></CKEditor.component>
  </div>
</template>

<script setup lang="ts">
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";

defineOptions({
  name: "CKEditor",
});

interface Props {
  modelValue: string;
}

const props = defineProps({
  modelValue: {
    type: String,
    default: () => "",
  },
});
const emit = defineEmits(["update:modelValue"]);

const editorConfig = reactive({
  // toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
});

const editorData = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const onReady = (editor: any) => {
  console.log("CKEditor5 Vue Component is ready to use!", editor);
};

const onChange = (data) => console.log(data);
</script>

<style lang="scss" scoped>
.editor {
}
</style>
