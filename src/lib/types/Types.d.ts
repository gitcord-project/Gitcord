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
	None,
	Issue,
	Pullrequest,
	Multiple
}

export interface GraphqlVariables {
	owner: string;
	repository: string;
	number: string;
}

export interface Issue {
	url: string;
	title: string;
	description: string;
	locked: string;
	author: {
		login: string;
		avatarUrl: string;
	};
}
