import { SEVERITIES, STYLES } from './Log.constants';

import { LogArguments } from './Log.types';

const getStyles = (severity: string) => {
	return STYLES[severity].join(";") + ";";
};

export class Log {
	private static _log(severity: string, msg: string, description?: string) {
		const styles = getStyles(severity);
		const groupLog = description ? `%c${severity}: ${description}` : `%c${severity}`;
	
		console.group(groupLog, styles);
			console.log(`%c${msg}`, styles);
				console.groupCollapsed(`%cstack trace`, styles);
				console.trace();
				console.groupEnd();
		console.groupEnd();
	}

	public static fatal({msg, description}: LogArguments) {
		this._log(SEVERITIES[1], msg, description);
	}

	public static error({msg, description}: LogArguments) {
		this._log(SEVERITIES[2], msg, description);
	}

	public static warn({msg, description}: LogArguments) {
		this._log(SEVERITIES[3], msg, description);
	}

	public static info({msg, description}: LogArguments) {
		this._log(SEVERITIES[4], msg, description);
	}

	public static debug({msg, description}: LogArguments) {
		this._log(SEVERITIES[5], msg, description);
	}

	public static trace({msg, description}: LogArguments) {
		this._log(SEVERITIES[6], msg, description);
	}
};
