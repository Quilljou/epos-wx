import {request, getUrl} from '../utils/request'
import qs from 'qs'


export async function queryBranch(payload) {

    return request({
        url: getUrl('/branch/all')
    })
}


export async function queryUser(payload) {
    return request({
        url: getUrl('/tenant/detail'),
    })
}
