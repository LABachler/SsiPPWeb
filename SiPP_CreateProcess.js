
let xmlFileModules = 'SiPP_Modules.xml';

function loadDoc() {
    let xhttp = new XMLHttpRequest();

    xhttp.open("GET", xmlFileModules, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            xmlFunctionModules(this.response);
        }
    };

}
function xmlFunctionModules(xml) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "text/xml");


    let moduleNames = xmlDoc.getElementsByTagName("module"); //array of all modules
    let createNewProcess = document.getElementById("createProcess");

    createNewProcess.addEventListener("click", function(){
        let tblData = document.getElementById("tblHistoryData");
        tblData.innerHTML = "";
        let tblHeader = document.getElementById("processName");
        tblHeader.innerHTML = "Create new process";

        let divEl = document.getElementsByClassName("wrapper");

        let selectModules = document.createElement("select");
        selectModules.name = "modules";
        selectModules.id = "modules";
        for(let mod of moduleNames)
        {
            let moduleOptions = document.createElement("option");
            moduleOptions.value = mod.getAttribute("name");
            moduleOptions.text = mod.getAttribute("name");
            selectModules.appendChild(moduleOptions);
        }

        let labelModules = document.createElement("label");
        labelModules.innerHTML = "Add module";

        document.getElementById("tablePosition").appendChild(labelModules).appendChild(selectModules);

    })
}





loadDoc();