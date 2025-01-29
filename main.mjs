import { createTable } from "./js_modules/callback_hell.mjs";

const token =
	"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2IiwidW5pcXVlX25hbWUiOiJhcGlfYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJuYmYiOjE3MzgxNjE0ODQsImV4cCI6MTczODI0Nzg4NCwiaWF0IjoxNzM4MTYxNDg0fQ.950kBFyiydLGhOm0BqGGJZYyYYVCvu7tjDd9niY2vkWeES_NC6NM9laU1tuZ5n79Bq2Mpt5-wRKcta152D-pqg";

document.getElementById("fetch").addEventListener("click", (e) => {
	e.preventDefault();
	createTable();
});
