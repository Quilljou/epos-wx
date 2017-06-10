import { hashHistory } from 'dva/router';

export function cookData(data) {
    switch (data.name) {
            // case -1:
            //     // data.name = '现金';
            //     data.icon = require('../assets/img/money.png');
            //     break;
            case '支付宝':
                // data.name = '支付宝';
                data.icon = require('../assets/img/alipay.png');
                break;
            case '微信':
                // data.name = '微信';
                data.icon = require('../assets/img/wechat.png');
                break;
            default:
                data.icon = require('../assets/img/cash.png');
                // data.name = data.name || '无'
                return
        }
}


export  function getNow(opt) {
         var opt = opt || {};
         if(typeof opt.time === 'undefined') {
             opt.time = true;
         }
         if(typeof opt.date === 'undefined') {
             opt.date = true;
         }

         var option = {
             time: opt.time,
             date: opt.date,
             dateFormat: opt.dateFormat || 'y-m-d',
             timeFormat: opt.timeFormat || 'h:m'
         }
         var now = new Date();

         var year = now.getFullYear();
         var month = format(now.getMonth() + 1);
         var date = format(now.getDate());
         var hour = format(now.getHours());
         var minute = format(now.getMinutes());
         var second = format(now.getSeconds());

         var dateSign = {
             'y': year,
             'm': month,
             'd': date
         };

         var timeSign = {
             'h': hour,
             'm': minute,
             's': second
         };

         var getDate = extendStr(option.dateFormat, dateSign);
         var getTime = extendStr(option.timeFormat, timeSign);


         if (option.date && option.time || (!option.date && !option.time)) {
             return getDate + ' ' + getTime;
         } else if (option.date && !option.time) {
             return getDate;
         } else {
             return getTime;
         }

         function extendStr(str, obj) {
             var arr = str.split('');
             var objArr = Object.keys(obj);
             for (var i = 0; i < arr.length; i++) {
                 for (var j = 0; j < objArr.length; j++) {
                     if (objArr[j] === arr[i]) {
                         arr[i] = obj[objArr[j]];
                     }
                 }
             }
             return arr.join('');
         }

         function format(time) {
             if(parseInt(time,10) < 10) {
                 return '0' + time;
             }else {
                 return time;
             }
         }
     }


export  function getToday() {
        var date = getNow({
            time: false
        })

        return date + ' 00:00:00';
}

export  function betweenToday() {
    var date = getNow({
        time: false
    })
    return {
      start: date + ' 00:00:00',
      end: date + ' 23:59:59',
    };
}


export function goTo(path) {
  hashHistory.push(path);
}
