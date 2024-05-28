<template>
  <footer>
    <a-result :status="null" title="This is title content" subtitle="This is subtitle content">
      <template #extra>
        <a-space>
          <a-button type="secondary">Again</a-button>
          <a-button type="primary">Back</a-button>
        </a-space>
      </template>
    </a-result>
  </footer>
</template>
<script setup lang="ts">
</script>
