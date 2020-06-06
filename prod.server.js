var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var app = express()

app.get('/api/getTopBanner', function(req, resp) {
  resp.set({'Access-Control-Allow-Origin': '*'})

  const url = 'http://ustbhuangyi.com/music/api/getTopBanner'

  axios.get(url, {
    headers: {
      referer: 'http://ustbhuangyi.com/music/',
      host: 'ustbhuangyi.com'
    },
    params: req.query
  }).then((res) => {
    resp.json(res.data);
  }).catch((error) => {
    console.log(error)
  });
})

app.get('/api/getDiscList', function(req, resp) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((res) => {
    resp.json(res.data)
  }).catch((error) => {
    console.log(error)
  });
})

app.get('/api/getSongMenu', function(req, resp) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((res) => {
    // 如果请求的是jsonp数据，则使用正则对jsonp数据分析获取里面的json
    var ret = res.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    resp.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

app.post('/api/getPurlUrl', bodyParser.json(), function(req, resp) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  axios.post(url, req.body, {
    headers: {
      referer: 'https://y.qq.com/',
      origin: 'https://y.qq.com',
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    resp.json(res.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.get('/api/getLyric', function(req, resp) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((res) => {
    // 如果请求的是jsonp数据，则使用正则对jsonp数据分析获取里面的json
    var ret = res.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    resp.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

app.get('/api/search', function (req, resp) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((res) => {
    resp.json(res.data)
  }).catch((e) => {
    console.log(e)
  })
})
