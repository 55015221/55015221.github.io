<template>
  <div class="icon-selector">
    <el-popover v-model:visible="fontIconVisible" :width="fontIconWidth" popper-class="icon-selector-popper" trigger="click">
      <template #reference>
        <el-input style="width: 240px" v-model="fontIconSearch" :placeholder="fontIconPlaceholder" :clearable="clearable" :disabled="disabled" ref="inputWidthRef">
          <template #prepend>
            <el-button :icon="fontIconPlaceholder || fontIconSearch" />
          </template>
        </el-input>
      </template>
      <transition name="el-zoom-in-top">
        <div class="icon-selector-warp">
          <div class="icon-selector-warp-row">
            <el-scrollbar ref="selectorScrollbarRef">
              <el-row v-if="fontIconSheetsFilterList.length > 0" style="gap: 6px">
                <el-col :span="2" @click="onColClick(v)" v-for="(v, k) in fontIconSheetsFilterList" :key="k">
                  <div class="icon-selector-warp-item" :class="{ 'icon-selector-active': fontIconPrefix === v }">
                    <div class="flex-margin">
                      <div class="icon-selector-warp-item-value">
                        <el-icon>
                          <component :is="v"></component>
                        </el-icon>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-empty :image-size="100" v-if="fontIconSheetsFilterList.length <= 0" :description="emptyDescription"></el-empty>
            </el-scrollbar>
          </div>
        </div>
      </transition>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, onMounted, nextTick, computed, watch, defineComponent } from "vue";
import * as icon from "@element-plus/icons-vue";

