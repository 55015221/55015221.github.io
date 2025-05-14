import Mock from "mockjs"

Mock.mock("/im/session/page", "post", (options: any) => {
    const {keyWord = ""} = JSON.parse(options.body);

    const data = Mock.mock({
        "list|20": [
            {
                id: "@id",
                nickname: "@cname",
                createTime: "@datetime(yy-MM-dd HH:mm:ss)",
                text: "@cparagraph(5)",
                content() {
                    return JSON.stringify({text: this.text});
                },
                "contentType|0-3": 0,
                "serviceUnreadCount|0-10": 0,
                thumbnail() {
                    return Mock.Random.image(
                        "40x40",
                        Mock.Random.color(),
                        "#FFF",
                        "png",
                        this.nickname[0]
                    );
                }
            }
        ]
    });

    return {
        code: 200,
        message: '操作成功',
        data: {
            current_page: 1,
            data: data.list.filter((e: any) => e.nickname.includes(keyWord)),
            per_page: 10,
            total: 184,
        }
    };
});
