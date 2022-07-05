import logger from '../dist';

describe('blah', () => {
	it('works', () => {
		logger.log('log', 'log message');
		logger.info('info message');
		logger.warn('warn message');
		logger.error('error message');
		logger.dir({
			name: 'santanu',
			nested: {
				key1: 'value1',
				key2: 'value2',
			},
		});
	});
});
