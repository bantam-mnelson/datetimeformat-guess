const guessFormat = require('../dist/bundle.js');

describe('ISO 8601 extended date time formats', () => {
	test('# calendar date part', () => {
		expect(guessFormat('2020-10-10')).toBe('yyyy-MM-DD');
		expect(guessFormat('2020-10-10', 'strftime')).toBe('%Y-%m-%d');
	});

	test('# month date part', () => {
		expect(guessFormat('2020-10')).toBe('yyyy-MM');
		expect(guessFormat('2020-10', 'strftime')).toBe('%Y-%m');
	});

	test('# week date part', () => {
		expect(guessFormat('2013-W06-5')).toBe('yyyy-[W]WW-E');
		expect(guessFormat('2013-W06-5', 'strftime')).toBe('%Y-W%U-%u');
	});

	test('# ordinal date part', () => {
		expect(guessFormat('2013-039')).toBe('yyyy-DDDD');
		expect(guessFormat('2013-039', 'strftime')).toBe('%Y-%j');
	});

	test('# hour time part separated by a T', () => {
		expect(guessFormat('2013-02-08T09')).toBe('yyyy-MM-DDTHH');
		expect(guessFormat('2013-02-08T09', 'strftime')).toBe('%Y-%m-%dT%H');
	});

	test('# hour time part separated by a space', () => {
		expect(guessFormat('2013-02-08 09')).toBe('yyyy-MM-DD HH');
		expect(guessFormat('2013-02-08 09', 'strftime')).toBe('%Y-%m-%d %H');
	});

	test('# hour and minute time part', () => {
		expect(guessFormat('2013-02-08T09:30')).toBe('yyyy-MM-DDTHH:mm');
		expect(guessFormat('2013-02-08T09:30', 'strftime')).toBe('%Y-%m-%dT%H:%M');
	});

	test('# hour, minute, and second time part', () => {
		expect(guessFormat('2013-02-08T09:30:26')).toBe('yyyy-MM-DDTHH:mm:ss');
		expect(guessFormat('2013-02-08T09:30:26', 'strftime')).toBe('%Y-%m-%dT%H:%M:%S');
	});

	test('# hour, minute, second, and millisecond time part', () => {
		expect(guessFormat('2013-02-08T09:30:26.123')).toBe('yyyy-MM-DDTHH:mm:ss.SSS');
		expect(guessFormat('2013-02-08T09:30:26.123', 'strftime')).toBe('%Y-%m-%dT%H:%M:%S.%L');
	});

	test('# hour, minute, second, and millisecond time part, milliseconds separated by a comma', () => {
		expect(guessFormat('2013-02-08T09:30:26,123')).toBe('yyyy-MM-DDTHH:mm:ss,SSS');
		expect(guessFormat('2013-02-08T09:30:26,123', 'strftime')).toBe('%Y-%m-%dT%H:%M:%S,%L');
	});

	test('# calendar date part and hour time part', () => {
		expect(guessFormat('2013-02-08 09')).toBe('yyyy-MM-DD HH');
		expect(guessFormat('2013-02-08 09', 'strftime')).toBe('%Y-%m-%d %H');
	});

	test('# week date part and hour time part', () => {
		expect(guessFormat('2013-W06-5 09')).toBe('yyyy-[W]WW-E HH');
		expect(guessFormat('2013-W06-5 09', 'strftime')).toBe('%Y-W%U-%u %H');
	});

	test('# ordinal date part and hour time part', () => {
		expect(guessFormat('2013-039 09')).toBe('yyyy-DDDD HH');
		expect(guessFormat('2013-039 09', 'strftime')).toBe('%Y-%j %H');
	});

	test('# calendar date and time with hours and timezone +HH:mm', () => {
		expect(guessFormat('2013-02-08 09+07:00')).toBe('yyyy-MM-DD HHZ');
		expect(guessFormat('2013-02-08 09+07:00', 'strftime')).toBe('%Y-%m-%d %H%:z');
	});

	test('# calendar date and time with hours and timezone -HHmm', () => {
		expect(guessFormat('2013-02-08 09-0100')).toBe('yyyy-MM-DD HHZZ');
		expect(guessFormat('2013-02-08 09-0100', 'strftime')).toBe('%Y-%m-%d %H%z');
	});

	test('# calendar date and time with hours and timezone Z', () => {
		expect(guessFormat('2013-02-08 09Z')).toBe('yyyy-MM-DD HH[Z]');
		expect(guessFormat('2013-02-08 09Z', 'strftime')).toBe('%Y-%m-%d %HZ');
	});

	test('# calendar date and full time with timezone +HH:mm', () => {
		expect(guessFormat('2013-02-08 09:30:26.123+07:00')).toBe('yyyy-MM-DD HH:mm:ss.SSSZ');
		expect(guessFormat('2013-02-08 09:30:26.123+07:00', 'strftime')).toBe('%Y-%m-%d %H:%M:%S.%L%:z');
	});

	test('# calendar date and full time with timezone +HH', () => {
		expect(guessFormat('2013-02-08 09:30:26.123+07')).toBe('yyyy-MM-DD HH:mm:ss.SSSZ');
		expect(guessFormat('2013-02-08 09:30:26.123+07', 'strftime')).toBe('%Y-%m-%d %H:%M:%S.%L%:z');
	});
});


