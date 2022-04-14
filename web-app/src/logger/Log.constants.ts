import { SeveritiesMap, StylesMap } from "./Log.types";

export const SEVERITIES: SeveritiesMap = {
	"1": "FATAL",
	"2": "ERROR",
	"3": "WARN",
	"4": "INFO",
	"5": "DEBUG",
	"6": "TRACE"
};

export const STYLES: StylesMap = {
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
