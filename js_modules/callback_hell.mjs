export function createTable() {
	let userName = document.getElementById("user-name");
	let password = document.getElementById("password");
	let customerNumber = document.getElementById("customer-number");
	let serialNumber = document.getElementById("serial-number");
	let output = document.getElementById("output");
	let content = "";

	let statuses = [];
	let xhr = new XMLHttpRequest();

	xhr.open("GET", "https://catfact.ninja/fact");
	xhr.onload = ()=>{
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				let r = JSON.parse(xhr.responseText);
				alert("hi");
				console.log(r);
			}
		}
		alert("jello");
		//statuses = JSON.parse(xhr.responseText)
		//output.innerHTML = statuses;
	}
}