export const enum PreConditions {
	OwnerOnly = 'OwnerOnly'
}

export const enum Permissions {
	Administrator = 'administrator',
	ViewAuditLog = 'viewAuditLog',
	ManageGuild = 'manageGuild',
	ManageRoles = 'manageRoles',
	ManageChannels = 'manageChannels',
	KickMembers = 'kickMembers',
	BanMembers = 'banMembers',
	CreateInstantInvite = 'createInstantInvite',
	ChangeNickname = 'changeNickname',
	ManageNicknames = 'manageNicknames',
	ManageEmojis = 'manageEmojis',
	ManageWebhooks = 'manageWebhooks',
	ViewChannel = 'viewChannel',
	SendMessages = 'sendMessages',
	SendTtsMessages = 'sendTtsMessages',
	ManageMessages = 'manageMessages',
	EmbedLinks = 'embedLinks',
	AttachFiles = 'attachFiles',
	ReadMessageHistory = 'readMessageHistory',
	MentionEveryone = 'mentionEveryone',
	UseExternalEmojis = 'useExternalEmojis',
	AddReactions = 'addReactions',
	Connect = 'connect',
	Speak = 'speak',
	Stream = 'stream',
	MuteMembers = 'muteMembers',
	DeafenMembers = 'deafenMembers',
	MoveMembers = 'moveMembers',
	UseVad = 'useVad',
	PrioritySpeaker = 'prioritySpeaker'
}

export const enum IssueType {
	Issue,
	PullRequest
}

export interface GraphqlVariables {
	owner: string;
	repository: string;
	number: string;
}

export interface Issue {
	number: number;
	title: string;
	body: string;
	repoUrl: string;
	issueLabels: string[];
	user: { username: string; avatarUrl: string; profileUrl: string };
}
