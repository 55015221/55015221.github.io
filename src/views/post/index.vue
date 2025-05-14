<template>
  <div class="wrapper">
    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #toolbarButtons>
        <ElButton v-auth="['product.goods.add']" type="success" icon="plus" @click="addEvent">新增</ElButton>
        <ElButton v-auth="['product.goods.batch.del']" type="danger" icon="delete" :disabled="!multipleSelection?.length" @click="deleteEvent">批量删除</ElButton>
      </template>

      <template #TableRowOptions="{ row }">
        <ElButton link v-auth="['product.goods.edit']" type="primary" icon="edit" @click="editEvent(row)">编辑</ElButton>
        <ElButton link v-auth="['product.goods.del']" type="danger" icon="delete" @click="handleDeleteEvent(row)">删除</ElButton>
      </template>

      <template #slotCategories="{ row }">
        <el-space wrap>
          <el-tag v-for="value in row.categories" :key="value.id">{{ value.title }}</el-tag>
        </el-space>
      </template>

      <template #slotTitle="{ row }">
        <strong>{{ row.title }}</strong>
        <p style="margin-top: 5px">{{ row.subtitle }}</p>
      </template>

      <template #slotDescription="{ row }">
        <div :style="{ whiteSpace: 'normal', wordWrap: 'break-word' }">
          {{ row.description }}
        </div>
      </template>

      <template #slotThumbnail="{ row }">
        <ImagePreview width="60" height="60" :src="row.thumbnail" :preview-src-list="[row.thumbnail, ...row.images?.map((r: any) => r.url)]" :hide-on-click-modal="true"></ImagePreview>
      </template>

      <template #slotAttrs="{ row }">
        <el-space wrap>
          <el-tag v-for="(value, index) in row.attrs" :key="index">
            {{ `${value.title}:${value.value}` }}
          </el-tag>
        </el-space>
      </template>

      <template #slotSpecs="{ row }">
        <el-space wrap>
          <el-tag v-for="(value, index) in row.specs" :key="index">
            <span v-for="(v, i) in value.title" :key="i">{{ i }}:{{ v }}</span>
          </el-tag>
        </el-space>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { VxeColumnPropTypes, VxeGridInstance, VxeGridProps } from "vxe-table";
import PostService from "@/api/post";
import CategoryService from "@/api/category";
import VxeUI from "vxe-pc-ui";

const router = useRouter();

interface RowVO {
  [key: string]: any;
}

const categoryList = reactive([]);
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

const orderEditRender = reactive<VxeColumnPropTypes.EditRender<RowVO>>({
  name: "VxeNumberInput",
  events: {
    change(cellParams, targetParams) {
      const { row, column } = cellParams;
      console.log("age", row[column.field], cellParams);
    },
  },
});

