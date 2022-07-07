import { Type } from './types';
import Log from './log';

class LoggerEventListener {
	eventTarget = new EventTarget();
	on(type: Type | '*', listener: EventListener): void {
		if (type !== '*' && type !== 'log' && type !== 'error' && type !== 'warn' && type !== 'info' && type !== 'dir')
			throw new Error('Invalid event type');
		this.eventTarget.addEventListener(type, listener);
	}

	off(type: Type | '*', listener: EventListener): void {
		if (type !== '*' && type !== 'log' && type !== 'error' && type !== 'warn' && type !== 'info' && type !== 'dir')
			throw new Error('Invalid event type');
		this.eventTarget.removeEventListener(type, listener);
	}

	dispatch(log: Log): void {
		const eventT = new CustomEvent(log.type, {
			detail: log,
			bubbles: true,
			cancelable: true,
		});

		Object.defineProperty(eventT, 'target', { writable: false, value: this });
		this.eventTarget.dispatchEvent(eventT);

		const eventA = new CustomEvent('*', {
			detail: log,
			bubbles: true,
			cancelable: true,
		});

		Object.defineProperty(eventA, 'target', { writable: false, value: this });
		this.eventTarget.dispatchEvent(eventA);
	}
}

export default LoggerEventListener;
