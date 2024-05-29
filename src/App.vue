<script setup lang="ts">
// import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import zhCN from "@arco-design/web-vue/es/locale/lang/zh-cn";
import dayjs from "dayjs";
import { ref } from "vue";
const isWatermark = ref(true);

defineOptions({
	name: "App",
});
</script>

<template>
	<a-config-provider size="medium" :locale="zhCN">
		<a-watermark v-if="isWatermark" :gap="[200, 200]" :alpha="0.1" :content="['55015221.github.io', dayjs().format('YYYY-MM-DD')]">
			<router-view />
		</a-watermark>
		<router-view v-else />
	</a-config-provider>
</template>

<style lang="scss" scoped></style>
