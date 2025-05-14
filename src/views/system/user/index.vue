<template>
  <div class="wrapper">
    <vxe-grid ref="gridRef" v-bind="gridOptions" v-on="gridEvents">
      <template #toolbarButtons>
        <ElButton v-auth="['sys.user.add']" type="success" icon="plus" @click="addEvent">新增</ElButton>
        <ElButton v-auth="['sys.user.del']" type="danger" icon="delete" :disabled="!multipleSelection?.length" @click="batchDeleteEvent">批量删除</ElButton>
      </template>

      <template #TableRowOptions="{ row }">
        <ElButton link type="primary" icon="edit" @click="editEvent(row)">编辑</ElButton>
        <ElButton link type="danger" icon="delete" v-if="!isAdministrator(row)" @click="deleteEvent(row)">删除</ElButton>
      </template>

      <template #slotRoles="{ row }">
        <el-space>
          <el-tag v-for="(value, _) in row.roles" :key="value.id">{{ value }}</el-tag>
        </el-space>
      </template>

      <template #soltAvatar="{ row }">
        <ImagePreview fit="cover" :src="row.avatar" width="60" height="60" :hide-on-click-modal="true"></ImagePreview>
      </template>
    </vxe-grid>

    <DialogForm ref="dialogRef" @on-success="reloadEvent" />
    <AssignForm ref="assignRef" @on-success="reloadEvent" />
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
import { VxeGridInstance, VxeGridListeners, VxeGridProps } from "vxe-table";
import VxeUI from "vxe-pc-ui";
import ApiService from "@/api/admin";
import { TypeResponse } from "@/types/axios";

const DialogForm = defineAsyncComponent(() => import("./form.vue"));
const AssignForm = defineAsyncComponent(() => import("./assign.vue"));

const router = useRouter();

interface RowVO {
  [key: string]: any;
}

const dialogRef = ref();
const assignRef = ref();
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
  showOverflow: true,
  pagerConfig: {},
  rowConfig: {
    height: 80,
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
      { field: "q", title: "关键词", span: 6, itemRender: { name: "$input", props: { placeholder: "请输入用户名或手号码" } } },
      {
        field: "email",
        title: "邮件",
        span: 6,
        titlePrefix: {
          useHTML: true,
          message: `点击链接：<a class="link" href="https://vxetable.cn" target="_blank">vxe-table官网</a>`,
          icon: "vxe-icon-question-circle-fill",
        },
        itemRender: { name: "$input", props: { placeholder: "请输入邮件" } },
      },
      { field: "role", title: "角色", span: 6, itemRender: { name: "$input", props: { placeholder: "请输入角色" } } },
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
    { field: "avatar", title: "头像", width: 100, align: "center", slots: { default: "soltAvatar" } },
    { field: "username", title: "昵称" },
    { title: "角色", slots: { default: "slotRoles" } },
    { field: "mobile", title: "手机号" },
    { field: "email", title: "邮箱" },
    { field: "created_at", title: "创建时间", align: "center", width: 180 },
    { field: "updated_at", title: "修改时间", align: "center", visible: false, width: 180 },
    { slots: { default: "TableRowOptions" }, title: "操作", align: "center", fixed: "right", width: 140 },
  ],
});

const gridEvents: VxeGridListeners = {
  pageChange({ pageSize }) {},
  proxyQuery() {},
};

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

// 分配权限
const assignEvent = (row: RowVO) => assignRef.value.openDialog(row);

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
const isAdministrator = (row: RowVO) => Boolean(row.username.toLowerCase() === "administrator");

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
