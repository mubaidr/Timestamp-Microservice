var express = require('express')
var path = require('path')
var urlParser = require('url')

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use('*', (req, res, next) => {
  console.log('Request at: ' + new Date().toUTCString())
  next()
})

app.get('/:dateTime', (req, res, next) => {
  var dateTime = Date.parse(req.params.dateTime)
  var data = {
    unix: null,
    natural: null
  }

  if (typeof dateTime === 'number') {
    data.unix = dateTime
    data.natural = new Date(dateTime).toUTCString()
  } else {
    dateTime = new Date(req.params.dateTime)
    data.unix = dateTime.getTime()
    data.natural = dateTime.toUTCString()
  }
  res.send(data)
})

app.use('*', function (req, res) {
  res.end('NOT IMPLEMENTED: 404!')
})

app.listen(9000)
