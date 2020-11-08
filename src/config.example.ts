import { LogLevel } from '@sapphire/framework';
import { ClientOptions } from 'discord.js';

export const PREFIX = 'gh!';

export const CLIENT_OPTIONS: ClientOptions = {
	dev: true,
	ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] },
	messageCacheLifetime: 120,
	messageCacheMaxSize: 25,
	messageSweepInterval: 300,
	presence: { activity: { name: 'with GitHub issues', type: 'PLAYING' } },
	logger: { level: LogLevel.Debug },
	restTimeOffset: 0
};

export const TOKEN = '';
export const GH_TOKEN = '';
