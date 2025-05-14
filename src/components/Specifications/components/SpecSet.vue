<template>
	<div>
		{{ formData }}
		<el-form v-model="formData" label-position="left" label-width="120px">
			<!-- 配置规格 -->
			<el-form-item label="批量设置">
				<SpecTable v-model="tableBatchSetData">
					<template #prepend>
						<template v-for="(item, index) in tableHeader" :key="index">
							<el-table-column :label="item.label" :prop="item.prop" min-width="120" align="center" />
						</template>
					</template>
					<template #append>
						<el-table-column label="操作" fixed="right" min-width="120">
							<template #default>
								<el-link type="primary" class="px-2" @click="handleBatchSet">批量设置</el-link>
								<el-link type="primary" class="px-2" @click="handleClearBatch">清除</el-link>
							</template>
						</el-table-column>
					</template>
				</SpecTable>
			</el-form-item>

			<el-divider />

			<el-form-item label="商品规格" prop="dadada">
				<SpecTable v-model="tableData">
					<template #prepend>
						<template v-for="(item, index) in tableHeader" :key="index">
							<el-table-column :label="item.label" :prop="item.prop" min-width="120" align="center">
								<template #default="scope">
									{{ scope.row.title[item.prop] }}
								</template>
							</el-table-column>
						</template>
					</template>
					<template #append>
						<el-table-column align="center" width="80" label="操作" fixed="right">
							<template #default="{ $index }">
								<el-link type="primary" @click="handleDeleteRow($index)">删除</el-link>
							</template>
						</el-table-column>
					</template>
				</SpecTable>
			</el-form-item>
		</el-form>
	</div>
</template>
<script setup lang="ts">
import { ref, toRefs, computed, PropType, watch, onMounted, reactive } from 'vue';
import Draggable from 'vuedraggable';
import SpecTable from './SpecTable.vue';

const props = defineProps({
	modelValue: {
		type: Array as PropType<any[]>,
		default: () => [],
	},
});

const emit = defineEmits(['update:modelValue']);

// 默认SKU属性
const defaultHeader = [
	{ prop: 'image', label: '图片', value: '' },
	{ prop: 'price', label: '价格', value: 100 },
	{ prop: 'cost', label: '成本价', value: 100 },
	{ prop: 'stock', label: '库存', value: 9999 },
	{ prop: 'code', label: '编码', value: 'VPS_00000001' },
	{ prop: 'weight', label: '重量', value: 1 },
	{ prop: 'volume', label: '体积', value: 1 },
];

const formData = ref();
const tableBatchSetData = ref();

const tableHeader = ref();
const tableData = ref();

watch(
	() => props.modelValue,
	(newValue, oldValue) => {
		tableHeader.value = setTableHeader(newValue);
		tableData.value = setTableData(newValue);
	},
	{
		deep: true,
	}
);

// 设置表头
const setTableHeader = (value: any[]) => {
	let tableHeader: any = [];
	if (value.length) {
		value.map((x) => tableHeader.push({ label: x.title, prop: x.title, value: '' }));
		// 补充额外字段
		// tableHeader = tableHeader.concat(defaultHeader)
	}

	return tableHeader;
};

// 设置表数据
const setTableData = (value: any[]) => {
	console.log('更新了表数据', value);
	let tableData: any = handleSpecificationConGenerate(value);
	if (tableData.length) {
		let firstRow = JSON.parse(JSON.stringify(tableData[0]));
		tableBatchSetData.value = [firstRow];
	}

	return tableData;
};

// 生成table数据
const handleSpecificationConGenerate = (values: any[]) => {
	if (!values.length) {
		return [];
	}

	let temp: any[][] = [];
	values.map((spec: { values: any[]; title: any }) => {
		let item = spec.values.map((x: any) => {
			return { [spec.title]: x.title };
		});
		temp.push(item);
	});

	let res = temp.reduce(
		(x, y) => {
			let arr: any[] = [];
			x.forEach((x) =>
				y.forEach((y) => {
					arr.push(x.concat([y]));
				})
			);

			return arr;
		},
		[[]]
	);

	let data = res.map((x) => {
		let obj: any = {};
		x.map((y: any) => Object.assign(obj, y));
		// return obj;
		// 补充额外字段
		return Object.assign({ title: obj }, ...defaultHeader.map((x) => ({ [x.prop]: x.value })));
	});
	return data;
};

watch(
	() => tableData.value,
	(newValue, oldValue) => {
		emit('update:modelValue', newValue);
	}
);

// 批量设置
const handleBatchSet = () => {
	// 过滤无效数据
	let validData: Record<string, any> = {};
	// data.splice(data.findIndex(e => e.title === 1), 1)
	validData = tableBatchSetData.value[0];
	delete validData['title'];
	// 批量设置
	tableData.value.forEach((item: any) => {
		Object.assign(item, validData);
	});
};

// 批量清除
const handleClearBatch = () => {
	tableData.value.forEach((item: any) => {
		Object.assign(item, ...defaultHeader.map((x) => ({ [x.prop]: x.value })));
	});
};

// 删除单项规格
const handleDeleteRow = (index: number) => {
	tableData.value.splice(index, 1);
};
</script>

<style scoped lang="scss">
.px-2 {
	padding: 0 2px;
}
</style>
