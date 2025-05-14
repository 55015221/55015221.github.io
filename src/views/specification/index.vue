<template>
  <div class="wrapper">
    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #toolbarButtons>
        <ElButton type="success" icon="plus" @click="addEvent">新增</ElButton>
        <ElButton type="danger" icon="delete" :disabled="!multipleSelection?.length" @click="batchDeleteEvent">批量删除</ElButton>
      </template>

      <template #titleSlot="{ row }">
        <div :style="{ whiteSpace: 'normal', wordWrap: 'break-word' }">
          {{ row.title }}
          <p>{{ row.subtitle }}</p>
        </div>
      </template>

      <template #iconSlot="{ row }">
        <Icon v-if="row?.icon" :name="row.icon" />
      </template>

      <template #valuesSlot="{ row }">
        <div :style="{ whiteSpace: 'normal', wordWrap: 'break-word' }">
          <el-tag v-for="value in row.values" :key="value.value" style="margin: 3px">{{ value.title }}</el-tag>
        </div>
      </template>

      <template #TableRowOptions="{ row }">
        <ElButton link type="warning" icon="edit" @click="createEvent(row)">添加规格值</ElButton>
        <ElButton link type="primary" icon="edit" @click="editEvent(row)">编辑</ElButton>
        <ElButton link type="danger" icon="delete" @click="deleteEvent(row)">删除</ElButton>
      </template>
    </vxe-grid>

    <DialogForm ref="dialogRef" @on-success="reloadEvent" />
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
import { VxeGridInstance, VxeGridProps } from "vxe-table";
import ApiService from "@/api/specification";
import VxeUI from "vxe-pc-ui";
import { TypeResponse } from "@/types/axios";

const DialogForm = defineAsyncComponent(() => import("./form.vue"));

const router = useRouter();

interface RowVO {
  [key: string]: any;

  images: string[];
  children?: RowVO[];
}

const dialogRef = ref();
const loading = ref(false);

const gridRef = ref<VxeGridInstance<RowVO>>();
const gridOptions = reactive<VxeGridProps<RowVO>>({
  pagerConfig: {},
  rowConfig: {
    isHover: true,
  },
  columnConfig: {
    resizable: true,
  },
  editConfig: {
    trigger: "click",
    mode: "row",
    showStatus: true,
  },
  formConfig: {
    titleWidth: 80,
    titleAlign: "right",
    items: [
      { field: "q", title: "关键词", span: 6, itemRender: { name: "$input", props: { placeholder: "请输入关键词" } } },
      {
        span: 6,
        align: "left",
        collapseNode: false,
        itemRender: {
          name: "$buttons",
          children: [{ props: { type: "submit", content: "查询", status: "primary" } }, { props: { type: "reset", content: "重置" } }],
        },
      },
    ],
  },
  toolbarConfig: { slots: { buttons: "toolbarButtons" } },
  printConfig: {
    columns: [{ field: "name" }, { field: "email" }, { field: "username" }, { field: "mobile" }],
  },
  importConfig: {},
  proxyConfig: {
    // 只接收Promise，具体实现自由发挥
    ajax: {
      // 当点击工具栏查询按钮或者手动提交指令 query或reload 时会被触发
      query: async ({ page, sorts, filters, form }) => {
        return await loadData(page, sorts, filters, form);
      },
      // 当点击工具栏删除按钮或者手动提交指令 delete 时会被触发
      delete: async ({ body }) => {
        // return await ApiService.update()
      },
      // 当点击工具栏保存按钮或者手动提交指令 save 时会被触发
      save: async ({ body }) => {
        console.log(body);
        // return await ApiService.update()
      },
    },
  },
  columns: [
    { type: "checkbox", align: "center", width: 60 },
    { type: "seq", title: "ID", align: "center", width: 80 },
    { field: "title", title: "名称", slots: { default: "titleSlot" } },
    { field: "description", title: "描述", visible: false },
    { field: "icon", title: "图标", visible: false, align: "center", slots: { default: "iconSlot" } },
    { field: "values", title: "属性值", minWidth: 300, slots: { default: "valuesSlot" } },
    {
      field: "order",
      title: "排序",
      align: "center",
      sortable: true,
      width: 120,
      editRender: { name: "$input", props: { type: "int", digits: 2, placeholder: "请输入数值" } },
    },
    { field: "created_at", title: "创建时间", align: "center", visible: false, width: 180 },
    { field: "updated_at", title: "修改时间", align: "center", width: 180 },
    { slots: { default: "TableRowOptions" }, title: "操作", align: "center", fixed: "right", width: 250 },
  ],
});

const loadData = async (page?: any, sorts?: any, filters?: any, form?: any) => {
  gridOptions.loading = true;
  const query: any = { page: page.currentPage, pageSize: page.pageSize, ...form };
  // 处理排序条件
  if (sorts) {
    const firstSort = sorts[0];
    if (firstSort) {
      query.sort = firstSort.field;
      query.order = firstSort.order;

      // 处理筛选条件
      filters.forEach(({ field, values }) => {
        query[field] = values.join(",");
      });
    }
  }

  try {
    const { code, data, message } = await ApiService.index(query);
    if (code !== 200) {
      await VxeUI.modal.message({ content: message, status: "error" });
      return;
    }
    return {
      page: {
        currentPage: data.current_page,
        pageSize: data.per_page,
        total: data.total,
      },
      result: data.data,
    };
  } catch (error) {
    await VxeUI.modal.message({ content: error?.message || "操作失败", status: "error" });
  } finally {
    gridOptions.loading = false;
  }
};

// 获取选中数据
const multipleSelection = computed(() => {
  const $grid = gridRef.value;
  return $grid?.getCheckboxRecords().map((v) => v.id);
});

nextTick(() => {});

// 批量删除
const batchDeleteEvent = async () => {
  if (!multipleSelection.value?.length) return;

  const type = await VxeUI.modal.confirm({
    content: "此操作将永久删除，是否继续?",
  });
  if (type !== "confirm") {
    await VxeUI.modal.message({ content: "操作已取消", status: "warning" });
    return;
  }

  loading.value = true;
  await ApiService.delete_all(multipleSelection.value)
    .then(async (response: TypeResponse) => {
      await VxeUI.modal.message({ content: response.message, status: response.code === 200 ? "success" : "error" });
    })
    .finally(() => (loading.value = false));
};

onMounted(async () => {});

// 新增
const addEvent = () => dialogRef.value.openDialog();

// 编辑
const editEvent = (row: RowVO) => dialogRef.value.openDialog(row);

// 添加规格值
const createEvent = (row: RowVO) => dialogRef.value.openValueDialog(row);

// 刷新表格数据
const reloadEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.commitProxy("reload");
  }
};

// 删除
const deleteEvent = async (row: RowVO) => {
  const type = await VxeUI.modal.confirm({
    content: "此操作将永久删除，是否继续?",
  });
  if (type !== "confirm") {
    await VxeUI.modal.message({ content: "操作已取消", status: "warning" });
    return;
  }
  loading.value = true;
  await ApiService.delete(row.id)
    .then(async (response: TypeResponse) => {
      await VxeUI.modal.message({ content: response.message, status: response.code === 200 ? "success" : "error" });
    })
    .finally(() => (loading.value = false));
};
</script>

<style lang="scss" scoped></style>
