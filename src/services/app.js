import {request, getUrl} from '../utils/request'
import qs from 'qs'


export async function queryData(payload) {
  console.log(payload);
  return request({
      url: getUrl(`/report?${qs.stringify(payload)}`),
  })
}
