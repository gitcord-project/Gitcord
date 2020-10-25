import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import { Store } from '@sapphire/pieces';
import { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	aliases: ['h'],
	description: 'Gives you a list of commands',
	detailedDescription: 'You may also provide a command, which will return info about that command',
	preconditions: ['OwnerOnly']
})
export default class Help extends Command {
	public async run(message: Message, args: Args) {
		const command = await args.pickResult('string');
		if (command.success) return this.commandHelp(message, command.value);
		return message.channel.send(this.mapCommandsToStr());
	}

	private async commandHelp(message: Message, cmd: string) {
		return message.channel.send(cmd);
	}

	private mapCommandsToStr() {
		return ((this.store as unknown) as Store<Command>).map((val) => `${val.name} → ${val.description}`).join('\n');
	}
}
