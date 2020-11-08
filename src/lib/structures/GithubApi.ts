import { GraphqlVariables } from '@lib/types/Types';
import { fetch } from '@utils/util';
// import { readFileSync } from 'fs';
// import { sign } from 'jsonwebtoken';

export class GithubApi {
	/**
	 * The GraphQL base endpoint
	 */
	public url = 'https://api.github.com/v4/graphql';

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

	/**
	 * Run a GraphQL query against Github
	 * @param query The GraphQL query to run
	 * @param variables Owner, repo and issue/PR number variables
	 * @param key Installation token
	 */
	public runQuery<T = Record<string, unknown>>(query: string, variables: GraphqlVariables) {
		return fetch<T>(this.url, {
			body: JSON.stringify({ query, variables }),
			headers: {
				'User-Agent': 'GitcordBot/v0.0.1 by @cfanoulis',
				Accept: 'application/vnd.github.v3+json',
				Authentication: `Bearer ${this.token}`
			}
		});
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
