import Mock from "mockjs";

export default [
    {
        url: "/api/tag",
        method: "get",
        response: {
            code: 200,
            message: '操作成功',
            data: {
                current_page: 1,
                "data|20": [
                    {
                        id: "@id",
                        title: "@name",
                        subtitle: "@name",
                        name: "@name",
                        value: "@name",
                        placeholder: "@name",
                        created_at: "@datetime",
                    }
                ],
                per_page: 10,
                total: 184,
            }
        }
    },
    {
        url: /^\/api\/tag\/\d+/,
        method: "get",
        response: {
            code: 200,
            message: '操作成功',
            data: {
                id: "@id",
                title: "@name",
                subtitle: "@name",
                name: "@name",
                value: "@name",
                placeholder: "@name",
                created_at: "@datetime",
            }
        }
    }
]
