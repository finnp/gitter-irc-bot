# gitter-irc-bot

Bot that synchronises messages from a gitter room and an irc channel.

Install with `npm install gitter-irc-bot`.

# How to use

You need to set the following env variables

* `GITTERBOT_APIKEY`  Log in with your github/gitter bot [here](https://developer.gitter.im/apps) and take the `personal access token`
* `GITTERBOT_GITTER_ROOM` The Gitter Room, e.g. `datproject/discussions`
* `GITTERBOT_IRC_CHANNEL` IRC Channel name, e.g. `#dat`
* `GITTERBOT_IRC_NICK` The IRC user nick of the bot

Then start the bot with `npm start`, or if you install globally run `gitter-irc-bot`.
