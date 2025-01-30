export function createTable() {
	let username = document.getElementById("user-name").value;
	let password = document.getElementById("password").value;
	let customerNumber = document.getElementById("customer-number").value;
	let serialNumber = document.getElementById("serial-number").value;
	let token = "";
	let accumulator = {};

	// Perform the login request to get the token
	fetch("https://api-test.truemfg.com/api/Auth/Login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: username,
			password: password
		})
	})
		.then(response => response.json())
		.then(data => {
			token = data["data"];
			console.log("Token:", token);
			return getBasicSNData(token, serialNumber, accumulator);
		})
		.then(() => {
			return getCustomerSNData(token, customerNumber, serialNumber, accumulator);
		})
		.then(() => {
			displayTable(accumulator);
		})
		.catch(error => {
			console.log("Error:", error);
		});
}

function getBasicSNData(token, serialNumber, accumulator) {
	return fetch(`https://api-test.truemfg.com/api/SerialNumber/${serialNumber}/basic`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	})
		.then(response => {
			if (!response.ok) {
				throw new Error(`Error fetching basic serial number data: ${response.statusText}`);
			}
			return response.json();
		})
		.then(response => {
			Object.assign(accumulator, response.data[0]);
			console.log("Serial Number Data:", response.data[0]);
		})
		.catch(error => {
			console.log("Error fetching basic serial number data:", error);
		});
}

function getCustomerSNData(token, customerNumber, serialNumber, accumulator) {
	return fetch(`https://api-test.truemfg.com/api/SerialNumber/${serialNumber}/customer`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify({
			shopifyGID: customerNumber
		})
	})
		.then(response => {
			if (!response.ok) {
				throw new Error(`Error getting customer data: ${response.statusText}`);
			}
			return response.json();
		})
		.then(response => {
			Object.assign(accumulator, response.data[0]);
			console.log("Customer Data Retrieved Successfully:", response.data[0]);
			console.log("All the data:", accumulator);
		})
		.catch(error => {
			console.log("Error getting customer data:", error);
		});
}

function displayTable(accumulator) {
	let outputContainer = document.getElementById('output');
	let outputContent =`
	<table>
		<tr> <td>Serial Number</td> <td>${accumulator.serialNumber || "Invalid Serial Number"}</td></tr>
	 	<tr> <td>Model</td> <td>${accumulator.modelNumber}</td> </tr>
	 	<tr> <td>Ship Date</td> <td>${accumulator.shipDate || ""}</td> </tr>`
	 if(accumulator.customerNumber) outputContent += `
		<tr> <td>PO Number:</td> <td>${accumulator.poNumber}</td> </tr>
		<tr> <td>Invoice:</td> <td>${accumulator.invoiceNumber}</td> </tr>
		<tr> <td>Customer Number</td> <td>${accumulator.customerNumber}</td> </tr>
		<tr> <td>Bill To:</td> <td>${accumulator.billTo}</td> </tr>
		<tr> <td>Ship To</td> <td>${accumulator.shipTo}</td> </tr>`

	outputContent += "</table>"
	outputContainer.innerHTML = outputContent;
}