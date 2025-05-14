<template>
  <div class="wrapper">
    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #toolbarButtons>
        <ElButton type="success" icon="plus" @click="addEvent">新增</ElButton>
        <ElButton type="danger" icon="delete" :disabled="!multipleSelection?.length" @click="batchDeleteEvent">批量删除</ElButton>
      </template>

      <template #TableRowOptions="{ row }">
        <ElButton type="primary" icon="edit" @click="editEvent(row)">编辑</ElButton>
        <ElButton type="danger" icon="delete" :disabled="isAdministrator(row)" @click="deleteEvent(row)">删除</ElButton>
      </template>

      <template #slotMethod="{ row }">
        <el-tag :key="row.method">{{ row.method }}</el-tag>
      </template>
    </vxe-grid>

    <DialogForm ref="dialogRef" @on-success="reloadEvent" />
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
import { VxeGridInstance, VxeGridProps } from "vxe-table";
import ApiService from "@/api/admin/permission";
import VxeUI from "vxe-pc-ui";
import { TypeResponse } from "@/types/axios";

const DialogForm = defineAsyncComponent(() => import("./form.vue"));

const router = useRouter();

interface RowVO {
  [key: string]: any;
}

const dialogRef = ref();
const toolbarRef = ref();
const tableRef = ref();
const loading = ref(false);

// 获取选中数据
const multipleSelection = computed(() => {
  const $grid = gridRef.value;
  return $grid?.getCheckboxRecords().map((v) => v.id);
});

nextTick(() => {
  // 将表格和工具栏进行关联
  const $table = tableRef.value;
  const $toolbar = toolbarRef.value;
  if ($table && $toolbar) {
    $table.connect($toolbar);
  }
});

const gridRef = ref<VxeGridInstance<RowVO>>();
const gridOptions = reactive<VxeGridProps<RowVO>>({
  pagerConfig: {},
  rowConfig: {
    height: 100,
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
        const queryParams: any = Object.assign({ page: page.currentPage, pageSize: page.pageSize }, form);
        // 处理排序条件
        const firstSort = sorts[0];

        if (firstSort) {
          queryParams.sort = firstSort.field;
          queryParams.order = firstSort.order;
        }

        // 处理筛选条件
        filters.forEach(({ field, values }) => {
          queryParams[field] = values.join(",");
        });

        const { code, data, message } = await ApiService.index(queryParams);
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
    { field: "name", title: "名称" },
    { field: "slug", title: "标识" },
    { field: "parent.title", title: "上级栏目" },
    { field: "method", title: "请求方法", slots: { default: "slotMethod" } },
    { field: "path", title: "请求路径" },
    { field: "created_at", title: "创建时间", align: "center", width: 180 },
    { field: "updated_at", title: "修改时间", align: "center", width: 180 },
    { slots: { default: "TableRowOptions" }, title: "操作", align: "center", fixed: "right", width: 240 },
  ],
});

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

// 刷新表格数据
const reloadEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.commitProxy("reload");
  }
};

// 判断是否是超级管理员
const isAdministrator = (row: RowVO) => Boolean(row.name.toLowerCase() === "administrator");

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
