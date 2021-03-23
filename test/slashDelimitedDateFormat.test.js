const guessFormat = require('../dist/bundle.js');

describe('Slash, dot or dash delimited date formats', () => {
	test('# yyyy/MM/DD', () => {
		expect(guessFormat('2020/01/01')).toBe('yyyy/MM/DD');
		expect(guessFormat('2020/01/01', 'strftime')).toBe('%Y/%m/%d');
	});

	test('# yyyy/MM/DD HH:mm z', () => {
		expect(guessFormat('2020/01/01 17:00 IST')).toBe('yyyy/MM/DD HH:mm z');
		expect(guessFormat('2020/01/01 17:00 IST', 'strftime')).toBe('%Y/%m/%d %H:%M %Z');
	});

	test('# yyyy/MM/DD hh:mm A z', () => {
		expect(guessFormat('2020/01/01 10:00 AM IST')).toBe('yyyy/MM/DD hh:mm a z');
		expect(guessFormat('2020/01/01 10:00 AM IST', 'strftime')).toBe('%Y/%m/%d %I:%M %p %Z');
	});

	test('# yyyy/MM/DD h A z', () => {
		expect(guessFormat('2020/01/01 1 AM IST')).toBe('yyyy/MM/DD h a z');
		expect(guessFormat('2020/01/01 1 AM IST', 'strftime')).toBe('%Y/%m/%d %-l %p %Z');
	});

	test('# yyyy/MM/DD hA z', () => {
		expect(guessFormat('2020/01/01 1AM IST')).toBe('yyyy/MM/DD ha z');
		expect(guessFormat('2020/01/01 1AM IST', 'strftime')).toBe('%Y/%m/%d %-l%p %Z');
	});

	test('# yyyy.MM.DD', () => {
		expect(guessFormat('2020.01.01')).toBe('yyyy.MM.DD');
		expect(guessFormat('2020.01.01', 'strftime')).toBe('%Y.%m.%d');
	});

	test('# yyyy-MM-DD', () => {
		expect(guessFormat('2020-01-01')).toBe('yyyy-MM-DD');
		expect(guessFormat('2020-01-01', 'strftime')).toBe('%Y-%m-%d');
	});

	test('# yyyy/MM', () => {
		expect(guessFormat('2020/01')).toBe('yyyy/MM');
		expect(guessFormat('2020/01', 'strftime')).toBe('%Y/%m');
	});

	test('# yyyy.MM', () => {
		expect(guessFormat('2020.01')).toBe('yyyy.MM');
		expect(guessFormat('2020.01', 'strftime')).toBe('%Y.%m');
	});

	test('# yyyy-MM', () => {
		expect(guessFormat('2020-01')).toBe('yyyy-MM');
		expect(guessFormat('2020-01', 'strftime')).toBe('%Y-%m');
	});

	test('# yyyy/M/D', () => {
		expect(guessFormat('2020/1/1')).toBe('yyyy/M/D');
		expect(() => guessFormat('2020/1/1', 'strftime')).toThrow();
	});

	test('# yyyy.M.D', () => {
		expect(guessFormat('2020.1.1')).toBe('yyyy.M.D');
		expect(() => guessFormat('2020.1.1', 'strftime')).toThrow();
	});

	test('# yyyy-M-D', () => {
		expect(guessFormat('2020-1-1')).toBe('yyyy-M-D');
		expect(() => guessFormat('2020-1-1', 'strftime')).toThrow();
	});

	test('# yyyy/M', () => {
		expect(guessFormat('2020/1')).toBe('yyyy/M');
		expect(() => guessFormat('2020/1', 'strftime')).toThrow();
	});

	test('# yyyy.M', () => {
		expect(guessFormat('2020.1')).toBe('yyyy.M');
		expect(() => guessFormat('2020.1', 'strftime')).toThrow();
	});

	test('# yyyy-M', () => {
		expect(guessFormat('2020-1')).toBe('yyyy-M');
		expect(() => guessFormat('2020-1', 'strftime')).toThrow();
	});

	test('# error on month overflow', () => {
		expect(() => {
			guessFormat('2020/13/01')
		}).toThrow(new Error("Couldn't parse date"));
	});

	test('# error on month underflow', () => {
		expect(() => {
			guessFormat('2020/0/01')
		}).toThrow(new Error("Couldn't parse date"));
	});

	test('# error on day overflow', () => {
		expect(() => {
			guessFormat('2020/13/32')
		}).toThrow(new Error("Couldn't parse date"));
	});

	test('# error on day underflow', () => {
		expect(() => {
			guessFormat('2020/13/0')
		}).toThrow(new Error("Couldn't parse date"));
	});

	test('# error on month underflow(short date)', () => {
		expect(() => {
			guessFormat('2020/00')
		}).toThrow(new Error("Couldn't parse date"));
	});

	test('# error on month overflow(short date)', () => {
		expect(() => {
			guessFormat('2020/13')
		}).toThrow(new Error("Couldn't parse date"));
	});

	// MM can be in [01, 12] | M can be in [1, 12]
	// DD can be in [01, 31] | D can be in [1, 31]
	// yyyy can be in [0000, 9999] | yy can be in [00, 99]

	test('# MM, DD in range [01, 12] slash delimited', () => {
		let result = guessFormat('01/02/2020');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['MM/DD/yyyy', 'DD/MM/yyyy']));

		result = guessFormat('01/02/2020', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%d/%m/%Y", "%m/%d/%Y"]));

	});

	test('# MM, DD in range [01, 12] dot delimited', () => {
		let result = guessFormat('01.02.2020');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['MM.DD.yyyy', 'DD.MM.yyyy']));

		result = guessFormat('01.02.2020', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%d.%m.%Y", "%m.%d.%Y"]));

	});

	test('# MM, DD in range [01, 12] dash delimited', () => {
		let result = guessFormat('01-02-2020');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['MM-DD-yyyy', 'DD-MM-yyyy']));

		result = guessFormat('01-02-2020', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%d-%m-%Y", "%m-%d-%Y"]));

	});

	test('# MM in range [01, 12], DD in range [13, 31] slash delimted', () => {
		expect(guessFormat('01/31/2020')).toBe('MM/DD/yyyy');
		expect(guessFormat('01/31/2020', 'strftime')).toBe('%m/%d/%Y');
	});

	test('# MM in range [01, 12], DD in range [13, 31] dot delimted', () => {
		expect(guessFormat('01.31.2020')).toBe('MM.DD.yyyy');
		expect(guessFormat('01.31.2020', 'strftime')).toBe('%m.%d.%Y');
	});

	test('# MM in range [01, 12], DD in range [13, 31] dash delimted', () => {
		expect(guessFormat('01-31-2020')).toBe('MM-DD-yyyy');
		expect(guessFormat('01-31-2020', 'strftime')).toBe('%m-%d-%Y');
	});

	test('# DD/MM/yyyy', () => {
		expect(guessFormat('13/01/2020')).toBe('DD/MM/yyyy');
		expect(guessFormat('13/01/2020', 'strftime')).toBe('%d/%m/%Y');
	});

	test('# DD/MM/yyyy hh:mm a z', () => {
		expect(guessFormat('13/01/2020 01:00 pm EST')).toBe('DD/MM/yyyy hh:mm a z');
		expect(guessFormat('13/01/2020 01:00 pm EST', 'strftime')).toBe('%d/%m/%Y %I:%M %P %Z');
	});

	test('# DD.MM.yyyy', () => {
		expect(guessFormat('13.01.2020')).toBe('DD.MM.yyyy');
		expect(guessFormat('13.01.2020', 'strftime')).toBe('%d.%m.%Y');
	});

	test('# DD-MM-yyyy', () => {
		expect(guessFormat('13-01-2020')).toBe('DD-MM-yyyy');
		expect(guessFormat('13-01-2020', 'strftime')).toBe('%d-%m-%Y');
	});

	test('# DD-MMM-yyyy', () => {
		expect(guessFormat('13-Jan-2020')).toBe('DD-MMM-yyyy');
		expect(guessFormat('13-Jan-2020', 'strftime')).toBe('%d-%b-%Y');
	});

	test('# DD-MMM-yyyy, hh:mm am|pm Z', () => {
		expect(guessFormat('13-Jan-2020, 10:00 am IST')).toBe('DD-MMM-yyyy, hh:mm a z');
		expect(guessFormat('13-Jan-2020, 10:00 am IST', 'strftime')).toBe('%d-%b-%Y, %I:%M %P %Z');
	});

	test('# DD-MMM-yy', () => {
		expect(guessFormat('13-Jan-20')).toBe('DD-MMM-yy');
		expect(guessFormat('13-Jan-20', 'strftime')).toBe('%d-%b-%y');
	});

	test('# DD-MMM-yy, ham|pm', () => {
		expect(guessFormat('13-Jan-20, 1am')).toBe('DD-MMM-yy, ha');
		expect(guessFormat('13-Jan-20, 1am', 'strftime')).toBe('%d-%b-%y, %-l%P');
	});

	test('# MM, DD out of range', () => {
		expect(() => {
			guessFormat('99/99/2020')
		}).toThrow(new Error("Couldn't parse date"));
	});

	test('# MM, DD, yy in range [01, 12] slash delimited', () => {
		let result = guessFormat('01/02/03');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['yy/MM/DD', 'MM/DD/yy', 'DD/MM/yy']));

		result = guessFormat('01/02/03', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y/%m/%d", "%d/%m/%y", "%m/%d/%y"]));

	});

	test('# MM, DD, yy in range [01, 12] slash delimited with time', () => {
		let result = guessFormat('01/02/03 10:00 PM');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['yy/MM/DD hh:mm a', 'MM/DD/yy hh:mm a', 'DD/MM/yy hh:mm a']));

		result = guessFormat('01/02/03 10:00 PM', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y/%m/%d %I:%M %p", "%d/%m/%y %I:%M %p", "%m/%d/%y %I:%M %p"]));

	});

	test('# MM, DD, yy in range [01, 12] dot delimited', () => {
		let result = guessFormat('01.02.03');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(4);
		expect(result).toEqual(expect.arrayContaining(['yy.MM.DD', 'MM.DD.yy', 'DD.MM.yy', 'HH.mm.ss']));

		result = guessFormat('01.02.03', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(4);
		expect(result).toEqual(expect.arrayContaining(["%y.%m.%d", "%d.%m.%y", "%m.%d.%y", "%H.%M.%S"]));
	});

	test('# MM, DD, yy in range [01, 12] dot delimited with colon delimited time', () => {
		let result = guessFormat('01.02.03 10:00 PDT');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['yy.MM.DD HH:mm z', 'MM.DD.yy HH:mm z', 'DD.MM.yy HH:mm z']));

		result = guessFormat('01.02.03 10:00 PDT', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y.%m.%d %H:%M %Z", "%d.%m.%y %H:%M %Z", "%m.%d.%y %H:%M %Z"]));

	});

	test('# MM, DD, yy in range [01, 12] dot delimited with dot delimited time', () => {
		let result = guessFormat('01.02.03 10.00 PDT');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['yy.MM.DD HH.mm z', 'MM.DD.yy HH.mm z', 'DD.MM.yy HH.mm z']));

		result = guessFormat('01.02.03 10.00 PDT', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y.%m.%d %H.%M %Z", "%d.%m.%y %H.%M %Z", "%m.%d.%y %H.%M %Z"]));
	});

	test('# MM, DD, yy in range [01, 12] dash delimited', () => {
		let result = guessFormat('01-02-03');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['yy-MM-DD', 'MM-DD-yy', 'DD-MM-yy']));

		result = guessFormat('01-02-03', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y-%m-%d", "%d-%m-%y", "%m-%d-%y"]));
	})

	test('# yy in range [13, 31] placed first, slash delimited', () => {
		let result = guessFormat('13/02/01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['yy/MM/DD', 'DD/MM/yy']));

		result = guessFormat('13/02/01', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%y/%m/%d", "%d/%m/%y"]));
	});

	test('# yy in range [13, 31] placed first, dot delimited', () => {
		let result = guessFormat('13.02.01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['yy.MM.DD', 'DD.MM.yy', 'HH.mm.ss']));

		result = guessFormat('13.02.01', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y.%m.%d", "%d.%m.%y", "%H.%M.%S"]));

	});

	test('# DD/MM/yy', () => {
		expect(guessFormat('31/01/70')).toBe('DD/MM/yy');
		expect(guessFormat('31/01/70', 'strftime')).toBe('%d/%m/%y');
	});

	test('# DD.MM.yy', () => {
		expect(guessFormat('31.01.70')).toBe('DD.MM.yy');
		expect(guessFormat('31.01.70', 'strftime')).toBe('%d.%m.%y');
	});

	test('# DD-MM-yy', () => {
		expect(guessFormat('31-01-70')).toBe('DD-MM-yy');
		expect(guessFormat('31-01-70', 'strftime')).toBe('%d-%m-%y');
	});

	test('# MM/DD/yy', () => {
		expect(guessFormat('12/31/70')).toBe('MM/DD/yy');
		expect(guessFormat('12/31/70', 'strftime')).toBe('%m/%d/%y');
	});

	test('# MM.DD.yy', () => {
		expect(guessFormat('12.31.70')).toBe('MM.DD.yy');
		expect(guessFormat('12.31.70', 'strftime')).toBe('%m.%d.%y');
	});

	test('# MM-DD-yy', () => {
		expect(guessFormat('12-31-70')).toBe('MM-DD-yy');
		expect(guessFormat('12-31-70', 'strftime')).toBe('%m-%d-%y');
	});

	test('# yy/MM/DD', () => {
		expect(guessFormat('70/12/31')).toBe('yy/MM/DD');
		expect(guessFormat('70/12/31', 'strftime')).toBe('%y/%m/%d');
	});

	test('# yy.MM.DD', () => {
		expect(guessFormat('70.12.31')).toBe('yy.MM.DD');
		expect(guessFormat('70.12.31', 'strftime')).toBe('%y.%m.%d');
	});

	test('# yy-MM-DD', () => {
		expect(guessFormat('70-12-31')).toBe('yy-MM-DD');
		expect(guessFormat('70-12-31', 'strftime')).toBe('%y-%m-%d');
	});

	test('# MM, DD in range[01, 12] short form, slash delimited', () => {
		let result = guessFormat('01/01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['yy/MM', 'DD/MM', 'MM/DD']));

		result = guessFormat('01/01', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y/%m", "%d/%m", "%m/%d"]));
	});

	test('# MM, DD in range[01, 12] short form, dot delimited', () => {
		let result = guessFormat('01.01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(4);
		expect(result).toEqual(expect.arrayContaining(['yy.MM', 'DD.MM', 'MM.DD', 'HH.mm']));

		result = guessFormat('01.01', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(4);
		expect(result).toEqual(expect.arrayContaining(["%y.%m", "%d.%m", "%m.%d", "%H.%M"]));
	});

	test('# MM, DD in range[01, 12] short form, dash delimited', () => {
		let result = guessFormat('01-01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['yy-MM', 'DD-MM', 'MM-DD']));

		result = guessFormat('01-01', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y-%m", "%d-%m", "%m-%d"]));
	});

	test('# MM/DD', () => {
		expect(guessFormat('12/31')).toBe('MM/DD');
		expect(guessFormat('12/31', 'strftime')).toBe('%m/%d');
	});

	test('# MM.DD', () => {
		let result = guessFormat('12.31');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['MM.DD', 'HH.mm']));

		result = guessFormat('12.31', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%m.%d", "%H.%M"]));
	});

	test('# MM-DD', () => {
		expect(guessFormat('12-31')).toBe('MM-DD');
		expect(guessFormat('12-31', 'strftime')).toBe('%m-%d');
	});

	test('# DD/MM | yy/MM', () => {
		let result = guessFormat('31/12');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['DD/MM', 'yy/MM']));

		result = guessFormat('31/12', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%y/%m", "%d/%m"]));
	});

	test('# DD.MM | yy.MM', () => {
		let result = guessFormat('31.12');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['DD.MM', 'yy.MM']));

		result = guessFormat('31.12', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%y.%m", "%d.%m"]));
	});

	test('# DD-MM | yy-MM', () => {
		let result = guessFormat('31-12');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['DD-MM', 'yy-MM']));

		result = guessFormat('31-12', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%y-%m", "%d-%m"]));
	});
});
