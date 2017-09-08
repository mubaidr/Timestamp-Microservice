var express = require('express')
var path = require('path')
var urlParser = require('url')

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use('*', (req, res, next) => {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).end();
  } else {
    console.log('Request at: ' + new Date().toUTCString())
    next();
  }
})

app.get('/:dateTime', (req, res, next) => {
  var input = parseInt(req.params.dateTime)
  var data = {
    unix: null,
    natural: null
  }
  var dateTime

  if (isNaN(input)) {
    input = req.params.dateTime
  }

  dateTime = new Date(input)

  data = {
    unix: dateTime.getTime(),
    natural: dateTime.toUTCString()
  }
  res.send(data)
})

app.use('*', function (req, res) {
  res.end('NOT IMPLEMENTED: 404!')
})

app.listen(9000)
