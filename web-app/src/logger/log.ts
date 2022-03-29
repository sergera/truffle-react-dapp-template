import { severities, styles } from './log.constants';

const getStyles = (sevString: string) => {
	return styles[sevString].join(";") + ";";
}

const log = (sev: number, msg: string) => {
	let sevString = severities[sev];
	let styles = getStyles(sevString);
	console.group(`%c${sevString}`,styles);
	console.log(`%c${msg}`,styles);
	console.groupCollapsed(`%cstack trace`,styles);
	console.trace();
	console.groupEnd();
	console.groupEnd();
};

export default log;
