<template>
  <div class="wrapper">
    <el-card class="main">
      <template #header>
        <vxe-toolbar ref="toolbarRef">
          <template #buttons>
            <vxe-button content="批量删除" :disabled="!multipleSelection.length" status="danger" icon="vxe-icon-delete" @click="handleBatchDelete"></vxe-button>
          </template>
          <template #tools>
            <vxe-button status="success" icon="vxe-icon-add" @click="handleCreate">新增</vxe-button>
            <vxe-button status="warning" icon="vxe-icon-print">导出</vxe-button>
          </template>
        </vxe-toolbar>
      </template>

      <div style="overflow: hidden; width: 100%; height: 680px">
        <vxe-table
          height="auto"
          border="inner"
          keep-source
          style="width: 100%"
          ref="tableRef"
          :loading="loading"
          :row-config="{ isCurrent: true, isHover: true }"
          :column-config="{ resizable: true }"
          :data="paginate.data"
          @toggle-tree-expand="toggleExpandChangeEvent"
        >
          <vxe-column type="checkbox" width="60" align="center" />
          <vxe-column field="title" title="标题" tree-node />
          <vxe-column field="name" title="名称" />
          <vxe-column field="value" title="值" width="300">
            <template #default="{ row }">
              <div>
                <el-image v-if="row.type == 'image'" :src="row.value" fit="contain" style="height: 60px" />
                <span v-else>{{ row.value }}</span>
              </div>
            </template>
          </vxe-column>
          <vxe-column field="placeholder" title="说明" />
          <vxe-column align="center" field="created_at" sortable title="创建时间" width="170" />
          <vxe-column align="center" width="168" title="操作" fixed="right">
            <template #default="scope">
              <el-button type="primary" @click="handleEdit(scope.row)">修改</el-button>
              <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </vxe-column>
        </vxe-table>
      </div>

      <vxe-pager
        background
        v-model:current-page="paginate.current_page"
        v-model:page-size="paginate.per_page"
        :total="paginate.total"
        :layouts="['Total', 'Sizes', 'PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump']"
      ></vxe-pager>
    </el-card>

    <dialog-form ref="dialogForm" @success="handleFormSuccess" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watchEffect } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import TagService from "@/api/tag";
import { useRouter } from "vue-router";
import { VXETable, VxeTableInstance } from "vxe-table";
import DialogForm from "./form.vue";
import { TableDataRow } from "@/types/axios";

interface QueryInterface {
  created_at: Date;
  title: string;
  category_id: number;
  updated_at: Date;
  page: number;
}

interface TableRow {
  created_at: Date;
  id: number;
  title: string;
  name: string;
  placeholder: string;
  order: number;
  updated_at: Date;
  children: TableRow[];
}

interface TableData {
  current_page: number;
  data: Array<TableDataRow>;
  per_page: number;
  total: number;
}

const tableRef = ref<VxeTableInstance<TableRow>>();
const router = useRouter();
const dialogForm = ref();
const state = reactive({
  loading: true,
  multipleSelection: [],
  paginate: <TypePaginate>{},
  query: <QueryInterface>{},
});

// 展开
const toggleExpandChangeEvent = (params: any) => {
  const $table = tableRef.value;
  if ($table) {
    const { row, expanded } = params;
    console.log("节点展开事件", expanded, "获取父节点：", $table.getParentRow(row));
  }
};

// 初始化表格数据
const onSearch = async (params?: any) => {
  state.loading = true;
  await TagService.index(params)
    .then((response: TypeResponse) => {
      Object.assign(state.paginate, response.data);
    })
    .finally(() => {
      state.loading = false;
    });
};

// 页面加载时
watchEffect(async () => {
  await onSearch(state.query);
});

// 打开新增用户弹窗
const handleCreate = () => dialogForm.value.openDialog({});

// 打开修改用户弹窗
const handleEdit = (row: TableDataRow) => dialogForm.value.openDialog(row);

const handleEditValue = (row: TableDataRow) =>
  router.push({
    path: "value",
    query: { specification_id: row.id },
  });

// 删除
const handleDelete = (row: TableDataRow) => {
  ElMessageBox.confirm(`此操作将永久删除，是否继续?`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await TagService.delete(row.id).then((response: TypeResponse) => {
        ElMessage({ type: response.code === 200 ? "success" : "error", message: response.message });
      });
      await onSearch();
    })
    .catch(() => {});
};

//批量删除
const handleBatchDelete = (val: any) => {
  ElMessage.success(val + "删除成功");
};

// 表格选择行
const handleSelectionChange = (val: any) => (state.multipleSelection = val);

// 分页改变
const handleCurrentChange = (val: number) => (state.query.page = val);

const onSearchReset = () => (state.query = <QueryInterface>{});

const handleFormSuccess = async () => {
  await onSearch(state.query);
};

const { loading, multipleSelection, query, paginate } = toRefs(state);
</script>
