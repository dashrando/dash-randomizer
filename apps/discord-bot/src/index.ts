import { Client, Events, GatewayIntentBits, Message, Partials } from 'discord.js'
import { slashCommands } from './commands'
import { prefixCommand } from './commands/dashrando'
import './assert-env-vars'
import './health'

const token = process.env.DISCORD_BOT_TOKEN

const client = new Client(
  {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
    ],
    partials: [
      Partials.Channel,
      Partials.Message
    ]
  }
)
const prefix = '!dashrando'

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.on(Events.MessageCreate, (message: Message) => {
  const isCommand = message.content.startsWith(prefix)
  if (!isCommand) {
    return
  }
  prefixCommand(message)
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    console.log('not a chat input command', interaction)
    return
  }

  slashCommands
    .find((c) => c.data.name === interaction.commandName)
    ?.execute(interaction)
})

client.login(token)
