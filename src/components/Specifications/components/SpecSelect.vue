<template>
	<div>
		<!-- <el-form-item :label="`规格名称${index}`" :prop="'item.' + index + '.title'" v-for="(item, index) in dynamicValidateForm" :key="index">
				<el-input v-model="item.title" />
			</el-form-item> -->
		<!-- 选择规格展示 -->
		<el-button @click="handleAdd">添加规格</el-button>
		<Draggable v-model="dynamicValidateForm" item-key="id" :options="{ handle: '.draggable-label' }">
			<template #item="{ element, index }">
				<div>
					<el-icon class="draggable-label">
						<Rank />
					</el-icon>

					<el-input
						class="input-new-tag"
						v-model="element.title"
						@keyup.enter.prevent="handleInputConfirm(element)"
						@blur.prevent="handleInputConfirm(element)"
					/>

					<span v-if="element.title.length && !element.inputVisible">
						<el-divider direction="vertical" />
						<Draggable v-model="element.values" item-key="id" style="display: inline-block">
							<template #item="scope">
								<div>
									{{ element }}
									<el-input
										v-if="scope.element.inputVisible"
										class="input-new-tag"
										v-model="scope.element.inputValue"
										ref="saveTagInput"
										@keyup.enter.prevent="handleInputConfirm(element)"
										@blur.prevent="handleInputConfirm(element)"
									/>
									<el-button v-else class="button-new-tag" @click="showInput(scope.element)"> + 添加规格值 </el-button>
								</div>
							</template>
						</Draggable>
					</span>
					{{ element }}
				</div>
			</template>
		</Draggable>
	</div>
</template>
<script setup lang="ts">
import { nextTick, PropType, reactive, ref, watch } from 'vue';
import Draggable from 'vuedraggable';

interface SpecificationInterface {
	id?: number;
	title: string;
	inputVisible?: boolean;
	inputValue?: string;
	values: Array<any>;
}

const props = defineProps({
	modelValue: {
		type: Array as PropType<Array<SpecificationInterface>[]>,
		default: () => [],
	},
});

const emit = defineEmits(['update:modelValue']);

const dynamicValidateForm = reactive<Array<SpecificationInterface>>([
	{ title: '', values: [{ title: '', inputVisible: true, inputValue: '' }], inputVisible: true, inputValue: '' },
]);

// 临时数据
const templateValue = ref();

// 新增规格值
const saveTagInput = ref<HTMLInputElement | null>(null);

const handleAdd = () => {
	dynamicValidateForm.push({
		title: '',
		values: [{ title: '', inputVisible: true, inputValue: '', values: [] }],
		inputVisible: true,
		inputValue: '',
	});
};

// 新增规格值
const handleInputConfirm = (item: SpecificationInterface) => {
	console.log(item);
	if (item.inputValue?.length) {
		item.values.push({ title: item.inputValue });
	}
	item.inputVisible = false;
	item.inputValue = '';
};

// 新增规格值
const showInput = async (item: SpecificationInterface) => {
	item.inputVisible = true;
	await nextTick();
	saveTagInput.value?.focus();
};
</script>

<style scoped lang="scss">
.tag-element {
	margin: 0 5px;
}

.el-tag--plain {
	margin: 0 5px;
	cursor: move;
}

.draggable-label {
	cursor: move;
}

.button-new-tag {
	margin-left: 10px;
}

.input-new-tag {
	width: 90px;
	margin-left: 10px;
}
</style>
