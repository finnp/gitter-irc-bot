# gitter-irc-bot
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Bot that synchronises messages from a gitter room and an irc channel.

Install with `npm install gitter-irc-bot`.

If you want to test this bot, go to [the gitter channel](https://gitter.im/finnp/gitter-irc-bot) and
join `#gitterircbot` on Freenode.

## How to use

You need to set the following env variables

* `GITTERBOT_APIKEY`  Log in with your github/gitter bot [here](https://developer.gitter.im/apps) and take the `personal access token`. **Important:** This shouldn't be your personal GitHub account, but a designated bot account.
* `GITTERBOT_GITTER_ROOM` The Gitter Room, e.g. `datproject/discussions`
* `GITTERBOT_IRC_CHANNEL` IRC Channel name, e.g. `#dat`
* `GITTERBOT_IRC_NICK` The IRC user nick of the bot

The following options are optional:
* `GITTERBOT_IRC_SERVER` IRC Server name, e.g. `irc.freenode.net`
* `GITTERBOT_IRC_OPTS` JSON string with options passed to [node-irc](https://node-irc.readthedocs.org/en/latest/API.html)
* `GITTERBOT_IRC_ADMIN` If specified this person receives error logs via pm.

Then start the bot with `npm start`, or if you install globally run `gitter-irc-bot`.

## Deploy on heroku

When deploying to heroku you need to set `HEROKU_URL` to the url of your heroku app.
Otherwise heroku will spin down your free heroku instance after a few minutes.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/finnp/gitter-irc-bot.git)
