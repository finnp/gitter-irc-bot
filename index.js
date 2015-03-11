var irc = require('irc')
var request = require('request')
var JSONStream = require('JSONStream')

module.exports = function (opts) {  
  var headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + opts.gitterApiKey
  }

  var ircClient = new irc.Client(opts.ircServer || 'irc.freenode.net', opts.ircNick, {
    channels: [opts.ircChannel],
    autoConnect: false,
    retryCount: 20
  })

  ircClient.on('error', function(message) {
    console.error('IRC Error:', message)
  })

  var joinRoomUrl = 'https://api.gitter.im/v1/rooms'

  console.log('Connecting to IRC..')
  ircClient.connect(function () {
    console.log('Connected to IRC, joined', opts.ircChannel)
    request.post({url: joinRoomUrl, headers: headers, json: {uri: opts.gitterRoom} }, function (err, req, json) {
      var gitterRoomId = json.id
      var getGitterMessageUrl = "https://stream.gitter.im/v1/rooms/" + gitterRoomId + "/chatMessages"
      var postGitterMessageUrl = "https://api.gitter.im/v1/rooms/" + gitterRoomId + "/chatMessages"

      request({url: "https://api.gitter.im/v1/user", headers: headers, json: true}, function (err ,res, json) {
        var gitterName = json[0].username
        console.log('Gitter bot', gitterName, 'on channel',  opts.gitterRoom, '(' + gitterRoomId + ')')
        request({url: getGitterMessageUrl, headers: headers})
          .pipe(JSONStream.parse())
          .on('data', function (message) {
            if(message.fromUser.username === gitterName) return
            var text = '(' + message.fromUser.username + ') ' + message.text
            console.log('gitter:', text)
            ircClient.say(opts.ircChannel, text)
          })
            
        ircClient.on('message' + opts.ircChannel, function (from, message) {
          if(from === opts.ircNick) return
          var text = '`' + from + '` ' + message
          console.log('irc:', text)
          // TODO: Handle post errors
          request.post({url: postGitterMessageUrl, headers: headers, json: {text: text}})
            // .pipe(process.stdout) // {"error":"An unknown error occurred"}
        })
      })
    })
  })
}

