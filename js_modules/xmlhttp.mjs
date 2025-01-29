export function createTable() {
    let username = document.getElementById("user-name").value;
    let password = document.getElementById("password").value;
    let customerNumber = document.getElementById("customer-number").value;
    let serialNumber = document.getElementById("serial-number").value;
    let output = document.getElementById("output");
    let content = "";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api-test.truemfg.com/api/Auth/Login", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let r = JSON.parse(xhr.responseText);
                let token = r["data"]; // Assuming "data" contains the JWT token
                console.log("Token:", token);

                // Now make the second API call using the token
                fetchDataWithToken(token,customerNumber, serialNumber);
            } else {
                console.log("Error:", xhr.status, xhr.responseText);
            }
        }
    };

    let data = JSON.stringify({
        username: username,
        password: password
    });

    xhr.send(data);
}

function fetchDataWithToken(token, customerNumber, serialNumber) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https:/api-test.truemfg.com/api/SerialNumber/${serialNumber}/basic`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                console.log("Data:", response);
				postCustomerData(token, customerNumber, serialNumber);
            } else {
                console.log("Error:", xhr.status, xhr.responseText);
            }
        }
    };

    xhr.send();
}

function postCustomerData(token, customerNumber, serialNumber) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api-test.truemfg.com/api/SerialNumber/${serialNumber}/customer`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("Customer Data Submitted Successfully:", JSON.parse(xhr.responseText));
            } else {
                console.log("Error submitting customer data:", xhr.status, xhr.responseText);
            }
        }
    };

    let data = JSON.stringify({
        shopifyGID: customerNumber
    });

    xhr.send(data);
}