#!/usr/bin/env node
var gitterBot = require('./')
var opts = {
  ircChannel: process.env['GITTERBOT_IRC_CHANNEL'],
  ircNick: process.env['GITTERBOT_IRC_NICK'],
  gitterApiKey: process.env['GITTERBOT_APIKEY'],
  gitterRoom: process.env['GITTERBOT_GITTER_ROOM']
}

if(!(opts.ircChannel &&  opts.gitterApiKey && opts.gitterRoom && opts.ircNick)) {
  console.error('You need to set the config env variables (see readme.md)')
  process.exit()
}

gitterBot(opts)