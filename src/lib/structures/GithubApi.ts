// import { readFileSync } from 'fs';
// import { sign } from 'jsonwebtoken';

import { Octokit } from '@octokit/rest';

export class GithubApi {
	/**
	 * The GraphQL base endpoint
	 */
	public url = 'https://api.github.com/v4/graphql';

	public octokit!: Octokit;

	/**
	 * The application's ID, as provided by GitHub
	 */
	// public applcationId: string;

	// private jwt?: string;

	// private jwtExpiry?: number;

	// private jwtPrivateKey: string;

	private token: string;

	// public constructor(applicationId: string, keyPath: string) {
	public constructor(token: string) {
		// this.applcationId = applicationId;
		// this.jwtPrivateKey = readFileSync(keyPath, 'utf-8');
		this.token = token;
		this.octokit = new Octokit({ auth: this.token, userAgent: `Gitcord by @cfanoulis` });
	}

	/**
	 * Github apps JWT, used to autenticate against GH as the *app*, **not an installation**
	 */
	// public get key() {
	// 	if (this.jwtExpiry && Date.now() < this.jwtExpiry) return this.jwt;
	// 	this.jwt = this.generateJwtKey();
	// 	return this.jwt;
	// }

	/**
	 * Signs a new JWT
	 */
	// public generateJwtKey() {
	// 	this.jwtExpiry = Date.now() + 9 * 60;
	// 	return sign({}, this.jwtPrivateKey, {
	// 		algorithm: 'RS256',
	// 		issuer: this.applcationId,
	// 		expiresIn: this.jwtExpiry
	// 	});
	// }

	public async getIssuesFromRepo(id: number, owner: string, repo: string) {
		const {
			data: {
				number,
				title,
				body,
				repository_url: repoUrl,
				user: { login: username, avatar_url: avatarUrl, url: profileUrl },
				labels
			}
		} = await this.octokit.issues.get({
			owner,
			repo,
			issue_number: id
		});

		const issueLabels = labels.map((e) => e.name);
		return { number, title, body, repoUrl, issueLabels, user: { username, avatarUrl, profileUrl } };
	}

	public static Queries = {
		/**
		 * Check if a ref is either an issue or PR
		 */
		issueOrPR: `query issueOrPr($repository: String!, $owner: String!, $number: Int!) {
						repository(owner: $owner, name: $repository) {
							issue(number: $number) {
								number
							}
							pullRequest(number: $number) {
								number
							}
						}
					}`,
		/**
		 * Get details about an issue
		 */
		issueDetails: `query issueOrPr($repository: String!, $owner: String!, $number: Int!) {
					repository(owner: $owner, name: $repository) {
						issue(number: $number) {
							id
						}
					}
				}`,
		/**
		 * Get details about a pull request
		 */
		prDetails: `query issueOrPr($repository: String!, $owner: String!, $number: Int!) {
						repository(owner: $owner, name: $repository) {
							pullRequest(number: $number) {
							id
						}
					}`
	};
}
