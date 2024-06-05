<template>
  <a-row>
    <a-col
      :xs="{ span: 22, offset: 1 }"
      :sm="{ span: 22, offset: 1 }"
      :md="{ span: 20, offset: 2 }"
      :lg="{ span: 20, offset: 2 }"
      :xl="{ span: 18, offset: 3 }"
      :xxl="{ span: 18, offset: 3 }"
    >
      <slot />
    </a-col>
  </a-row>
</template>
