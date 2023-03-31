import { SlashCommandBuilder, ChatInputCommandInteraction, Message } from 'discord.js'

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
  if (matches !== null && matches.length >= 2) {
      return { mode: matches[1] };
  } else {
      return null;
  }
}

export const slashCommand = {
	data: new SlashCommandBuilder()
		.setName('dashrando')
		.setDescription('Roll a DASH seed')
		.addStringOption((option) => (
			option
        .setName('mode')
        .setDescription('The logic mode used in rolling the seed')
        .addChoices(
          { name: 'Standard Major/Minor', value: 'mm' },
          { name: 'Standard Full', value: 'full' },
          { name: 'Recall Major/Minor', value: 'rm' },
          { name: 'Recall Full', value: 'rf' },
        )
		)),
  async execute(interaction: ChatInputCommandInteraction) {
    const mode = interaction.options.getString('mode') ?? 'recall_mm'
    const seedUrl = generateUrl({ mode })
    await interaction.reply(seedUrl)
  },
}

export const prefixCommand = (message: Message) => {
  const command = parseCommandInput(message.content)
  if (command) {
    const seedUrl = generateUrl(command)
    message.reply(seedUrl)
  }
}