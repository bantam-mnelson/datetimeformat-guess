import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class DayOfYearFormatTokenAssigner implements IAssigner {
	public readonly name: string;
	public readonly type: string;

	private _map: Map<RegExp, string>;

	constructor(name, type) {
		this.name = name;
		this.type = type;
		this._map = new Map();

		this._map.set(/\d{1,3}/, 'DDD');
		this._map.set(/\d{3}/, 'DDDD');
		this._map.set(/\d{1,3}(?:st|nd|rd|th)/, 'DDDo');
	}

	private _testTokenType(token: Token): boolean {
		return token.getType() === this.type;
	}

	public assign(token: Token): void {
		this._map.forEach((formatToken, pattern) => {
			if (this._testTokenType(token) && pattern.test(token.getValue())) {
				token.setFormat(formatToken);
			}
		});
	}
}

export default DayOfYearFormatTokenAssigner;
