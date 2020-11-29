import { GithubApi } from '@lib/structures/GithubApi';
import { Issue } from './Types';

declare module 'discord.js' {
	interface Client {
		github: GithubApi;
	}
	interface ClientOptions {
		dev?: boolean;
	}

	interface Message {
		issues: Issue[];
	}
}
