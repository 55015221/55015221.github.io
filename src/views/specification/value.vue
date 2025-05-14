<template>
    <div class="main-warpper">
        <el-page-header :icon="null" title="属性值管理" />
        <el-card>
            <template #header>
                <div class="card-header">
                    <el-form :inline="true" :model="query" class="form-inline">
                        <el-form-item>
                            <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="query.title" clearable placeholder="Please input" class="input-with-select">
                                <template #append>
                                    <el-button type="primary" :icon="Search" @click="onSearch" />
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-form>

                    <div>
                        <el-button type="success" @click="handleCreate">新增</el-button>
                        <el-button type="warning" @click="handleCreate">导出</el-button>
                    </div>
                </div>
            </template>

            <el-table ref="tableRef" row-key="id" v-loading="loading" :data="paginate.data" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" align="center" width="55" />
                <el-table-column align="center" prop="id" label="ID" />
                <el-table-column prop="title" label="值" />
                <el-table-column align="center" prop="order" label="排序" />
                <el-table-column prop="description" label="描述" />
                <el-table-column align="center" width="168" prop="created_at" label="创建时间" />
                <el-table-column align="center" width="168" label="操作" fixed="right">
                    <template #default="scope">
                        <el-button type="primary" @click="handleEdit(scope.row)">修改</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <pagination :paginate="paginate" @current-change="handleCurrentChange" />
        </el-card>

        <dialog-form ref="dialogForm" @success="handleFormSuccess" />
    </div>
</template>

<script setup lang="ts">
import {
    toRefs,
    reactive,
    ref,
    watchEffect,
    onMounted,
} from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import SpecificationValueService from "@/api/specification/value";
import { useRoute, useRouter } from "vue-router";
import DialogForm from "./selection.vue";

interface TableDataRow {
    created_at: Date;
    id: number;
    specification_id: number;
    title: string;
    description: string;
    order: number;
    updated_at: Date;
}

interface TableData {
    current_page: number;
    data: Array<TableDataRow>;
    per_page: number;
    total: number;
}

const route = useRoute();
const router = useRouter();
const dialogForm = ref();

const state = reactive({
    loading: true,
    multipleSelection: [],
    paginate: {},
    query: {},
});

// 初始化表格数据
const initTableData = async (params?: any) => {
    state.loading = true;
    params.specification_id = route.query.specification_id;
    const { data } = await SpecificationValueService.index(params);
    state.paginate = data;
    state.loading = false;
};

// 页面加载时
watchEffect(async () => {
    await initTableData(state.query);
});

onMounted(async () => {});

// 打开新增用户弹窗
const handleCreate = () => dialogForm.value.openDialog();

// 打开修改用户弹窗
const handleEdit = (row: TableDataRow) => dialogForm.value.openDialog(row);

// 删除用户
const handleDelete = (row: TableDataRow) => {
    ElMessageBox.confirm(`此操作将永久删除，是否继续?`, "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            ElMessage.success("删除成功");
        })
        .catch(() => {});
};

//批量删除
const handleBatchDelete = (val: any) => {
    console.log(val);
    ElMessage.success(val + "删除成功");
};

// 表格选择行
const handleSelectionChange = (val: any) => (state.multipleSelection = val);

// 分页改变
const handleCurrentChange = (val: number) => (state.query.page = val);

const onSearchReset = () => (state.query = {});

//
const onSearch = () => {};

const handleFormSuccess = async () => {
    dialogForm.value.closeDialog();
    await initTableData(state.query);
};

const { loading, query, paginate } = toRefs(state);
</script>
