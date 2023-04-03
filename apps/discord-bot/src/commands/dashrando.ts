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

const generateUrl = ({ preset = 'rf' }: { preset: string }) => {
  const seedNum = Math.floor(Math.random() * 999999) + 1
  const url = new URL('https://dashrando.net/seed')
  url.searchParams.append('mode', preset)
  url.searchParams.append('seed', seedNum.toString())
  return url.toString()
}

const getModeFromInput = (input: string) => {
  const regex = /mode=(\w+)/;
  const matches = regex.exec(input);
  const hasMatch = matches !== null && matches.length >= 2;
  if (!hasMatch) {
    return null;
  }
  return matches[1];
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
  opts.repeat = parseInt(opts.repeat) || 1
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
		)),
  async execute(interaction: ChatInputCommandInteraction) {
    const preset = interaction.options.getString('preset') ?? 'recall_mm'
    const seedUrl = generateUrl({ preset })
    await interaction.reply(seedUrl)
  },
}

export const prefixCommand = (message: Message) => {
  try {
    const options = parseCommandInput(message.content) as BotInputOptions
    if (options.preset) {
      const urls = []
      for (let i = 0; i < options.repeat; i++) {
        urls.push(generateUrl(options))
      }
      message.reply(urls.join('\n'))
    }
  } catch (err) {
    const error = err as Error
    const errorMsg = error.message || 'Could not generate seed'
    message.reply(errorMsg)
  }
}
