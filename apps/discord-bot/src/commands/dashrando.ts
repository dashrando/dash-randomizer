import { SlashCommandBuilder, ChatInputCommandInteraction, Message } from 'discord.js'

const MODES = [
  { name: 'Standard Major/Minor', value: 'sm' },
  { name: 'Standard Full', value: 'sf' },
  { name: 'Recall Major/Minor', value: 'rm' },
  { name: 'Recall Full', value: 'rf' },
]

const generateUrl = ({ mode = 'recall_mm' }: { mode: string }) => {
  const seedNum = Math.floor(Math.random() * 999999) + 1
  const url = new URL('https://dashrando.net/seed')
  url.searchParams.append('mode', mode)
  url.searchParams.append('seed', seedNum.toString())
  return url.toString()
}

function parseCommandInput(input: string) {
  const regex = /mode=(\w+)/;
  const matches = regex.exec(input);
  const hasMatch = matches !== null && matches.length >= 2
  if (!hasMatch) {
      return null;
  }
  const modeInput = matches[1]
  const validMode = MODES.find((mode) => mode.value === modeInput)
  if (!validMode) {
    const validModes = MODES.map((mode) => `\`${mode.value}\``)
    throw new Error(`Invalid mode: ${modeInput}. Please use one of the following: ${validModes.join(', ')}`)
  }
  return { mode: modeInput };
}

export const slashCommand = {
	data: new SlashCommandBuilder()
		.setName('dashrando')
		.setDescription('Roll a DASH seed')
		.addStringOption((option) => (
			option
        .setName('mode')
        .setDescription('The logic mode used in rolling the seed')
        .addChoices(...MODES)
		)),
  async execute(interaction: ChatInputCommandInteraction) {
    const mode = interaction.options.getString('mode') ?? 'recall_mm'
    const seedUrl = generateUrl({ mode })
    await interaction.reply(seedUrl)
  },
}

export const prefixCommand = (message: Message) => {
  try {
    const command = parseCommandInput(message.content)
    if (command) {
      const seedUrl = generateUrl(command)
      message.reply(seedUrl)
    }
  } catch (err) {
    const error = err as Error
    const errorMsg = error.message || 'Could not generate seed'
    message.reply(errorMsg)
  }
}