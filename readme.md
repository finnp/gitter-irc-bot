# gitter-irc-bot

Bot that synchronises messages from a gitter room and an irc channel.

Install with `npm install gitter-irc-bot`.

## How to use

You need to set the following env variables

* `GITTERBOT_APIKEY`  Log in with your github/gitter bot [here](https://developer.gitter.im/apps) and take the `personal access token`
* `GITTERBOT_GITTER_ROOM` The Gitter Room, e.g. `datproject/discussions`
* `GITTERBOT_IRC_SERVER` IRC Server name, e.g. `irc.freenode.net`
* `GITTERBOT_IRC_PORT` IRC Server port, e.g. `6697`
* `GITTERBOT_IRC_CHANNEL` IRC Channel name, e.g. `#dat`
* `GITTERBOT_IRC_NICK` The IRC user nick of the bot
* `GITTERBOT_IRC_SSL` If set, enables SSL for the irc server.
* `GITTERBOT_IRC_SASL_PASSWORD` If set, enables SSL and SASL(with this password) for the irc server.
* `GITTERBOT_IRC_SASL_USERNAME` Username for SASL authentication(defaults to `GITTERBOT_IRC_NICK`)
* `GITTERBOT_IRC_FLOOD_PROTECTION` If set, enables the [flood protection option](https://node-irc.readthedocs.org/en/latest/API.html#client).

Then start the bot with `npm start`, or if you install globally run `gitter-irc-bot`.

## Deploy on heroku

When deploying to heroku you need to set `HEROKU_URL` to the url of your heroku app.
Otherwise heroku will spin down your free heroku instance after a few minutes.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/finnp/gitter-irc-bot.git)
