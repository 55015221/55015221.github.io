<template>
  <section>
    {{ modelValue }}
  </section>
</template>
<script setup lang="ts">
defineOptions({
  name: "GoodView",
});
defineProps({
  modelValue: () => {},
});
</script>
<style scoped lang="scss"></style>
