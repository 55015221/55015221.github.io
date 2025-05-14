<script setup lang="ts">
import { ElMessage, ElNotification, genFileId, UploadFile, UploadInstance, UploadProps, UploadRawFile, UploadRequestOptions } from "element-plus";
import { computed, onMounted, reactive, ref, watch } from "vue";
import Draggable from "vuedraggable";
import { uploadApi } from "@/api/upload";

defineOptions({
  name: "Upload",
});

/* FileType */
declare namespace File {
  type ImageMimeType = "image/apng" | "image/bmp" | "image/gif" | "image/jpeg" | "image/pjpeg" | "image/png" | "image/svg+xml" | "image/tiff" | "image/webp" | "image/x-icon";

  type ExcelMimeType = "application/vnd.ms-excel" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
}

interface UploadFileProps {
  name?: string;
  modelValue?: FileInterface[] | string; // 图片 可以是数组也可以是字符串
  action?: (params: any) => Promise<any>; // 上传图片的 action 方法，一般项目上传都是同一个 api 方法，在组件里直接引入即可 ==> 非必传
  disabled?: boolean; // 是否禁用上传组件 ==> 非必传（默认为 false）
  limit?: number; // 最大图片上传数 ==> 非必传（默认为 5张）
  size?: number; // 图片大小限制 ==> 非必传（默认为 5M）
  accept?: File.ImageMimeType[]; // 图片类型限制 ==> 非必传（默认为 ["image/jpeg", "image/png", "image/gif"]）
  height?: number; // 组件高度 ==> 非必传（默认为 150px）
  width?: number; // 组件宽度 ==> 非必传（默认为 150px）
}

// 文件服务域名
const props = withDefaults(defineProps<UploadFileProps>(), {
  name: "file",
  modelValue: () => "",
  limit: 1,
  size: 5,
  accept: () => ["image/jpeg", "image/png", "image/gif"],
  height: 100,
  width: 100,
});

const emit = defineEmits(["update:modelValue", "on-success"]);

const uploadRef = ref<UploadInstance>();
const viewerVisible = ref(false);
const imageViewerIndex = ref(0);

const progress = reactive({
  preview: "",
  percent: 0,
});

// 拖拽配置
const dragOptions = {
  animation: 1000, // 拖拽动画
  group: "description", // 拖拽分组
  disabled: false, // 是否禁用拖拽
  ghostClass: "ghost", // 拖拽时的ghost class
};

//是否批量上传
const multiple = computed(() => props.limit > 1);
//文件列表
const fileList = reactive(<Array<FileInterface>>[]);

onMounted(() => {});

watch(
  () => props.modelValue,
  (newValue: any, oldValue) => {
    if (newValue) {
      if (!(multiple.value && newValue instanceof Array)) {
        newValue = [{ filename: newValue, url: newValue }];
      }
      Object.assign(fileList, newValue);
    }
  },
  { immediate: true }
);

//当超出限制时，执行的钩子函数
const onExceed: UploadProps["onExceed"] = (files: File[]) => {
  if (files.length > props.limit) {
    ElMessage.error(`超出上传数量限制, 限 ${props.limit} 张!`);
    return;
  }
  uploadRef.value?.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadRef.value?.handleStart(file);
};

// 预览
const handlePreview = (file: FileInterface) => {
  imageViewerIndex.value = fileList.indexOf(file);
  viewerVisible.value = true;
};

// 关闭预览
const handlePreviewClose = () => (viewerVisible.value = false);

// 移除
const handleRemove = (file: FileInterface) => {
  fileList.splice(fileList.indexOf(file), 1);
  emit("update:modelValue", multiple.value ? fileList : "");
};
// 移动
const handleMoveLeft = (file: FileInterface) => {
  let index = fileList.indexOf(file);
  if (index !== 0) {
    fileList[index] = fileList.splice(index - 1, 1, fileList[index])[0];
  }
};
// 移动
const handleMoveRight = (file: FileInterface) => {
  let index = fileList.indexOf(file);
  if (index != fileList.length - 1) {
    fileList[index] = fileList.splice(index + 1, 1, fileList[index])[0];
  }
};

// 移动后回调
const onMoveCallback = ({ moved }: any) => {
  const { oldIndex, newIndex } = moved;
  // 判断拖拽的目标位置是否合法
  if (oldIndex === newIndex) {
    // 如果没有发生变化，直接返回
    return;
  }
  console.log(oldIndex, newIndex);
  // 获取拖拽的元素
  const item = fileList[oldIndex];
  // 从 oldIndex 移除元素
  fileList.splice(oldIndex, 1);

  // 在 newIndex 位置插入元素
  fileList.splice(newIndex, 0, item);

  console.log("文件顺序更新:", fileList, multiple.value);

  emit("update:modelValue", multiple.value ? fileList : item);
};

// 上传前检查
const beforeUpload: UploadProps["beforeUpload"] = (rawFile: UploadRawFile) => {
  let messages = [];
  // limit
  if (fileList.length > props.limit) {
    messages.push(`超出上传数量限制, 限 ${props.limit} 张!`);
  }
  // accept
  if (props.accept && props.accept?.length > 0 && !props.accept?.includes(rawFile.type as File.ImageMimeType)) {
    messages.push(`上传图片只支持 ${props.accept} 格式!`);
  }
  // size
  if (props.size && rawFile.size / 1024 / 1024 > props.size) {
    messages.push(`上传图片大小不能超过 ${props.size} MB!`);
  }
  if (messages.length) {
    ElMessage.error({ message: messages.join(), grouping: true });
    return false;
  }
  return true;
};

// 上传进度
const onProgress = (file: any) => (progress.percent = ~~file.percent);

