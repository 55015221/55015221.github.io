export default [
	{
		url: '/api/specification',
		method: 'get',
		response: () => {
			return {
				code: 200,
				message: '保存成功',
				data: {},
			};
		},
	},
];
