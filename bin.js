#!/usr/bin/env node
var gitterBot = require('./')
var opts = {
  ircServer: process.env['GITTERBOT_IRC_SERVER'],
  ircChannel: process.env['GITTERBOT_IRC_CHANNEL'],
  ircNick: process.env['GITTERBOT_IRC_NICK'],
  ircSaslUsername: process.env['GITTERBOT_IRC_SASL_USERNAME'],
  ircSaslPassword: process.env['GITTERBOT_IRC_SASL_PASSWORD'],
  ircFloodProtection: process.env['GITTERBOT_IRC_FLOOD_PROTECTION'],
  ircSsl: process.env['GITTERBOT_IRC_SSL'],
  ircPort: process.env['GITTERBOT_IRC_PORT'],
  gitterApiKey: process.env['GITTERBOT_APIKEY'],
  gitterRoom: process.env['GITTERBOT_GITTER_ROOM']
}

if(!(opts.ircServer && opts.ircChannel &&  opts.gitterApiKey && opts.gitterRoom && opts.ircNick)) {
  console.error('You need to set the config env variables (see readme.md)')
  process.exit()
}

var herokuURL = process.env.HEROKU_URL
if(herokuURL) {
  var request = require('request')
  require('http').createServer(function (req, res) {
    res.end('ping heroku\n')
  }).listen(process.env.PORT)
  setInterval(function () {
      request(herokuURL).pipe(process.stdout)
  }, 5 * 60 * 1000)
}

gitterBot(opts)
