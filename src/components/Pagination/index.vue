<template>
    <div class="layout-pagination">
        <el-pagination
            v-model:current-page="query.page"
            v-model:page-size="query.per_page"
            :pager-count="5"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :total="paginate.total"
            layout="total, sizes, prev, pager, next, jumper"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        >
        </el-pagination>
    </div>
</template>

<script setup lang="ts">
import {computed, reactive, toRef, toRefs} from 'vue';


type QueryType = {
    page?: number;
    per_page?: number;
}

type PropType = {
    modelValue?: QueryType;
    paginate?: { total?: number };
}

const props = withDefaults(defineProps<PropType>(), {
    modelValue: () => ({
        page: 1,
        per_page: 20
    }),
    paginate: ()=>({
        total: 0
    })
})

const emit = defineEmits(['update:modelValue']);

type Paginate = {
    current_page: number; // 当前页
    per_page: number; // 分页行数
    total: number; // 总行数
    layout?: string; // 展示模板
}

const query = computed(() => props.modelValue)

// 切换条数
const handleSizeChange = (value) => {
    query.value.per_page = value
    emit('update:modelValue', query);
};

// 切换分页
const handleCurrentChange = (value) => {
    query.value.page = value
    emit('update:modelValue', query);
};


</script>

<style lang="scss" scoped>
.layout-pagination {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
