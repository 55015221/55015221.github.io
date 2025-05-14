<template>
	<div>
		<!-- 生成新规格 -->
		<!-- <el-button v-if="!isNewSpec" type="primary" @click="isNewSpec = true">添加新规格</el-button> -->

		<el-form v-model="newSpecificationForm" :rules="formRules" inline>
			<el-form-item :label="`规格名称${index}`" :prop="'item.' + index + '.title'" v-for="(item, index) in dynamicValidateForm" :key="index">
				<el-input v-model="item.title" />
			</el-form-item>

			<el-form-item label="规格值" prop="values[0].title">
				<el-input v-model="newSpecificationForm.values[0].title" />
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="handleNewSpecificationConfirm">确认</el-button>
				<el-button @click="isNewSpec = false">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
interface ValueItem {
	id?: number;
	title: string;
	values?: Array<ValueItem>;
}

const dynamicValidateForm = reactive<Array<{ values: ValueItem[]; title: string }>>([{ values: [{ title: '' }], title: '' }]);

const newSpecificationForm = ref({ title: '', values: [{ title: '' }] });
const newSpecificationRef = ref();

// 是否添加新规格
const isNewSpec = ref(false);

const formRules = {
	title: [{ required: true, message: '请输入规格名称', trigger: 'focus' }],
	'values[0].title': [{ required: true, message: '请输入规格值', trigger: 'focus' }],
};

// 新增规格
const handleNewSpecificationConfirm = () => {
	// const valid = await newSpecificationRef.value?.validate();
	// if (!valid) return;
	templateValues.value.push({
		title: newSpecificationForm.value.title,
		values: newSpecificationForm.value.values,
		inputVisible: false,
		inputValue: '',
	});

	isNewSpec.value = false;
	newSpecificationRef.value?.resetFields();
};
</script>
