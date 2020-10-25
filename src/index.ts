import 'module-alias/register';
import 'reflect-metadata';
import '@utils/initClean';
import { GitcordClient } from '@lib/GitcordClient';
import { CLIENT_OPTIONS, TOKEN } from '@root/config';
import { green, red, yellow } from 'colorette';
import { inspect } from 'util';

inspect.defaultOptions.depth = 1;

async function main() {
	const client = new GitcordClient(CLIENT_OPTIONS);

	try {
		await client
			.login(TOKEN)
			.then(() => console.log(`${green('[WS  ]')} Successfully logged in.`))
			.catch((error) => {
				throw `${red('[WS  ]')} ${yellow('Failed to login to Discord:')}\n${error}`;
			});
	} catch (error) {
		client.destroy();
		throw error;
	}
}

main().catch(console.error);