describe('ISO 8601 basic date time formats', () => {
	test('# basic (short) full date', () => {
		expect(guessFormat('20130208')).toBe('yyyyMMDD');
		expect(guessFormat('20130208', 'strftime')).toBe('%Y%m%d');
	});

	test('# basic (short) year+month', () => {
		expect(guessFormat('201303')).toBe('yyyyMM');
		expect(guessFormat('201303', 'strftime')).toBe('%Y%m');
	});

	test('# basic (short) year only', () => {
		expect(guessFormat('2013')).toBe('yyyy');
		expect(guessFormat('2013', 'strftime')).toBe('%Y');
	});

	test('# basic (short) week, weekday', () => {
		expect(guessFormat('2013W065')).toBe('yyyy[W]WWE');
		expect(guessFormat('2013W065', 'strftime')).toBe('%YW%U%u');
	});

	test('# basic (short) week only', () => {
		expect(guessFormat('2013W06')).toBe('yyyy[W]WW');
		expect(guessFormat('2013W06', 'strftime')).toBe('%YW%U');
	});

	test('# basic (short) ordinal date (year + day-of-year)', () => {
		expect(guessFormat('2013050')).toBe('yyyyDDDD');
		expect(guessFormat('2013050', 'strftime')).toBe('%Y%j');
	});

	test('# short date and time up to ms, separated by comma', () => {
		expect(guessFormat('20130208T080910,123')).toBe('yyyyMMDDTHHmmss,SSS');
		expect(guessFormat('20130208T080910,123', 'strftime')).toBe('%Y%m%dT%H%M%S,%L');
	});

	test('# short date and time up to ms', () => {
		expect(guessFormat('20130208T080910.123')).toBe('yyyyMMDDTHHmmss.SSS');
		expect(guessFormat('20130208T080910.123', 'strftime')).toBe('%Y%m%dT%H%M%S.%L');
	});

	test('# short date and time up to seconds', () => {
		expect(guessFormat('20130208T080910')).toBe('yyyyMMDDTHHmmss');
		expect(guessFormat('20130208T080910', 'strftime')).toBe('%Y%m%dT%H%M%S');
	});

	test('# short date and time up to minutes', () => {
		expect(guessFormat('20130208T0809')).toBe('yyyyMMDDTHHmm');
		expect(guessFormat('20130208T0809', 'strftime')).toBe('%Y%m%dT%H%M');
	});

	test('# short date and time, hours only', () => {
		expect(guessFormat('20130208T08')).toBe('yyyyMMDDTHH');
		expect(guessFormat('20130208T08', 'strftime')).toBe('%Y%m%dT%H');
	});

	test('# short date and time with hours and timezone +HH:mm', () => {
		expect(guessFormat('20130208T09+07:00')).toBe('yyyyMMDDTHHZ');
		expect(guessFormat('20130208T09+07:00', 'strftime')).toBe('%Y%m%dT%H%:z');
	});

	test('# short date and time with hours and timezone -HHmm', () => {
		expect(guessFormat('20130208T09-0100')).toBe('yyyyMMDDTHHZZ');
		expect(guessFormat('20130208T09-0100', 'strftime')).toBe('%Y%m%dT%H%z');
	});

	test('# short date and time with hours and timezone Z', () => {
		expect(guessFormat('20130208T09Z')).toBe('yyyyMMDDTHH[Z]');
		expect(guessFormat('20130208T09Z', 'strftime')).toBe('%Y%m%dT%HZ');
	});

	test('# short date and full time with timezone +HH:mm', () => {
		expect(guessFormat('20130208T093026.123+07:00')).toBe('yyyyMMDDTHHmmss.SSSZ');
		expect(guessFormat('20130208T093026.123+07:00', 'strftime')).toBe('%Y%m%dT%H%M%S.%L%:z');
	});

	test('# short date and full time with timezone +HH', () => {
		expect(guessFormat('20130208T093026.123+07')).toBe('yyyyMMDDTHHmmss.SSSZ');
		expect(guessFormat('20130208T093026.123+07', 'strftime')).toBe('%Y%m%dT%H%M%S.%L%:z');
	});
});
