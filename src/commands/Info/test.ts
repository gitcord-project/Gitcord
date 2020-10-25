import { PagedDisplay } from '@lib/structures/PagedDisplay';
import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';

@ApplyOptions<CommandOptions>({
	aliases: ['h'],
	description: 'test',
	detailedDescription: 'You may also provide a command, which will return info about that command',
	preconditions: ['OwnerOnly']
})
export default class Help extends Command {
	public async run(message: Message) {
		return new PagedDisplay(message, (item) => new MessageEmbed().setDescription(item), ['hi', 'hihi']).run(message);
	}
}
