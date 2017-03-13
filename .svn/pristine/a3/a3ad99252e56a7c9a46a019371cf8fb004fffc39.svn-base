import {request, getUrl} from '../utils/request'
import qs from 'qs'


export async function query(payload) {
    let options = {
        url: getUrl('/statistic'),
        method: 'get',
    }
    if(payload) {
      options.params = payload;
    }

    return request(options)
}
