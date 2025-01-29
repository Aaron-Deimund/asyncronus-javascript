import { createTable } from "./js_modules/callbackHell.mjs";

document.getElementById("fetch").addEventListener("click", (e) => {
	e.preventDefault();
	createTable();
});
