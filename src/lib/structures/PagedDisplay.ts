import { EventIterator, EventIteratorOptions } from '@sapphire/event-iterator';
import { mergeDefault } from '@sapphire/utilities';
import { wrapAroundNumber } from '@utils/util';
import { Message, MessageEmbed, MessageReaction, ReactionEmoji, User } from 'discord.js';

export interface PagedDisplayOptions extends Partial<EventIteratorOptions<[MessageReaction]>> {
	noPageNumber?: boolean;
	emojis: {
		previousPage: string;
		nextPage: string;
		stopDisplay: string;
	};
}

export class PagedDisplay {
	private iterator: EventIterator<[MessageReaction]> | undefined;
	private pages: (string | MessageEmbed)[];
	private index = 0;
	private options: PagedDisplayOptions;
	private user: User;

	public constructor(message: Message, template: (item: string) => string | MessageEmbed, items: string[], options?: PagedDisplayOptions) {
		this.user = message.author;
		this.options = mergeDefault(
			{
				idle: 50000,
				limit: 15,
				filter: this.iteratorFilter.bind(this),
				emojis: {
					previousPage: '◀️',
					nextPage: '▶️',
					stopDisplay: '⏹️'
				}
			},
			options
		);
		this.pages = items.map(template).map(this.addPageFooter.bind(this));
	}

	public async run(message: Message) {
		const pageMsg = await message.channel.send(this.pages[0]);
		for (const emoji of Object.values(this.options.emojis)) {
			await pageMsg.react(emoji);
		}

		this.iterator = new EventIterator<[MessageReaction]>(message.client, 'messageReactionAdd', this.options);
		for await (const [reaction] of this.iterator) {
			switch (reaction.emoji.name) {
				case this.options.emojis.nextPage:
					await this.nextPage(pageMsg, reaction);
					break;
				case this.options.emojis.previousPage:
					await this.previousPage(pageMsg, reaction);
					break;
				case this.options.emojis.stopDisplay:
					await this.stopDisplay(pageMsg);
					break;
			}
		}

		await pageMsg.reactions.removeAll();
	}

	private addPageFooter(page: string | MessageEmbed, pageIndex: number, pages: unknown[]) {
		if (this.options.noPageNumber || typeof page === 'string') return page;
		page.setFooter(`Page ${pageIndex + 1}/${pages.length}`);
		return page;
	}

	private iteratorFilter([value]: [MessageReaction]) {
		return Object.values(this.options.emojis).includes((value.emoji as ReactionEmoji).name) && value.users.cache.has(this.user.id);
	}

	private async nextPage(pageMsg: Message, reaction: MessageReaction) {
		this.index = wrapAroundNumber(this.index + 1, 0, this.pages.length - 1);
		await pageMsg.edit(this.pages[this.index]);
		await reaction.users.remove(this.user.id);
	}

	private async previousPage(pageMsg: Message, reaction: MessageReaction) {
		this.index = wrapAroundNumber(this.index - 1, 0, this.pages.length - 1);
		await pageMsg.edit(this.pages[this.index]);
		await reaction.users.remove(this.user.id);
	}

	private async stopDisplay(pageMsg: Message) {
		await pageMsg.reactions.removeAll();
		this.iterator!.end();
	}
}