const gridRef = ref<VxeGridInstance<RowVO>>();
const gridOptions = reactive<VxeGridProps<RowVO>>({
  pagerConfig: {},
  columnConfig: {
    resizable: true,
  },
  editConfig: {
    trigger: "click",
    mode: "cell",
    showStatus: true,
  },
  formConfig: {
    titleWidth: 100,
    titleAlign: "right",
    items: [
      { field: "title", title: "标题/副标题", align: "left", span: 6, itemRender: { name: "$input", props: { placeholder: "请输入名称" } } },
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
      { field: "category", title: "所属栏目", span: 6, itemRender: { name: "$select", options: [] } },
      { field: "attrs", title: "属性", span: 6, itemRender: { name: "$input", props: { placeholder: "请输入昵称" } } },
      { field: "role", title: "角色", span: 6, folding: true, itemRender: { name: "$input", props: { placeholder: "请输入角色" } } },
      { field: "sex", title: "性别", span: 6, folding: true, titleSuffix: { message: "注意，必填信息！", icon: "vxe-icon-question-circle-fill" }, itemRender: { name: "$select", options: [] } },
      { field: "age", title: "年龄", span: 6, folding: true, itemRender: { name: "$input", props: { type: "number", min: 1, max: 120, placeholder: "请输入年龄" } } },
      {
        span: 24,
        align: "left",
        collapseNode: true,
        itemRender: {
          name: "$buttons",
          children: [
            { props: { type: "submit", content: "查询", status: "primary" } },
            {
              props: {
                type: "reset",
                content: "重置",
              },
            },
          ],
        },
      },
    ],
  },
  toolbarConfig: { slots: { buttons: "toolbarButtons" } },
  printConfig: {
    columns: [{ field: "name" }, { field: "email" }, { field: "nickname" }, { field: "age" }, { field: "amount" }],
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

        const { code, data, message } = await PostService.index(queryParams);
        if (code !== 200) {
          await VxeUI.modal.message({
            content: message,
            status: code === 200 ? "success" : "error",
          });
        }
        return {
          page: {
            currentPage: page.currentPage,
            pageSize: page.pageSize,
            total: data.total,
          },
          result: data.data,
        };
      },
      // 当点击工具栏删除按钮或者手动提交指令 delete 时会被触发
      delete: async ({ body }) => {
        console.log("delete", body);
        // return await PostService.update()
      },
      // 当点击工具栏保存按钮或者手动提交指令 save 时会被触发
      save: async ({ body }) => {
        console.log("save", body);
        // return await PostService.update()
      },
    },
  },
  columns: [
    { type: "checkbox", align: "center", width: 60 },
    { type: "seq", title: "ID", align: "center", width: 80 },
    { field: "thumbnail", title: "图片", align: "center", width: 110, slots: { default: "slotThumbnail" } },
    { field: "title", title: "标题/副标题", width: 450, slots: { default: "slotTitle" } },
    { field: "categories", title: "所属栏目", align: "center", width: 200, slots: { default: "slotCategories" } },
    { field: "description", title: "描述", visible: false, minWidth: 100, showOverflow: true, slots: { default: "slotDescription" } },
    { field: "attrs", title: "属性", align: "center", slots: { default: "slotAttrs" } },
    { field: "specs", title: "规格", align: "center", visible: false, slots: { default: "slotSpecs" } },
    { field: "order", title: "排序", align: "center", sortable: true, width: 150, editRender: orderEditRender },
    { field: "created_at", title: "创建时间", align: "center", width: 180 },
    { field: "updated_at", title: "修改时间", align: "center", width: 180, visible: false },
    { slots: { default: "TableRowOptions" }, title: "操作", align: "center", fixed: "right", width: 140 },
  ],
});

// 批量删除
const deleteEvent = async () => {
  if (!multipleSelection.value?.length) return;

  const type = await VxeUI.modal.confirm({
    content: `此操作将永久删除${multipleSelection.value?.length}项，是否继续?`,
  });
  if (type !== "confirm") {
    await VxeUI.modal.message({ content: "操作已取消", status: "warning" });
    return;
  }
  loading.value = true;
  await PostService.deleteAll(multipleSelection)
    .then(async (response) => {
      await VxeUI.modal.message({
        content: response.message,
        status: response.code === 200 ? "success" : "error",
      });
    })
    .finally(() => (loading.value = false));
};

onMounted(async () => {
  const { data } = await CategoryService.index();
  const categoryResource = data.data.map((item: { title: any; id: any }) => {
    return {
      label: item.title,
      value: item.id,
    };
  });

  Object.assign(categoryList, categoryResource);

  const { formConfig, columns } = gridOptions;

  if (columns) {
  }
  if (formConfig && formConfig.items) {
    const categoryColumn = formConfig.items[2];
    if (categoryColumn && categoryColumn.itemRender) {
      categoryColumn.itemRender.options = categoryList;
    }
  }
});

// 新增
const addEvent = () => router.push("/product/goods/add");

// 编辑
const editEvent = (row: RowVO) => router.push(`/product/goods/edit/${row.id}`);

// 删除
const handleDeleteEvent = async (row: RowVO) => {
  const type = await VxeUI.modal.confirm({
    content: "此操作将永久删除，是否继续?",
  });
  if (type !== "confirm") {
    await VxeUI.modal.message({ content: "操作已取消", status: "warning" });
    return;
  }
  loading.value = true;
  await PostService.delete(row.id)
    .then(async (response) => {
      await VxeUI.modal.message({
        content: response.message,
        status: response.code === 200 ? "success" : "error",
      });
    })
    .finally(() => (loading.value = false));
};
</script>

<style lang="scss" scoped></style>
