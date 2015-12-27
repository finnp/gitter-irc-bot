var faye = require('faye')

module.exports = getClient

function getClient (token) {
  // Authentication extension

  var ClientAuthExt = function () {}

  ClientAuthExt.prototype.outgoing = function (message, callback) {
    if (message.channel === '/meta/handshake') {
      if (!message.ext) { message.ext = {} }
      message.ext.token = token
    }

    callback(message)
  }

  // faye client

  var client = new faye.Client('https://ws.gitter.im/faye', {timeout: 60, retry: 5, interval: 1})

  // Add Client Authentication extension
  client.addExtension(new ClientAuthExt())

  // keep alive, but we don't care about the answer
  setInterval(function () {
    client.publish('/api/v1/ping2', {reason: 'ping'})
  }, 60000)

  return client
}
