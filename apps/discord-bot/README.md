# DASH Discord Bot
The DASH Discord Bot is hosted on `...`.

## Environment Variables
Please refer to `.env.example` for the required environment variables. Both of the following values can be found in the Discord Developer Portal for `DASH Bot` in the **OAuth2** section.
* `DISCORD_BOT_TOKEN` is the token of the bot from Discord.
* `DISCORD_CLIENT_ID` is the client ID from Discord.

If you are running in development mode, you can also specify `DEV_GUILD_ID` to the server ID you would like to register the commands to.

## Install on Server
```url
https://discord.com/api/oauth2/authorize?client_id={CLIENT_ID}&permissions=3072&scope=bot%20applications.commands
```