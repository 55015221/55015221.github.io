<template>
  <el-config-provider :size="getGlobalComponentSize" :locale="getGlobalI18n">
    <router-view v-show="setLockScreen" />
    <LockScreen v-if="themeConfig.isLockScreen" />
    <Settings ref="SettingsRef" v-show="setLockScreen" />
    <CloseFull v-if="!themeConfig.isLockScreen" />
    <Upgrade v-if="getVersion" />
    <!--		<Sponsors />-->
  </el-config-provider>
</template>

<script setup lang="ts" name="app">
import { useI18n } from "@/hooks/useI18n";
import { useTitle } from "@/hooks/useTitle";
import { storeToRefs } from "pinia";
import { useTagsViewRoutes } from "@/store/tagsViewRoutes";
import { useThemeStore } from "@/store/theme";
import { Local, Session } from "@/utils/storage";
import other from "@/utils/other";
import mittBus from "@/utils/mitt";

// 引入组件
const LockScreen = defineAsyncComponent(() => import("@/layout/lockScreen/index.vue"));
// import Settings from "@/layout/navBars/topBar/settings.vue";
const Settings = defineAsyncComponent(() => import("@/layout/navBars/topBar/settings.vue"));
const CloseFull = defineAsyncComponent(() => import("@/layout/navBars/topBar/closeFull.vue"));
const Upgrade = defineAsyncComponent(() => import("@/layout/upgrade/index.vue"));

// 定义变量内容
const { messages, locale } = useI18n();
const SettingsRef = ref();
const route = useRoute();
const stores = useTagsViewRoutes();
const themeStore = useThemeStore();
const { themeConfig } = storeToRefs(themeStore);

// 设置锁屏时组件显示隐藏
const setLockScreen = computed(() => {
  // 防止锁屏后，刷新出现不相关界面
  // https://gitee.com/lyt-top/vue-next-admin/issues/I6AF8P
  return themeConfig.value.isLockScreen ? themeConfig.value.lockScreenTime > 1 : themeConfig.value.lockScreenTime >= 0;
});
// 获取版本号
const getVersion = computed(() => {
  let isVersion = false;
  if (route.path !== "/login") {
    // @ts-ignore
    if ((Local.get("version") && Local.get("version") !== __NEXT_VERSION__) || !Local.get("version")) isVersion = true;
  }
  return isVersion;
});
// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
  return other.globalComponentSize();
});
// 获取全局 i18n
const getGlobalI18n = computed(() => {
  return messages.value[locale.value];
});
// 设置初始化，防止刷新时恢复默认
onBeforeMount(() => {});
// 页面加载时
onMounted(() => {
  nextTick(() => {
    // 监听布局配'置弹窗点击打开
    mittBus.on("openSettingsDrawer", () => {
      SettingsRef.value.openDrawer();
    });
    // 获取缓存中的布局配置
    if (Local.get("themeConfig")) {
      themeStore.setThemeConfig({ themeConfig: Local.get("themeConfig") });
      document.documentElement.style.cssText = Local.get("themeConfigStyle");
    }
    // 获取缓存中的全屏配置
    if (Session.get("isTagsViewCurrenFull")) {
      stores.setCurrenFullscreen(Session.get("isTagsViewCurrenFull"));
    }
  });
});
// 页面销毁时，关闭监听布局配置/i18n监听
onUnmounted(() => {
  mittBus.off("openSettingsDrawer", () => {});
});
// 监听路由的变化，设置网站标题
watch(
  () => route.path,
  () => {
    useTitle(route.meta.title);
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
:deep(.layout-header) {
  padding: 0 !important;
  position: sticky !important;
  top: 0 !important;
  width: 100%;
  z-index: 99;
}

:deep(.wrapper) {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  //transition: margin-left 0.3s, background-color 0.3s;

  .header {
    padding: 20px;
    background: #fff;

    p {
      margin-top: 10px;
    }
  }

  .main {
    margin: 15px;
    height: 100%;
    flex: auto;
    position: relative;
    overflow: hidden;
    transition: 0.3s;
    border: 0 solid rgba(0, 0, 0, 0.125);
    border-top: 3px solid var(--el-color-primary);
    flex: auto;
    position: relative;
    overflow: hidden;
    box-shadow:
      0 0 1px rgba(0, 0, 0, 0.125),
      0 1px 3px rgba(0, 0, 0, 0.2);
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border-radius: 0.25rem;

    .el-card__header {
      background-color: transparent;
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      padding: 0.75rem 1.25rem;
      position: relative;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
    }

    :deep(.el-card__body) {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: auto;

      .el-table {
        flex: 1;
      }
    }

    .table-header {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
