<template>
  <div class="layout-main-header">
    <el-page-header>
      <template #content>
        <span class="text-large font-600 mr-3"><h3>{{ title }}</h3></span>
      </template>
      <p class="mt-4 text-sm font-bold">
        <slot/>
      </p>
    </el-page-header>
  </div>
</template>

<script setup lang="ts">

const props = defineProps(['title'])

</script>

<style lang="scss" scoped>
.layout-main-header {
  background-color: #ffffff;
  padding: 20px;

  .mt-4 {
    margin-top: 10px;
    font-weight: bold;
    color: #333333;
  }
}
</style>