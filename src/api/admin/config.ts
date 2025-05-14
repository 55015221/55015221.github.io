import request from '@/utils/request'

export function getConfigList(params?: any) {
    return request({
        url: '/api/config',
        method: 'get',
        params,
    })
}
