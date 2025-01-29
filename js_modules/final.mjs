function getBasicSNRows() {
	const query = this.inputElement.value;
	const fetchUrl = `https://api.truemfg.com/api/SerialNumber/${query}/basic`;
	let htmlOutput = ""

	fetch(fetchUrl, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((fetchResponse) => {
		if (!fetchResponse.ok) {
			this.loaderElement.hidden = true;
			throw new Error("Fetch failed: " + fetchResponse.statusText);
		}
		return fetchResponse.json();
	}).then((data) => {
		const formatDate = (dateString) => {
			const date = new Date(dateString);
			const day = String(date.getDate()).padStart(2, "0");
			const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
			const year = date.getFullYear();
			return `${year}-${month}-${day}`;
		};
		let modelNumber = data.data[0].modelNumber || "";
		let modelCollectionLink = modelCategories.includes(
			modelNumber.toLowerCase()
		)
			? `/collections/${modelNumber.toLowerCase()}`
			: "";

		let modelInnerHtml = modelCollectionLink
			? `<a href = "${modelCollectionLink}">${modelNumber}</a>`
			: modelNumber;

		htmlOutput = `
		<tr> <td>Serial Number</td> <td>${data.data[0].serialNumber || "Invalid Serial Number"}</td></tr>
		<tr> <td>Model</td> <td>${modelInnerHtml}</td> </tr>
		<tr> <td>Ship Date</td> <td>${data.data[0].shipDate ? formatDate(data.data[0].shipDate) : ""}</td> </tr>
	`;
	}).then(() => {
		tableContent += additionalSNData(query);
	}).catch((error) => {
		console.error("Error:", error);
	});
}



function getAdditionalSNData(serialNumber) {

	let additionalRows = "";
	fetch(
		`https://api-test.truemfg.com/api/SerialNumber/${serialNumber}/customer`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Authorization: `Bearer ${token}`,
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				"shopifyGID": "22730414358894", //`gid://shopify/Customer/${__st.id}`,
			}),
		}
	)
		.then((response) => {
			if (!response.ok) {
				return response.json().then((errorData) => {
					throw new Error(errorData["data"][0]["error"] || "Data Problem");
				});
			}
			return response.json();
		})
		.then((data) => {
			if (!data["data"][0] || data["data"][0]["error"]) {
				reject("Data Problem");
			} else resolve(data["data"]);
		})
		.then((data) => {
			additionalRows = `
				<tr> <td>PO Number:</td> <td>${data.data[0].poNumber}</td> </tr>
				<tr> <td>Invoice:</td> <td>${data.data[0].invoiceNumber}</td> </tr>
				<tr> <td>Customer Number</td> <td>${data.customerNumber}</td> </tr>
				<tr> <td>Bill To:</td> <td>${data.data[0].billTo}</td> </tr>
				<tr> <td>Ship To</td> <td>${data.data[0].shipTo}</td> </tr>`;
		})
		.catch((error) => {
			console.error("Error:", error);
		});

	return additionalRows;
}