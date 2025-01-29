export function createTable() {
	let userName = document.getElementById("user-name");
	let password = document.getElementById("password");
	let customerNumber = document.getElementById("customer-number");
	let serialNumber = document.getElementById("serial-number");
	let output = document.getElementById("output");
	let content = "";

	fetch("https://catfact.ninja/fact").then(response=>{		
		return response.json();
	}).then(data=>{
		console.log(data);
	});

}