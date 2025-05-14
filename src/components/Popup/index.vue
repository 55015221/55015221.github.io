<!-- 
useage:
<edit-popup ref="editRef" @success="getLists" />
<popup
  ref="popupRef"
  :title="popupTitle"
  width="550px"
  @confirm="handleSubmit"
  @close="handleClose"
>
</popup>

 -->
<template>
  <div class="dialog">
    <div class="dialog__trigger" @click="open">
      <!-- 触发弹窗 -->
      <slot name="trigger"></slot>
    </div>
    <el-dialog v-bind="$attrs" v-model="visible" :append-to-body="true" :close-on-click-modal="true" @closed="close">
      <!-- 弹窗内容 -->
      <template v-if="title" #header>{{ title }}</template>

      <!-- 自定义内容 -->
      <slot />
      <!-- 底部弹窗页脚 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button v-if="cancelButtonText" @click="handleCancel">
            {{ cancelButtonText }}
          </el-button>
          <el-button v-if="confirmButtonText" type="primary" @click="handleConfirm">
            {{ confirmButtonText }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { nextTick, provide, ref } from "vue";
const props = defineProps({
  title: {
    // 弹窗标题
    type: String,
    default: "",
  },
  confirmButtonText: {
    // 确认按钮内容
    type: [String, Boolean],
    default: "确定",
  },
  cancelButtonText: {
    // 取消按钮内容
    type: [String, Boolean],
    default: "取消",
  },
});

const emit = defineEmits(["confirm", "cancel"]);
const visible = ref(false);

const handleCancel = () => {
  emit("cancel");
  close();
};

const handleConfirm = () => {
  emit("confirm");
  close();
};

const close = () => {
  visible.value = false;
  nextTick(() => {
    emit("cancel");
  });
};
const open = () => (visible.value = true);

defineExpose({
  open,
  close,
});
</script>

<style scoped lang="scss">
.dialog-body {
  white-space: pre-line;
}
</style>
