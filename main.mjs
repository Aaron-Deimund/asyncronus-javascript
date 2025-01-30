import { createTable } from "./js_modules/fetch.mjs";

document.getElementById("fetch").addEventListener("click", (e) => {
	e.preventDefault();
	createTable();
});
