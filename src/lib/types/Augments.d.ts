import { GithubApi } from '@lib/structures/GithubApi';
import { IssueType } from './Types';

declare module 'discord.js' {
	interface Client {
		github: GithubApi;
	}
	interface ClientOptions {
		dev?: boolean;
	}

	interface Message {
		hasIssues: IssueType;
		issueIDs: string[];
	}
}
