import { Type } from './types';

export default class Log {
	messages: any[] = [];
	type: Type = 'log';
	originalMessages: any[] = [];
	with: any;
	timestamp: string;

	constructor(type: Type, messages: any[], originalMessages: any[], timestamp: string) {
		this.type = type;
		this.messages = messages;
		this.originalMessages = originalMessages;
		this.timestamp = timestamp;
	}
}
