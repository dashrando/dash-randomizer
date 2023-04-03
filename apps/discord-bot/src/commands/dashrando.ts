import { SlashCommandBuilder, ChatInputCommandInteraction, Message } from 'discord.js'
import { program } from 'commander'

export type SeedOptions = {
  preset: string
  number?: number
}

export type BotInputOptions = {
  preset: string
  repeat: number
}

const MODES = [
  { name: 'Standard Major/Minor', value: 'sm' },
  { name: 'Standard Full', value: 'sf' },
  { name: 'Recall Major/Minor', value: 'rm' },
  { name: 'Recall Full', value: 'rf' },
]

const generateUrls = ({ preset = 'rf', repeat = 1 }) => {
  const urls = []
  for (let i = 0; i < repeat; i++) {
    urls.push(generateUrl({ preset }))
  }
  return urls
}

const generateUrl = ({ preset = 'rf' }: { preset: string }) => {
  const seedNum = Math.floor(Math.random() * 999999) + 1
  const url = new URL('https://dashrando.net/seed')
  url.searchParams.append('mode', preset)
  url.searchParams.append('seed', seedNum.toString())
  return url.toString()
}

function parseCommandInput(input: string) {
  const userInput = input.replace('!dashrando ', '').trim()
  program.requiredOption('-p --preset <mode>', 'logic mode to use', 'rm');
  program.option('-r --repeat <number>', 'number of times to repeat the seed', '1');
  program.parse(userInput.split(' '), { from: 'user' });
  const opts = program.opts()

  const validMode = MODES.find((mode) => mode.value === opts.preset)
  if (!validMode) {
    const validModes = MODES.map((mode) => `\`${mode.value}\``)
    throw new Error(`Invalid mode: ${opts.preset}. Please use one of the following: ${validModes.join(', ')}`)
  }
  const repeat = parseInt(opts.repeat) || 1
  if (repeat > 30) {
    throw new Error('You can only roll up to 30 seeds at once')
  }
  opts.repeat = repeat
  return opts;
}

export const slashCommand = {
	data: new SlashCommandBuilder()
		.setName('dashrando')
		.setDescription('Roll a DASH seed')
		.addStringOption((option) => (
			option
        .setName('preset')
        .setDescription('The logic mode used in rolling the seed')
        .addChoices(...MODES)
		))
    .addNumberOption((option) => (
      option
        .setName('repeat')
        .setDescription('How many seeds you want to roll at once')
        .setMinValue(1)
        .setMaxValue(30)
        .setRequired(false)
    )),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      await interaction.reply('Generating seed...')
      const preset = interaction.options.getString('preset') ?? 'rf'
      const repeat = interaction.options.getNumber('repeat') ?? 1
      const seedUrls = generateUrls({ preset, repeat })
      await interaction.editReply(seedUrls.join('\n'))
    } catch (err) {
      console.error(err)
    }
  },
}

export const prefixCommand = (message: Message) => {
  try {
    const options = parseCommandInput(message.content) as BotInputOptions
    if (options.preset) {
      const urls = generateUrls(options)
      message.reply(urls.join('\n'))
    }
  } catch (err) {
    const error = err as Error
    const errorMsg = error.message || 'Could not generate seed'
    message.reply(errorMsg)
  }
}
