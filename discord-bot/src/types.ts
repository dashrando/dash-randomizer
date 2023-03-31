import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Message
} from 'discord.js'

export type SlashCommand = {
  data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
  execute: (interaction: ChatInputCommandInteraction) => void | Promise<void>
}

export type PrefixCommand = (message: Message) => void

export type CommandFile = {
  slashCommand: SlashCommand
  prefixCommand: PrefixCommand
}
