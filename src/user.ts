export default class LoggerUser {
	_state: any;
	get() {
		return this._state;
	}
	set(state: any) {
		this._state = state;
	}
}
