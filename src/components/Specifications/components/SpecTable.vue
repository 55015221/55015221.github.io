<template>
    <el-table :data="props.modelValue" border style="width: 100%">
        <slot name="prepend" />
        <el-table-column align="center" label="图片" width="80">
            <template #default="{ row }">
                <Upload v-model="row.image" :width="50" :height="50" :tips="false" />
            </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="售价" prop="price">
            <template #default="{ row }">
                <el-input-number v-model.number="row.price" style="width:120px;" controls-position="right" :min="0" />
            </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="成本价">
            <template #default="{ row }">
                <el-input-number v-model.number="row.cost" style="width:120px;" controls-position="right" :min="0" />
            </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="库存">
            <template #default="{ row }">
                <el-input-number v-model.number="row.stock" style="width:120px;" controls-position="right" :min="0" />
            </template>
        </el-table-column>
        <!-- <el-table-column align="center" min-width="150" label="商品编号">
            <template #default="{ row }">
                <el-input v-model="row.code" style="width:120px;" />
            </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="重量(KG)">
            <template #default="{ row }">
                <el-input-number v-model.number="row.weight" style="width:120px;" controls-position="right" :min="0" />
            </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="体积(m³)">
            <template #default="{ row }">
                <el-input-number v-model.number="row.volume" style="width:120px;" controls-position="right" :min="0" />
            </template>
        </el-table-column> -->
        <slot name="append" />
    </el-table>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { PropType } from 'vue'

interface SpecificationInterface {
    id?: number;
    title: string;
    inputVisible?: boolean;
    inputValue?: string;
    values: Array<any>;
}

const props = defineProps({
    modelValue: {
        type: Array as PropType<any[]>,
        default: () => []
    }
})

</script>
<style lang="scss" scoped>
</style>
  