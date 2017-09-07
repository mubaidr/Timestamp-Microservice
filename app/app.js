var express = require('express')
var path = require('path')
var urlParser = require('url')

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use('*', (req, res, next) => {
  console.log(new Date().toUTCString())
  next()
})

app.get('/:dateTime', (req, res, next) => {
  res.send('Something: ' + JSON.stringify(req.body))
})

app.use('*', function (req, res) {
  res.end('NOT IMPLEMENTED: 404!')
})

app.listen(9000)
