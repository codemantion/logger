import {Type} from "./index";

class LoggerEventListener extends EventTarget {
  on(type: Type | '*', listener: EventListener): void {
    if (type !== '*' && type !== 'log'&& type !== 'error' && type !== 'warn' && type !== 'info' && type !== 'dir')
      throw new Error('Invalid event type');
    this.addEventListener(type, listener);
  }

  off(type: Type | '*', listener: EventListener): void {
    if (type !== '*' && type !== 'log'&& type !== 'error' && type !== 'warn' && type !== 'info' && type !== 'dir')
      throw new Error('Invalid event type');
    this.removeEventListener(type, listener);
  }

  dispatch(type: Type, messages: any[], originalMessages: any[]): void {
    const detail = {
      type,
      messages,
      originalMessages
    };
    this.dispatchEvent(new CustomEvent(type, {
      detail,
      bubbles: true,
      cancelable: true
    }));
    this.dispatchEvent(new CustomEvent('*', {
      detail,
      bubbles: true,
      cancelable: true
    }));
  }
}

export default LoggerEventListener;