
declare type Type = 'log'|'info'|'warn'|'error';

declare type LoggerConfig = {
    name: string;
    styles: {
        label: {
            log: string;
            info: string;
            warn: string;
            error: string;
        }
    },
    templates: {
        log: string;
        timestamp: string;
    },
    isShowLabel: boolean;
    isShowTimestamp: boolean;
    isUseNative: boolean;
};

type ObjectType = {[key: string]: any};

function parseArgs<T = string>(args: T[], defaultType: Type = 'log'): {type: Type, messages: T[]} {
    if (args.length === 1) {
        return {type: defaultType, messages: args};
    }
    const [type, ...messages] = args;
    // @ts-ignore
    if (type === 'log' || type ===  'info' || type === 'warn' || type === 'error') return {type, messages};
    else return {
        type: defaultType, messages: args
    }
}

function getMessages(...args: (string | string[])[]): string[] {
    // @ts-ignore
    const _this = this as Logger;

    const {type, messages} = parseArgs<string>(args as string[]);

    let timestampTemplate = _this.config.templates.timestamp;

    if (_this.config.isShowTimestamp) timestampTemplate = timestampTemplate.replace('%timestamp%', String(new Date()));
    else timestampTemplate = timestampTemplate.replace('%timestamp%', '');

    if (_this.config.isShowLabel) {
        let template = _this.config.templates.log;
        template = template.replace('%name%', _this.config.name);
        template = template.replace('%type%', type);
        return [type, `%c${template}`, _this.config.styles.label[type], timestampTemplate, ...messages];
    } else {
        return [type, timestampTemplate, ...messages];
    }
}

interface LoggerType {
    config: LoggerConfig;
    log(...message: string[]): void;
    log(type: Type, ...message: string[]): void;
    info(...message: string[]): void;
    warn(...message: string[]): void;
    error(...message: string[]): void;
    dir(...data: ObjectType[]): void;
    dir(type: Type, ...data: ObjectType[]): void;
}

class Logger implements LoggerType {
    config: LoggerConfig = {
        name: 'logger',
        styles: {
            label: {
                log: 'background: #222; color: #bada55',
                info: 'background: #222; color: #bada55',
                warn: 'background: #ffdd76; color: #222',
                error: 'background: #ffc0c0; color: #ff0000',
            }
        },
        templates: {
            log: '[%name%]:%type%',
            timestamp: '%timestamp%:',
        },
        isShowLabel: true,
        isShowTimestamp: true,
        isUseNative: false,
    };
    constructor(Config?: Partial<LoggerConfig>) {
        this.config = {
            ...this.config,
            ...Config
        };
    }

    log(...args: (string | string[])[]): void {
        const [type, ...messages] = getMessages.call(this, ...args);
        if (this.config.isUseNative) {
            if (type === 'log' || type === 'info') console.log(...messages);
            if (type === 'warn') console.warn(...messages);
            if (type === 'error') console.error(...messages);
        } else console.log(...messages);
    }

    info(...message: string[]): void{
        this.log('info', ...message);
    }

    warn(...message: string[]): void{
        this.log('warn', ...message);
    }

    error(...message: string[]): void {
        this.log('error', ...message);
    }

    dir(...args: (string | { [key: string]: any; })[]): void {
        const {type, messages} = parseArgs<string|{ [key: string]: any }>(args, "info");

        const result = messages.map(each => JSON.stringify(each, null, 2));
        this.log(type, ...result);
    }

    setConfig(config: Partial<LoggerConfig>): void {
        this.config = {
            ...this.config,
            ...config
        };
    }
}

export default new Logger();