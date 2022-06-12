
function getUrl() {
    body = { fullUrl: document.getElementById("fullUrl").value };

    fetch("/getShortUrl", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(body),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data["Error"]) {
                alert("Error!");
                window.location = "/";
            } else {
                sessionStorage.setItem("data", JSON.stringify(data));
                window.location = "./getUrl.html";
            }
        });
}


