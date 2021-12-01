
/*const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

// this example reads the file synchronously
// you can read it asynchronously also
let xml_string = fs.readFileSync("SiPP_modules.xml", "utf8");

parser.parseString(xml_string, function(error, result) {
    if(error === null) {
        console.log(result);
        console.log("helouuuuuuuuu");
    }
    else {
        console.log(error);
    }
});
*/
var xmlFile = 'SiPP_modules.xml';

function loadDoc() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", xmlFile, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            xmlFunction(this.response);
        }
    };

}
/*
function myFunction(parameter) {
    let x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("value", parameter.type);
    document.body.appendChild(x);
    return x;
}*/
function makeTextArea(value) {
    let ta = document.createElement('TEXTAREA');
    ta.innerHTML = value;
    ta.value = value;
    ta.className = 'textAreas';
    ta.id = value;
    ta.rows = 4;
    ta.cols = 40;
    ta.disabled = true;
    ta.style = "overflow:auto;resize:none";
    //ta.addEventListener('click', myFunction(param));
    document.body.appendChild(ta);
    return ta;
}
function xmlFunction(xml) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "text/xml");
    let x = xmlDoc.getElementsByTagName("module");
    for (let elem of x) {

        let table = document.getElementById("myTableData");
        let subTable = document.getElementById("mySubTableData")
        let rowCount = table.rows.length;
        let subTableRowCount = subTable.rows.length;
        let row = table.insertRow(rowCount);
        let nextRow = table.insertRow(rowCount+1);
        let subRow = subTable.insertRow(subTableRowCount);
        //let text = elem.getAttribute('name') + "\n      " +elem.childNodes.item(0).nextSibling.getAttribute('name') +
        //  "       " + elem.childNodes.item(0).nextSibling.getAttribute('engineering_unit');
        //row.setAttribute("colspan", "2");
        //row.insertCell(0).firstChild = makeTextArea(text);

        //inserting values in the tables
        row.insertCell(0).innerHTML = elem.getAttribute('name');
        subRow.insertCell(0).innerHTML = elem.childNodes.item(0).nextSibling.getAttribute('name');
        subRow.insertCell(1).innerHTML = elem.childNodes.item(0).nextSibling.getAttribute('engineering_unit');
        nextRow.insertCell(0).innerHTML = "↓";
    }
}
loadDoc();

