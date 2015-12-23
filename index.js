var irc = require('irc')
var request = require('request')
var xtend = require('xtend')
var JSONStream = require('JSONStream')

module.exports = function (opts) {
  var headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + opts.gitterApiKey
  }

  var ircOpts = xtend({
    channels: [opts.ircChannel],
    autoConnect: false,
    retryCount: 20
  }, opts.ircOpts)

  var ircClient = new irc.Client(
    opts.ircServer || 'irc.freenode.net',
    opts.ircNick,
    ircOpts
  )

  function log (message) {
    console.error(message)
    if (opts.ircAdmin) ircClient.say(opts.ircAdmin, message)
  }

  ircClient.on('error', function (message) {
    console.error('IRC Error:', message)
  })

  var joinRoomUrl = 'https://api.gitter.im/v1/rooms'

  console.log('Connecting to IRC..')
  ircClient.connect(function () {
    log('Connected to IRC, joined ' + opts.ircChannel)
    request.post({ url: joinRoomUrl, headers: headers, json: {uri: opts.gitterRoom} }, function (err, req, json) {
      if (err) return log(err)
      var gitterRoomId = json.id
      var getGitterMessageUrl = 'https://stream.gitter.im/v1/rooms/' + gitterRoomId + '/chatMessages'
      var postGitterMessageUrl = 'https://api.gitter.im/v1/rooms/' + gitterRoomId + '/chatMessages'

      request({url: 'https://api.gitter.im/v1/user', headers: headers, json: true}, function (err, res, json) {
        if (err) return log(err)
        var gitterName = json[0].username
        log('Gitterbot ' + gitterName + ' on channel ' + opts.gitterRoom + '(' + gitterRoomId + ')')
        var chatStream

        function gitterAttach () {
          if (chatStream) {
            log('Reattaching to gitter chat stream...')
            chatStream.abort()
            chatStream.removeAllListeners()
          }
          chatStream = request({url: getGitterMessageUrl, headers: headers})
          chatStream.on('error', gitterAttach)
          chatStream.on('end', gitterAttach)
          chatStream.pipe(JSONStream.parse())
            .on('data', function (message) {
              var userName = message.fromUser.username
              if (userName === gitterName) return

              var lines = message.text.split('\n')
              if (lines.length > 4) {
                lines.splice(3)
                lines.push('[full message: https://gitter.im/' + opts.gitterRoom + '?at=' + message.id + ']')
              }

              var text = lines.map(function (line) {
                return '(' + userName + ') ' + line
              }).join('\n')

              console.log('gitter:', text)
              ircClient.say(opts.ircChannel, text)
            })
        }

        gitterAttach()

        ircClient.on('message' + opts.ircChannel, function (from, message) {
          if (from === opts.ircNick) return
          var text = '`' + from + '` ' + message
          console.log('irc:', text)
          request.post({url: postGitterMessageUrl, headers: headers, json: {text: text}})
        })
        ircClient.on('action', function (from, to, message) {
          if (to !== opts.ircChannel || from === opts.ircNick) return
          var text = '— `' + from + '` ' + message
          request.post({url: postGitterMessageUrl, headers: headers, json: {text: text}})
        })
        ircClient.on('pm', function (from, message) {
          if (message === 'reattach gitter') {
            gitterAttach()
            ircClient.say(from, 'I reattached gitter for you!')
          } else {
            ircClient.say(from, 'Hi!')
          }
        })
      })
    })
  })
}
