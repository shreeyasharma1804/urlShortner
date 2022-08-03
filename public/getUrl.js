function populateTableBody() {
    
    data = JSON.parse(sessionStorage.getItem("data"));

    var newTableBody = document
        .getElementById("tableToBeRendered")
        .getElementsByTagName("tbody")[0];

    let row = newTableBody.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(0);

    cell2.innerHTML = data.Result.fullUrl;

    var link = document.createElement("a");
    link.setAttribute("href", "/url?shortUrl="+data.Result.shortUrl);
    // link.setAttribute("href", data.Result.fullUrl);
    link.className = "someCSSclass";

    var linkText = document.createTextNode("/" + data.Result.shortUrl);
    link.appendChild(linkText);
    cell1.appendChild(link);
}

populateTableBody();
