export function createTable() {
    let username = document.getElementById("user-name").value;
    let password = document.getElementById("password").value;
    let customerNumber = document.getElementById("customer-number").value;
    let serialNumber = document.getElementById("serial-number").value;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api-test.truemfg.com/api/Auth/Login", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let r = JSON.parse(xhr.responseText);
                let token = r["data"];
                console.log("Token:", token);

                // Callback hell starts here
                let xhr2 = new XMLHttpRequest();
                xhr2.open("GET", `https://api-test.truemfg.com/api/SerialNumber/${serialNumber}/basic`, true);
                xhr2.setRequestHeader("Content-Type", "application/json");
                xhr2.setRequestHeader("Authorization", `Bearer ${token}`);

                xhr2.onreadystatechange = function () {
                    if (xhr2.readyState === 4) {
                        if (xhr2.status === 200) {
                            let response = JSON.parse(xhr2.responseText);
                            console.log("Data:", response);

                            let xhr3 = new XMLHttpRequest();
                            xhr3.open("POST", `https://api-test.truemfg.com/api/SerialNumber/${serialNumber}/customer`, true);
                            xhr3.setRequestHeader("Content-Type", "application/json");
                            xhr3.setRequestHeader("Authorization", `Bearer ${token}`);

                            xhr3.onreadystatechange = function () {
                                if (xhr3.readyState === 4) {
                                    if (xhr3.status === 200) {
                                        console.log("Customer Data Submitted Successfully:", JSON.parse(xhr3.responseText));
                                    } else {
                                        console.log("Error submitting customer data:", xhr3.status, xhr3.responseText);
                                    }
                                }
                            };

                            let data3 = JSON.stringify({
                                shopifyGID: customerNumber
                            });

                            xhr3.send(data3);
                        } else {
                            console.log("Error:", xhr2.status, xhr2.responseText);
                        }
                    }
                };

                xhr2.send();
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