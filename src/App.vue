<script setup lang="ts">
import {ref} from "vue";

const isWatermark = ref(true);

defineOptions({
  name: "App",
});
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style lang="scss" scoped></style>
