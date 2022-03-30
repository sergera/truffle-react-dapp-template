import { severities, styles } from './log.constants';

import { LogArguments } from './log.types';

const getStyles = (sevString: string) => {
	return styles[sevString].join(";") + ";";
};

const log = ({sev, msg, name}: LogArguments) => {
	const sevString = severities[sev];
	const styles = getStyles(sevString);
	const groupLog = name ? `%c${sevString}: ${name}` : `%c${sevString}`;

	console.group(groupLog, styles);
		console.log(`%c${msg}`, styles);
			console.groupCollapsed(`%cstack trace`, styles);
			console.trace();
			console.groupEnd();
	console.groupEnd();
};

export default log;
