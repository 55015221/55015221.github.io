<template>
    <div>
        <el-table ref="tableRef" row-key="id" v-loading="loading" :data="selectionOptions" stripe style="width: 100%">
            <el-table-column prop="title" label="名称" width="120" />
            <el-table-column prop="values" label="值">
                <template #default="scope">
                    <el-checkbox-group v-model="specifications">
                        <el-checkbox :checked="specifications.indexOf(value.id) >= 0" v-for="value in scope.row.values"
                            :key="value.id" :label="value.id">
                            {{ value.title }} {{ value.id }}
                        </el-checkbox>
                    </el-checkbox-group>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from "vue";
import SpecificationService from "@/api/specification";

const emit = defineEmits(["on-confirm"]);

const props = defineProps({
    modelValue: {
        type: [Array],
        default: () => [],
    },
})

const tableRef = ref();
const dialogVisible = ref(false);

const state = reactive({
    loading: false,
    selectionOptions: [],
    specifications: [],
});

const closeDialog = () => (dialogVisible.value = false);

const onCancel = () => closeDialog();

const onConfirm = () => {
    emit("on-confirm", state.specifications);
    closeDialog();
};

onMounted(async () => {
    const { data } = await SpecificationService.index({ per_page: 1000 });
    state.selectionOptions = data.data;
});
const { loading, selectionOptions, specifications } = toRefs(state);

</script>
