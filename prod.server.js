var express = require('express')
var config = require('./config/index')
var axios = require('axios')
var bodyParser = require('body-parser')

var app = express()

app.get('/api/getTopBanner', function(req, resp) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const jumpPrefix = 'https://y.qq.com/n/yqq/album/'

  axios.get(url, {
    headers: {
      referer: 'https://u.y.qq.com/',
      host: 'u.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    response = response.data
    if (response.code === 0) {
      const slider = []
      const content = response.focus.data && response.focus.data.content
      if (content) {
        for (let i = 0; i < content.length; i++) {
          const item = content[i]
          const sliderItem = {}
          sliderItem.id = item.id
          sliderItem.linkUrl = jumpPrefix + item.jump_info.url + '.html'
          sliderItem.picUrl = item.pic_info.url
          slider.push(sliderItem)
        }
      }
      resp.json({
        code: 0,
        data: {
          slider
        }
      })
    }
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

app.use(express.static('./dist'))

var port = process.env.PORT || config.build.port

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
