
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
var xmlFile = 'SiPP_Processes.xml';

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
//toggle sidebar function
$(document).ready(function () {
    $('#homeSubmenu').on('click', function () {
        $('#data-toggle').toggleClass('active');
    });
});

function xmlFunction(xml) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "text/xml");
    let processName = xmlDoc.getElementsByTagName("process"); //array of all processes
    let processModules = xmlDoc.getElementsByTagName("module_instance"); // array of all module instances
    let processList = document.getElementById("pageSubmenu");  //list of all saved processes

    //console.log(processName.getAttribute("name"));
    for(let process of processName){
        let listItem = document.createElement("li");
        let paramItem = document.createElement("a");
        paramItem.setAttribute("href", "#");
        let paramText = document.createTextNode(process.getAttribute("name"));
        paramItem.appendChild(paramText);
        listItem.appendChild(paramItem);
        processList.appendChild(listItem);
    }

    for (let elem of processModules) {

        //Main Table
        let tblHistoryData = document.getElementById("tblHistoryData");
        let row = tblHistoryData.insertRow(-1);




        //inserting values in the tables
        row.insertCell(-1).innerHTML = tblHistoryData.rows.length.toString();
        row.insertCell(-1).innerHTML = elem.getAttribute('type');

        let parameters = elem.getElementsByTagName("param");

        for (let param of parameters){
            //Sub Table
            let subTable = document.createElement("table");
            let subRow = subTable.insertRow(-1);
            subTable.setAttribute("class", "parameters")
            subRow.insertCell(-1).innerHTML = param.getAttribute('name');
            subRow.insertCell(-1);
            subRow = subTable.insertRow(-1);
            subRow.insertCell(-1).innerHTML = param.textContent;
            subRow.insertCell(-1).innerHTML = param.getAttribute('engineering_unit');
           // subRow.insertCell(-1);
            subRow = subTable.insertRow(-1);
            let cell = document.createElement("td");
            cell.appendChild(subTable);
            row.appendChild(cell);

        }
    }
}
loadDoc();

