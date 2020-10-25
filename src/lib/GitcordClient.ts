/* eslint-disable @typescript-eslint/no-invalid-this */
import { PREFIX } from '@root/config';
import { SapphireClient } from '@sapphire/framework';
import { ClientOptions } from 'discord.js';

export class GitcordClient extends SapphireClient {
	public constructor({ dev = false, ...options }: ClientOptions) {
		super({
			...options,
			dev
		});
		this.registerUserDirectories();
	}

	public fetchPrefix = () => PREFIX;
	public fetchLanguage = () => 'en-US';
}
