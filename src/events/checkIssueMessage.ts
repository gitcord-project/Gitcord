import { ApplyOptions } from '@sapphire/decorators';
import { Event, EventOptions, Events } from '@sapphire/framework';
import { Message } from 'discord.js';

@ApplyOptions<EventOptions>({
	event: Events.Message,
	once: false
})
export default class extends Event<Events.Message> {
	private issueRegex = /(?<!<)#(\d+)/gu;
	public async run(message: Message) {
		if (message.author.bot) return;
		const issueIDs = message.content.match(this.issueRegex);
		if (!issueIDs) return;

		let queryAnswers = issueIDs
			.slice(0, 5)
			.map((issueId) => this.client.github.getIssuesFromRepo(parseInt(issueId, 10), 'skyra-project', 'skyra'));

		const items = await Promise.all(queryAnswers).catch(() => {
			/* noop*/
		});
		if (!items) return;
		message.issues = items;

		await message.react('✅');
	}
}
