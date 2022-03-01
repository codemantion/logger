import { Type } from './index';

const eventTarget = new EventTarget();

class LoggerEventListener {
	on(type: Type | '*', listener: EventListener): void {
		if (type !== '*' && type !== 'log' && type !== 'error' && type !== 'warn' && type !== 'info' && type !== 'dir')
			throw new Error('Invalid event type');
		eventTarget.addEventListener(type, listener);
	}

	off(type: Type | '*', listener: EventListener): void {
		if (type !== '*' && type !== 'log' && type !== 'error' && type !== 'warn' && type !== 'info' && type !== 'dir')
			throw new Error('Invalid event type');
		eventTarget.removeEventListener(type, listener);
	}

	dispatch(type: Type, messages: any[], originalMessages: any[]): void {
		const detail = {
			type,
			messages,
			originalMessages,
		};
		eventTarget.dispatchEvent(
			new CustomEvent(type, {
				detail,
				bubbles: true,
				cancelable: true,
			}),
		);
		eventTarget.dispatchEvent(
			new CustomEvent('*', {
				detail,
				bubbles: true,
				cancelable: true,
			}),
		);
	}
}

export default LoggerEventListener;
