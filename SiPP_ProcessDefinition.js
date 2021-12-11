
let xmlFile = 'SiPP_Processes.xml';

function loadDoc() {
    let xhttp = new XMLHttpRequest();

    xhttp.open("GET", xmlFile, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            xmlFunction(this.response);
        }
    };

}
function readData(process, processName, processTimes){
    //Main Table
    let tblHistoryData = document.getElementById("tblHistoryData");
    tblHistoryData.innerHTML="";
    let row = tblHistoryData.insertRow(-1);
    let header = document.getElementById("processName");
    header.style.cssText ='background-color: white; border-radius:10px'
    header.innerHTML = process.getAttribute("name")+ '-' + process.getAttribute("default_quantity");

    let nextRow;
    let lastProcessTime = "0";
    let i = 0;
    let rowNum = 1;


    for (let elem of processName) {

        //check if processes are not running parallel
        if(lastProcessTime !== processTimes[i].textContent){
            row = tblHistoryData.insertRow(-1);
            nextRow = tblHistoryData.insertRow(-1);
            row.insertCell(-1).innerHTML = rowNum.toString();
            rowNum++; // row numbers for processes
            nextRow.insertCell(-1).innerHTML = "";
        }

        //inserting values in the tables

        row.insertCell(-1).innerHTML = elem.getAttribute('type');

        let parameters = elem.getElementsByTagName("param");
        let paramNr = 0;
        for (let param of parameters){
            //Sub Table
            let subTable = document.createElement("table");
            let subRow = subTable.insertRow(-1);
            subTable.style.cssText = 'background-color: white; border-color: white'
            subRow.insertCell(-1).innerHTML = param.getAttribute('name');
            subRow.insertCell(-1).innerHTML = "Unit";
            subRow = subTable.insertRow(-1);
            subRow.insertCell(-1).innerHTML = param.textContent;
            subRow.insertCell(-1).innerHTML = param.getAttribute('engineering_unit');
            subRow = subTable.insertRow(-1);

            let cell = document.createElement("td");
            cell.appendChild(subTable);
            cell.style.cssText = ' background-color: #a8acb7; width: 100%; color: blue; border: #7386D5; table-layout: fixed'
            if(paramNr > 0){
                row.insertCell(-1).innerHTML = "";
            }

            nextRow.appendChild(cell);
            paramNr++;

        }
        lastProcessTime = processTimes[i].textContent; // save current time-started to check
                                                       // if next process runns parallel with this one

        i++;
    }

}
function xmlFunction(xml) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "text/xml");
    let processName = xmlDoc.getElementsByTagName("process"); //array of all processes
    let processList = document.getElementById("pageSubmenu");  //list of all saved processes
    //console.log(processName.getAttribute("name"));
    for(let process of processName){
        let listItem = document.createElement("li");
        let aItem = document.createElement("a");
        aItem.setAttribute("href", "#");
        aItem.setAttribute("id", process.getAttribute("name"));

        aItem.addEventListener("click", function (){
            let processModules = process.getElementsByTagName("module_instance");
            let processTimes = process.getElementsByTagName("time_started");
            readData(process,processModules, processTimes);
        })

        let paramText = document.createTextNode(process.getAttribute("name"));
        aItem.appendChild(paramText);
        listItem.appendChild(aItem);
        processList.appendChild(listItem);
    }
}
loadDoc();