export default defineComponent({
  name: "iconSelect",
  emits: ["update:modelValue", "get", "clear"],
  props: {
    // 输入框前置内容
    prepend: {
      type: String,
      default: () => "Pointer",
    },
    // 输入框占位文本
    placeholder: {
      type: String,
      default: () => "请输入内容搜索图标或者选择图标",
    },
    // 输入框占位文本
    size: {
      type: String,
      default: () => "default",
    },
    // 弹窗标题
    title: {
      type: String,
      default: () => "请选择图标",
    },
    // icon 图标类型
    type: {
      type: String,
      default: () => "ele",
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: () => false,
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      default: () => true,
    },
    // 自定义空状态描述文字
    emptyDescription: {
      type: String,
      default: () => "无相关图标",
    },
    // 双向绑定值，字段名为固定，改了之后将不生效
    // 参考：https://v3.cn.vuejs.org/guide/migration/v-model.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5
    modelValue: String,
  },
  setup(props, { emit }) {
    const inputWidthRef = ref();
    const selectorScrollbarRef = ref();
    const state = reactive({
      fontIconPrefix: "",
      fontIconVisible: false,
      fontIconWidth: 0,
      fontIconSearch: "",
      fontIconSheetsList: [],
      fontIconPlaceholder: "Pointer",
    });
    // 处理 input 获取焦点时，modelValue 有值时，改变 input 的 placeholder 值
    const onIconFocus = () => {
      state.fontIconVisible = true;
      if (!props.modelValue) return false;
      state.fontIconSearch = "";
      state.fontIconPlaceholder = props.modelValue;
    };
    // 处理 input 失去焦点时，为空将清空 input 值，为点击选中图标时，将取原先值
    const onIconBlur = () => {
      setTimeout(() => {
        const icon = state.fontIconSheetsList.filter((icon: string) => icon === state.fontIconSearch);
        if (icon.length <= 0) state.fontIconSearch = "";
      }, 300);
    };
    // 处理 icon 双向绑定数值回显
    const initModeValueEcho = () => {
      if (props.modelValue === "") return false;
      (<string | undefined>state.fontIconPlaceholder) = props.modelValue;
      (<string | undefined>state.fontIconPrefix) = props.modelValue;
    };
    // 图标搜索及图标数据显示
    const fontIconSheetsFilterList = computed(() => {
      if (!state.fontIconSearch) return state.fontIconSheetsList;
      let search = state.fontIconSearch.trim().toLowerCase();
      return state.fontIconSheetsList.filter((item: any) => {
        if (item.toLowerCase().indexOf(search) !== -1) {
          return item;
        }
      });
    });
    // 获取 input 的宽度
    const getInputWidth = () => {
      nextTick(() => {
        state.fontIconWidth = inputWidthRef.value.$el.offsetWidth * 2;
      });
    };
    // 监听页面宽度改变
    const initResize = () => {
      window.addEventListener("resize", () => {
        getInputWidth();
      });
    };

    const initIconfont = async () => {
      return new Promise((resolve, reject) => {
        nextTick(() => {
          const icons = icon as any;
          const sheetsIconList = [];
          for (const i in icons) {
            sheetsIconList.push(icons[i].name);
          }
          if (sheetsIconList.length > 0) resolve(sheetsIconList);
          else reject("未获取到值，请刷新重试");
        });
      });
    };
    // 初始化数据
    const initFontIconData = async () => {
      state.fontIconSheetsList = [];
      await initIconfont().then((res: any) => {
        state.fontIconSheetsList = res;
      });

      // 初始化 input 的 placeholder
      // 参考（单项数据流）：https://cn.vuejs.org/v2/guide/components-props.html?#%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81
      state.fontIconPlaceholder = props.placeholder;
      // 初始化双向绑定回显
      initModeValueEcho();
      // 切换时，滚动条置顶。感兴趣可以使用 keep-alive <component :is="xxx"/> 进行缓存
      // selectorScrollbarRef.value.wrap$.scrollTop = 0;
    };

    // 获取当前点击的 icon 图标
    const onColClick = (v: any) => {
      state.fontIconPlaceholder = v;
      state.fontIconVisible = false;
      state.fontIconPrefix = v;
      emit("get", state.fontIconPrefix);
      emit("update:modelValue", state.fontIconPrefix);
    };
    // 清空当前点击的 icon 图标
    const onClearFontIcon = () => {
      state.fontIconPrefix = "";
      state.fontIconPlaceholder = "";
      state.fontIconSearch = "";
      emit("clear", state.fontIconPrefix);
      emit("update:modelValue", state.fontIconPrefix);
    };
    // 页面加载时
    onMounted(() => {
      initFontIconData();
      initResize();
      getInputWidth();
    });
    // 监听双向绑定 modelValue 的变化
    watch(
      () => props.modelValue,
      () => {
        initModeValueEcho();
      }
    );
    return {
      inputWidthRef,
      selectorScrollbarRef,
      fontIconSheetsFilterList,
      onColClick,
      onClearFontIcon,
      onIconFocus,
      onIconBlur,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
/* Popover 弹出框(图标选择器)
------------------------------- */
.icon-selector-popper {
  padding: 0 !important;

  .icon-selector-warp {
    height: 260px;
    max-width: 580px;
    overflow: hidden;

    .icon-selector-warp-title {
      height: 36px;
      line-height: 36px;
      padding: 0 15px;

      .icon-selector-warp-title-tab {
        span {
          cursor: pointer;

          &:hover {
            color: var(--el-color-primary);
            text-decoration: underline;
          }
        }

        .span-active {
          color: var(--el-color-primary);
          text-decoration: underline;
        }
      }
    }

    .icon-selector-warp-row {
      height: 250px;
      overflow: hidden;

      .el-row {
        padding: 15px;
      }

      .el-scrollbar__bar.is-horizontal {
        display: none;
      }

      .icon-selector-warp-item {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #7a7a7a;
        border-radius: 5px;
        transition: all 0.3s;
        padding: 4px;

        .icon-selector-warp-item-value {
          i {
            font-size: 20px;
            color: var(--el-text-color-regular);
          }
        }

        &:hover {
          cursor: pointer;
          background-color: var(--el-color-primary-light-9);
          border: 1px solid var(--el-color-primary-light-3);
          transform: scale(1.2);

          .icon-selector-warp-item-value {
            i {
              color: var(--el-color-primary);
            }
          }
        }
      }

      .icon-selector-active {
        background-color: var(--el-color-primary-light-9);
        border: 1px solid #b3d8ff;

        .icon-selector-warp-item-value {
          i {
            color: var(--el-color-primary);
          }
        }
      }
    }
  }
}
</style>
