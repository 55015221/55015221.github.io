<template>
  <div class="spec-selector">
    <el-button type="primary" @click="dialogVisible = true">选择规格</el-button>
    <el-dialog v-model="dialogVisible" title="选择规格">
      <el-transfer
        v-model="selectedSpecs"
        filterable
        :titles="['选择规格/规格值', '已选']"
        filter-placeholder="请输入规格"
        :data="defaultSpecs"
        :props="{
          key: 'key',
          label: 'label',
        }"
      />
      <template #footer>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import SpecificationService from "@/api/specification";

const props = defineProps<{
  modelValue: Record<string, string>[];
}>();

const emit = defineEmits<{
  "update:modelValue": [value: Record<string, string>[]];
}>();

const dialogVisible = ref<boolean>(false);
const loading = ref<boolean>(false);

interface TransferItem {
  key: string;
  label: string;
  value: Record<string, string>;
}

const defaultSpecs = ref<TransferItem[]>([]);
const selectedSpecs = ref<string[]>([]);

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue?.length && defaultSpecs.value.length) {
      selectedSpecs.value = newValue.map((item) => JSON.stringify(item));
    }
  },
  { immediate: true }
);

// 添加对 defaultSpecs 的监听
watch(
  () => defaultSpecs.value,
  (newValue) => {
    if (newValue.length && props.modelValue?.length) {
      selectedSpecs.value = props.modelValue.map((item) => JSON.stringify(item));
    }
  }
);

const genDefaultSpecs = (data: any[]): TransferItem[] => {
  return data.flatMap((item) =>
    (item.values || []).map((r: any) => ({
      key: JSON.stringify({ [item.title]: r.title }),
      label: `${item.title}:${r.title}`,
      value: { [item.title]: r.title },
    }))
  );
};

const onSearch = async () => {
  loading.value = true;
  try {
    const { data } = await SpecificationService.index();
    defaultSpecs.value = genDefaultSpecs(data.data);
    // 初始化时设置选中值
    if (props.modelValue?.length) {
      selectedSpecs.value = props.modelValue.map((item) => JSON.stringify(item));
    }
  } catch (error) {
    console.error("Error fetching specs:", error);
  } finally {
    loading.value = false;
  }
};

const onConfirm = () => {
  dialogVisible.value = false;
  const selectedValues = selectedSpecs.value.map((key) => JSON.parse(key)).filter(Boolean);
  emit("update:modelValue", selectedValues);
};

onMounted(async () => {
  await onSearch();
});
</script>