// 上传成功回调
const onSuccess = (response: FileInterface, file: UploadFile, files) => {
  if (!response) return;

  progress.preview = "";
  progress.percent = 0;

  // fileList.push(response);

  // 等待多个请求完成在push到fileList里;
  if (files.every((item: any) => item.status == "success")) {
    files.map((item: any) => {
      if (item.response) {
        // fileList.push(item.response);
      }
    });
  }
  console.log("fileList", fileList);

  emit("update:modelValue", multiple.value ? fileList : fileList[0].url);
  uploadRef.value?.clearFiles();
};

/**
 * @description 图片上传
 * @param options upload 所有配置项
 * */
const handleUpload = async (options: UploadRequestOptions) => {
  let formData = new FormData();
  formData.append(props.name, options.file);

  try {
    const api = props.action ?? uploadApi;
    const { data } = await api(formData);

    fileList.push(data);

    options.onSuccess(data);
  } catch (error) {
    options.onError(error as any);
  }
};

/**
 * @description 图片上传错误
 * */
const onError = () => {
  ElNotification({
    title: "温馨提示",
    message: "图片上传失败，请您重新上传！",
    type: "error",
  });
};
</script>

<template>
  <div class="upload-container">
    <Draggable v-model="fileList" class="list-group" :options="dragOptions" item-key="id" :forceFallback="true" @change="onMoveCallback">
      <template #item="{ element, index }">
        <div class="images" :key="index" v-if="index <= limit">
          <el-image :src="element.url" :style="`width:${width}px;height:${height}px;`" fit="scale-down" />

          <div class="mask">
            <div class="actions">
              <span title="预览" @click="handlePreview(element)">
                <el-icon><ZoomIn /></el-icon>
              </span>
              <span title="移除" @click="handleRemove(element)">
                <el-icon><Delete /></el-icon>
              </span>
              <span title="左移" v-if="fileList.length > 1" :class="{ disabled: index === 0 }" @click="handleMoveLeft(element)">
                <el-icon><Back /></el-icon>
              </span>
              <span title="右移" v-if="fileList.length > 1" :class="{ disabled: index === fileList.length - 1 }" @click="handleMoveRight(element)">
                <el-icon><Right /></el-icon>
              </span>
            </div>
          </div>
        </div>
      </template>
    </Draggable>

    <el-upload
      ref="uploadRef"
      action="#"
      v-bind="$attrs"
      v-show="fileList.length < limit"
      :http-request="handleUpload"
      :name="props.name"
      :show-file-list="false"
      :on-progress="onProgress"
      :on-success="onSuccess"
      :on-error="onError"
      :on-exceed="onExceed"
      :multiple="multiple"
      :limit="limit"
      :before-upload="beforeUpload"
      drag
      class="images-upload"
    >
      <!-- 无内容显示 -->
      <div class="image-slot" :style="`width:${width}px;height:${height}px;`">
        <slot name="empty">
          <el-icon>
            <Plus />
          </el-icon>
        </slot>
      </div>

      <!-- 进度 -->
      <div v-show="progress.percent" class="progress" :style="`width:${width}px;height:${height}px;`">
        <el-image :src="progress.preview" :style="`width:${width};height:${height};`" fit="cover" />
        <el-progress type="circle" :width="Math.min(width, height) * 0.8" :percentage="progress.percent" />
      </div>
    </el-upload>

    <!-- 提示 -->
    <div class="el-upload__tip">
      <slot name="tip">
        <!--        <el-alert v-if="!$slots.tip" :description="`上传图片支持 ${accept} 格式,单张图片大小不超过 ${size}MB,且图片数量不超过 ${limit} 张`" type="info" show-icon :closable="false" />-->
      </slot>
    </div>

    <el-image-viewer v-if="viewerVisible" :hide-on-click-modal="true" :url-list="fileList.map((file) => file.url)" :initial-index="imageViewerIndex" @close="handlePreviewClose" />
  </div>
</template>

<style lang="scss" scoped>
.upload-container {
  line-height: initial;

  .flip-list-move {
    transition: transform 0.5s;
  }
}

.list-group {
  display: inline-block;

  .images {
    width: v-bind(width);
    height: v-bind(height);
    position: relative;
    display: inline-block;
    margin-right: 10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    overflow: hidden;
    cursor: move;

    .el-image {
      display: block;
      width: 100%;
      height: 100%;
    }

    .mask {
      opacity: 0;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(0 0 0 / 50%);
      transition: all 0.3s;

      .actions {
        width: 80%;
        height: 80%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        @include position-center(xy);

        span {
          width: 50%;
          text-align: center;
          color: #fff;
          cursor: pointer;
          transition: all 0.1s;

          &.disabled {
            color: #999;
            cursor: not-allowed;
          }

          &:hover:not(.disabled) {
            transform: scale(1.2);
          }

          .el-icon {
            font-size: 24px;
          }
        }
      }
    }

    &:hover .mask {
      opacity: 1;
      border: 1px dashed var(--el-color-primary);
    }
  }
}

.images-upload {
  display: inline-block;
  vertical-align: top;
}

:deep(.el-upload) {
  .el-upload-dragger {
    width: auto;
    height: auto;
    padding: unset;

    &.is-dragover {
      border-width: 1px;
    }

    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      color: #909399;
      background-color: transparent;

      i {
        font-size: 30px;
      }
    }

    .progress {
      position: absolute;
      top: 0;

      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgb(0 0 0 / 20%);
      }

      .el-progress {
        z-index: 1;
        //@include position-center(xy);

        .el-progress__text {
          color: #fff;
        }
      }
    }
  }
}
</style>
