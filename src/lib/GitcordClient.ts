/* eslint-disable @typescript-eslint/no-invalid-this */
import { GH_TOKEN, PREFIX } from '@root/config';
import { SapphireClient } from '@sapphire/framework';
import { ClientOptions } from 'discord.js';
import { GithubApi } from './structures/GithubApi';

export class GitcordClient extends SapphireClient {
	public github: GithubApi;
	public constructor({ dev = false, ...options }: ClientOptions) {
		super({
			...options,
			dev
		});
		this.github = new GithubApi(GH_TOKEN);
		this.registerUserDirectories();
	}

	public fetchPrefix = () => PREFIX;
	public fetchLanguage = () => 'en-US';
}
