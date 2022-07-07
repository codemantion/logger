import LoggerEventListener from './event-listener';
import { LoggerConfig, LoggerType, Type } from './types';
import Log from './log';
import LoggerUser from './user';
export * from './log';

function parseArgs<T = string>(args: T[], defaultType: Type = 'log'): { type: Type; messages: T[] } {
	if (args.length === 1) {
		return { type: defaultType, messages: args };
	}
	const [type, ...messages] = args;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	if (type === 'log' || type === 'info' || type === 'warn' || type === 'error')
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return { type, messages };
	else
		return {
			type: defaultType,
			messages: args,
		};
}

function getMessages(args: (string | string[])[], config: LoggerConfig): Log {
	const { type, messages } = parseArgs<string>(args as string[]);

	let timestampTemplate = config.templates.timestamp;

	const timestamp = String(new Date().toISOString());

	if (config.isShowTimestamp) timestampTemplate = timestampTemplate.replace('%timestamp%', timestamp);
	else timestampTemplate = timestampTemplate.replace('%timestamp%', '');

	if (config.isShowLabel) {
		let template = config.templates.log;
		template = template.replace('%name%', config.name);
		template = template.replace('%type%', type);
		return new Log(
			type,
			[`%c${template}`, config.styles.label[type], timestampTemplate, ...messages],
			messages,
			timestamp,
		);
	} else {
		return new Log(type, [timestampTemplate, ...messages], messages, timestamp);
	}
}

export class Logger extends LoggerEventListener implements LoggerType {
	config: LoggerConfig = {
		isEnable: true,
		name: 'logger',
		styles: {
			label: {
				log: 'background: #222; color: #bada55',
				info: 'background: #222; color: #bada55',
				warn: 'background: #ffdd76; color: #222',
				error: 'background: #ffc0c0; color: #ff0000',
				dir: 'background: #222; color: #bada55',
			},
		},
		templates: {
			log: '[%name%]:%type%',
			timestamp: '%timestamp%:',
		},
		isShowLabel: true,
		isShowTimestamp: true,
		isUseNative: false,
		isPrintOnConsole: true,
	};
	user: LoggerUser;

	constructor(Config?: Partial<LoggerConfig>) {
		super();
		this.config = {
			...this.config,
			...Config,
		};
		this.user = new LoggerUser();
	}

	private print(log: Log) {
		if (!this.config.isEnable) return;
		// const [type, messages, originalMessage] = getMessages.call(this, ...args);
		if (this.config.isPrintOnConsole) {
			if (this.config.isUseNative) {
				// eslint-disable-next-line no-console
				if (log.type === 'log' || log.type === 'info') console.log(...log.messages);
				// eslint-disable-next-line no-console
				if (log.type === 'warn') console.warn(...log.messages);
				// eslint-disable-next-line no-console
				if (log.type === 'error') console.error(...log.messages);
				// eslint-disable-next-line no-console
			} else console.log(...log.messages);
		}
	}

	log(...args: (string | string[])[]): Log {
		const log = getMessages(args, this.config);
		this.print(log);
		this.dispatch(log);
		return log;
	}

	info(...message: string[]): Log {
		return this.log('info', ...message);
	}

	warn(...message: string[]): Log {
		return this.log('warn', ...message);
	}

	error(...message: string[]): Log {
		return this.log('error', ...message);
	}

	dir(...args: (string | { [key: string]: any })[]): Log {
		const { type, messages } = parseArgs<string | { [key: string]: any }>(args, 'info');

		const result = messages.map((each) => JSON.stringify(each, null, 2));
		return this.log(type, ...result);
	}

	setConfig(config: Partial<LoggerConfig>): void {
		this.config = {
			...this.config,
			...config,
		};
	}

	setEnable(isEnable: boolean): void {
		this.config.isEnable = isEnable;
	}

	label(name: string): Logger {
		if (!name) return this;
		const newLogger = this.clone({ name: this.config.name + ':' + name });
		newLogger.print = (log) => {
			log.label = name;
			this.print(log);
		};
		return newLogger;
	}

	with(data: any): Logger {
		const newLogger = this.clone();
		newLogger.print = (log) => {
			log.with = data;
			this.print(log);
		};
		return newLogger;
	}

	new(config?: Partial<LoggerConfig>): Logger {
		return new Logger({ ...this.config, ...config });
	}

	clone(config?: Partial<LoggerConfig>): Logger {
		const newLogger = new Logger({ ...this.config, ...config });
		newLogger.eventTarget = this.eventTarget;
		newLogger.user = this.user;
		return newLogger;
	}
}

const logger = new Logger();

export default logger;
