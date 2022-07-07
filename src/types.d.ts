import { LoggerConfig } from './index';

export declare type Type = 'log' | 'info' | 'warn' | 'error' | 'dir';

export declare type ObjectType = { [key: string]: any };

export declare interface LoggerType {
	config: LoggerConfig;
	log(...message: any[]): void;
	log(type: Type, ...message: string[]): void;
	info(...message: any[]): void;
	warn(...message: any[]): void;
	error(...message: any[]): void;
	dir(...data: ObjectType[]): void;
	dir(type: Type, ...data: ObjectType[]): void;
}

export declare type LoggerConfig = {
	isEnable: boolean;
	name: string;
	styles: {
		label: {
			log: string;
			info: string;
			warn: string;
			error: string;
			dir: string;
		};
	};
	templates: {
		log: string;
		timestamp: string;
	};
	isShowLabel: boolean;
	isShowTimestamp: boolean;
	isUseNative: boolean;
	isPrintOnConsole: boolean;
};
