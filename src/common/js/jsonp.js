import originJSONP from 'jsonp'

export default function jsonp(url, data, option){
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if(!err){
        resolve(data);
      }else{
        reject(err);
      }
    })
  })
}

// 封装一个拼接url后面query的操作
function param(data){
  let url = '';
  for(var k in data){
    let value = data[k] !== undefined ? data[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : '';
}
