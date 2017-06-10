import {request, getUrl} from '../utils/request'
import qs from 'qs'


// export async function queryBranch(payload) {
//
//     return request({
//         url: getUrl('/branch'),
//         params: {
//         	page: -1
//         }
//     })
// }
//
//
// export async function queryUser(payload) {
//     return request({
//         url: getUrl('/tenant/detail'),
//     })
// }

export async function queryData(payload) {
  console.log(payload);
  return request({
      url: getUrl(`/report?${qs.stringify(payload)}`),
  })
}
