import {request, getUrl} from '../utils/request'
import qs from 'qs'


export async function login(payload) {
    return request({
        url: getUrl('/api/wechat/login'),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'post',
        data: qs.stringify(payload)
    })
}
