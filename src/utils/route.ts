export default function genRouters() {
    const contexts = import.meta.glob("@/views/**/*.{vue,tsx}")
    const routers: { name: any; children: never[]; path: string; component: () => Promise<any> }[] | undefined = []
    const pathArray = Object.keys(contexts).map((dir: string) => {
        const root = dir.replace(/..\/views|../, '')
        const arr = root.slice(root.indexOf('/') + 1, root.lastIndexOf('/')).split('/')
        return filterRouters(arr[0]) ? arr : []
    }).sort((a: string | any[], b: string | any[]) => a.length - b.length)

    function filterRouters(router: string) {
        return !!router
    }

    function path2Routers(arr: any[], result = [], i = 0) {
        let el = arr[i++]
        if (!el) return
        if (el === 'children') {
            el = arr[i++]
        }
        const filterItem = result.filter(item => item.name === el)[0]
        if (filterItem) {
            path2Routers(arr, filterItem.children, i)
        } else {
            const path = arr.slice(0, i).join('/')
            const obj = {
                name: el,
                children: [],
                path: path + '.index',
                component: () =>
                    import(/* webpackChunkName: "index-[request]" */
                        /* webpackInclude: /children(\/|\\).*(\/|\\)index\.vue$/ */
                        `../views/${path}/index.vue`)
            }
            result.push(obj)
            path2Routers(arr, obj.children, i)
        }
        return result
    }

    pathArray.forEach((item: string | any[]) => {
        if (!item.length) return
        const name = item[0]
        if (item.length === 1) {
            routers.push({
                name,
                children: [],
                path: `/${name}`,
                component: () =>
                    import(/* webpackChunkName: "index-[request]" */
                        /* webpackInclude: /views(\/|\\)((?!(\/|\\)).)*(\/|\\)index\.vue$/ */
                        `../views/${name}/index.vue`)
            })
        } else {
            path2Routers(item, routers)
        }
    })

    return routers
}