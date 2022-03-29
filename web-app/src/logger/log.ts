import { SeveritiesMap, StylesMap } from "./log.types";

const severities:SeveritiesMap = {
	"1": "FATAL",
	"2": "ERROR",
	"3": "WARN",
	"4": "INFO",
	"5": "DEBUG",
	"6": "TRACE"
};

const styles:StylesMap = {
	FATAL: [
		"color: #fff",
		"background-color: #000",
		"padding: 1px 8px",
		"border-radius: 4px"
	],
	ERROR: [
		"color: #ff0000",
		"background-color: #000",
		"padding: 1px 8px",
		"border-radius: 4px"
	],
	WARN: [
		"color: #ffe600",
		"background-color: #000",
		"padding: 1px 8px",
		"border-radius: 4px"
	],
	INFO: [
		"color: #0026ff",
		"background-color: #000",
		"padding: 1px 8px",
		"border-radius: 4px"
	],
	DEBUG: [
		"color: #00ff00",
		"background-color: #000",
		"padding: 1px 8px",
		"border-radius: 4px"
	],
	TRACE: [
		"color: #c300ff",
		"background-color: #000",
		"padding: 1px 8px",
		"border-radius: 4px"
	]
};

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
