import logger from '../../dist';

// logger.setConfig({ isUseNative: true });

const onLog = (log) => {
	console.log(log);
};

logger.on('*', onLog);

logger.log('log', 'log message');
// logger.new().log('log', 'log message jjj');
// logger.info('info message');
// logger.warn('warn message');
// logger.error('error message');
// logger.dir({
// 	name: 'santanu',
// 	nested: {
// 		key1: 'value1',
// 		key2: 'value2',
// 	},
// });

function _getCallerFile() {
	var filename;
	let lineNumber;

	var _pst = Error.prepareStackTrace;
	Error.prepareStackTrace = function (err, stack) {
		return stack;
	};
	try {
		var err = new Error();
		var callerfile;
		var currentfile;

		currentfile = err.stack.shift().getFileName();

		while (err.stack.length) {
			callerfile = err.stack.shift().getFileName();
			lineNumber = err.stack.shift().getLineNumber();

			if (currentfile !== callerfile) {
				filename = callerfile;
				break;
			}
		}
	} catch (err) {}
	Error.prepareStackTrace = _pst;

	return filename + ':' + lineNumber;
}

// console.log(_getCallerFile());

logger.with('ddd').log('Test');

logger.label('Test').log('DDDDDDDDDDDDDD');

logger.dir({ name: 'sa', d: { f: '' } });

// logger.log = null;
// console.log(logger.print);
// logger.off('*', onLog);
