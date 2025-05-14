<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string;
    width?: number | string;
    height?: number | string;
    fit?: "" | "fill" | "contain" | "cover" | "none" | "scale-down";
  }>(),
  {}
);

defineOptions({
  name: "ImagePreview",
});

const width = computed(() => props.width?.toString().replace("px", "") + "px");
const height = computed(() => props.height?.toString().replace("px", "") + "px");
</script>

<template>
  <el-image :src="src" :fit="fit ? fit : 'cover'" :style="`width:${width};height:${height};`" :preview-src-list="[src]" preview-teleported>
    <template #error>
      <div class="image-slot">
        <el-icon>
          <svg-icon name="image-load-fail" />
        </el-icon>
      </div>
    </template>
  </el-image>
</template>

<style lang="scss" scoped>
.el-image {
  border-radius: 5px;
  background-color: var(--el-fill-color);
  //   box-shadow: var(--el-box-shadow-light);
  transition:
    background-color 0.3s,
    var(--el-transition-box-shadow);
  width: 100%;
  height: 100%;

  :deep(.el-image__inner) {
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }
  }

  :deep(.image-slot) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #909399;
    font-size: 30px;
  }
}
</style>
