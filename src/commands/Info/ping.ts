import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';

@ApplyOptions<CommandOptions>({
	description: '...pong?',
	detailedDescription: "Check Gitcord's ping to discord",
	preconditions: ['OwnerOnly']
})
export default class Help extends Command {
	public async run(message: Message) {
		const chance = Math.random() < 0.01;
		const wsPing = Math.round((await this.getShardsAvgPing()) ?? this.client.ws.ping);
		const msg = await message.channel.send('Ping?');
		await msg.edit(
			new MessageEmbed()
				.setColor(0xf0f0f0)
				.setTitle(chance ? 'Pang!' : 'Pong!')
				.setDescription(`Well yeah, I'm online. Feel free to [invite me to your server](https://google.com) by the way`)
				.addField('Ping:', `${msg.createdTimestamp - message.createdTimestamp}ms`)
				.addField('WS Ping:', `${wsPing}ms`)
		);
	}

	private async getShardsAvgPing() {
		if (this.client.shard === null) return;
		return (await this.client.shard!.broadcastEval(`this.client.ws.ping`)).reduce((acc, curr) => acc + curr, null) / this.client.shard!.count;
	}
}
