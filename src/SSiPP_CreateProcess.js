/**
 * enables a user to create a new process
 * @author Naida Ciric
 * @version 3
 * @file XMLParser.js
 * */
import * as XMLParser from './XMLParser.js';
import * as APICalls from './APICalls.js';

let menuItemCreateNewProcess = document.getElementById("createProcess");//menu item
let divMain = document.getElementById("tablePositionCreateProcess");//
let divGrid = document.createElement("div");//div that holds all other divs for this menu item
let formMain = document.createElement("form");//main form where all module instances are appended
let divForm = document.createElement("div");
let fieldsetMain = document.createElement("fieldset");
let legendFieldName = document.createElement("legend");
let lblProcessName = document.createElement("label");
let inpProcessName = document.createElement("input");
let lblProcessDriver = document.createElement("label");
let inpProcessDriver = document.createElement("input");
let lblProcessWeight = document.createElement("label");
let inpProcessWeight = document.createElement("input");
let lblProcessScale = document.createElement("label");
let inpProcessScale = document.createElement("input");
let processModuleList = [];
let stepNr = 0;

fieldsetMain.className = "fieldset";
fieldsetMain.id ="createProcessField";
legendFieldName.innerHTML = "Process";
legendFieldName.className = "labels"
lblProcessName.innerHTML = "Name a process";
lblProcessName.className = "labels"
divMain.className = "divMain";
inpProcessName.className = "form-control";
inpProcessName.id = "inpProcessName";

lblProcessDriver.innerHTML = "Driver";
lblProcessDriver.className = "labels";
inpProcessDriver.className = "form-control";
inpProcessDriver.id = "inpProcessDriver";

lblProcessWeight.innerHTML = "Weight";
lblProcessWeight.className = "labels";
inpProcessWeight.className = "form-control";
inpProcessWeight.id = "inpProcessWeight";

lblProcessScale.innerHTML = "Scale";
lblProcessScale.className = "labels";
inpProcessScale.className = "form-control";
inpProcessScale.id = "inpProcessScale";

fieldsetMain.appendChild(legendFieldName);
fieldsetMain.appendChild(lblProcessName);
fieldsetMain.appendChild(inpProcessName);
fieldsetMain.appendChild(lblProcessDriver);
fieldsetMain.appendChild(inpProcessDriver);
fieldsetMain.appendChild(lblProcessWeight);
fieldsetMain.appendChild(inpProcessWeight);
fieldsetMain.appendChild(lblProcessScale);
fieldsetMain.appendChild(inpProcessScale);
divForm.appendChild(fieldsetMain);
formMain.appendChild(divForm);

/**
* @button addButton onclick adds module instances to a new process
* style for that button and methods
* */
let addButton = document.createElement('button');
addButton.innerHTML = '+';
addButton.className = "btn-dark";
addButton.id = "saveModule";

addButton.addEventListener('click', function () {

    if(selectModules.options[selectModules.selectedIndex].text !== "Choose a process ▼") {

        let moduleType = XMLParser.getModuleTypeByModuleInstanceName(selectModules.options[selectModules.selectedIndex].text).stringValue;
        let moduleParams = XMLParser.getModuleParamsByModuleName(moduleType);
        let fieldsetModule = document.createElement("fieldset");
        let legendModule = document.createElement("legend");
        let pBreakLine = document.createElement("p");
        let legendModuleStep = document.createElement("legend");
        let spnModuleAttribute;
        let lblModuleAttribute;
        let inpModuleAttribute;

        let param = null;

        processModuleList.push(selectModules.options[selectModules.selectedIndex].text);
        fieldsetModule.className = "fieldset";
        fieldsetModule.id ="createProcessField";
        fieldsetModule.id = selectModules.options[selectModules.selectedIndex].text;
        legendModuleStep.style.fontSize = "18px"
        legendModule.innerHTML = selectModules.options[selectModules.selectedIndex].text;
        legendModule.style.fontSize = "20px"
        legendModule.className = "labels"
        legendModuleStep.innerHTML = " Step: " + stepNr;
        legendModuleStep.className = "labels"

        fieldsetModule.appendChild(legendModule);
        fieldsetModule.appendChild(pBreakLine);
        fieldsetModule.appendChild(legendModuleStep);

        while (param = moduleParams.iterateNext()) {
            console.log(param);
            let paramBreak = document.createElement("p");

            for (let i = 0; i < param.attributes.length; i++) {
                let attrib = param.attributes[i];

                if (attrib.name === "name" || attrib.name === "engineering_unit") {
                    spnModuleAttribute = document.createElement("span");
                    lblModuleAttribute = document.createElement("label");
                    lblModuleAttribute.className = "labels"
                    lblModuleAttribute.id = "labels"+ attrib.value;
                    lblModuleAttribute.innerHTML = attrib.value;
                    spnModuleAttribute.appendChild(lblModuleAttribute);

                    if (attrib.name === "name"){
                        inpModuleAttribute = document.createElement("input");
                        inpModuleAttribute.className = "form-control form-control-sm";
                        inpModuleAttribute.id = "input"+attrib.value;
                        inpModuleAttribute.type = "number";
                        inpModuleAttribute.oninput = () => this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');
                        //spnModuleAttribute.appendChild(inpModuleAttribute);
                    }
                    if(attrib.name === "engineering_unit")
                        spnModuleAttribute.appendChild(inpModuleAttribute);
                    fieldsetModule.appendChild(spnModuleAttribute);
                }
                fieldsetModule.appendChild(paramBreak)
            }
        }
        let selPrevious = document.createElement("select");
        selPrevious.id = stepNr.toString();
        stepNr++;

        let option = document.createElement("option");
        option.text = "-";
        selPrevious.appendChild(option);
        for(let o = 0; o < stepNr - 1; o++){
            option = document.createElement("option");
            option.text = o.toString();
            selPrevious.appendChild(option);

        }
        lblModuleAttribute = document.createElement("label");
        lblModuleAttribute.className = "labels"
        lblModuleAttribute.id = "labelPredecessor"
        lblModuleAttribute.innerHTML = "predecessor:";
        spnModuleAttribute = document.createElement("span");

        spnModuleAttribute.appendChild(lblModuleAttribute);
        spnModuleAttribute.appendChild(selPrevious);
        fieldsetModule.appendChild(spnModuleAttribute);
        fieldsetModule.appendChild(pBreakLine);
        fieldsetMain.appendChild(fieldsetModule);
        divGrid.appendChild(fieldsetMain);
        document.getElementById("wrapper").appendChild(divGrid);
        fieldsetMain.appendChild(saveProcessButton);
    }
})

/**
* menuItemCreateNewProcess - makes a select menu with its items, a button for adding modules
* */
let selectWrapper = document.createElement("div");
let moduleNames = XMLParser.getAllModuleInstanceNames();
let selectModules = document.createElement("select");

selectWrapper.id = 'selWrapper';
selectWrapper.className = 'selWrapper';
selectModules.name = "selectModules";
selectModules.id = "selectModules";


menuItemCreateNewProcess.addEventListener("click", function() {
    //remove elem from div
    divMain.innerHTML = "";
    $('.table').remove();
    $('#createProcessField').show();
    $('label').show();
    $('#createModuleFieldset').hide();
    $('#tablePosition').hide();
    $('#tablePositionCreateProcess').show();
    $('#moduleInstanceForm').hide();
    $('.moduleInstanceDiv').hide();

    /*let btnHideSidebar = document.createElement('button');
    btnHideSidebar.innerHTML = '☰';
    btnHideSidebar.className = "btn-dark";
    btnHideSidebar.id = 'sidebarCollapseButton';

    $(document).ready(function () {
        $('#sidebarCollapseButton').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    });

    divMain.appendChild(btnHideSidebar);*/

    //add items to a menu
    let menuSelHeader = document.createElement("option");
    let module = null;

    menuSelHeader.text = "Choose a process ▼"
    menuSelHeader.hidden = true;
    selectModules.appendChild(menuSelHeader);

    while (module = moduleNames.iterateNext()) {

        let moduleListItem = document.createElement("option");
        let moduleListItemName = document.createElement("a");

        moduleListItem.className = "moduleListItem";
        moduleListItemName.className = "moduleListItemName";
        moduleListItemName.value = module.value;
        moduleListItemName.text = module.value;

        moduleListItem.appendChild(moduleListItemName);
        selectModules.appendChild(moduleListItem);
    }

    selectModules.className = 'selectMenu';
    selectWrapper.appendChild(selectModules);
    let div = document.getElementById('tablePositionCreateProcess');
    div.className = "divMain";
    div.appendChild(addButton);
    div.appendChild(selectWrapper);

    /**
    * on select from a menu show info about selected module instance
    * */

    document.getElementById("selectModules").onchange = changeListener;

    function changeListener(){
            let moduleInstanceName = selectModules.options[selectModules.selectedIndex].text;
            getModuleData(moduleInstanceName);
    }
})

/**
* @function getModuleData() shows info about a module instance with all ist parameters
 * @param {string} moduleInstanceName
* */

let moduleInfoPopUp = document.createElement("div");

function getModuleData(moduleInstanceName){

    let moduleInstanceType = XMLParser.getModuleTypeByModuleInstanceName(moduleInstanceName).stringValue;
    let moduleParams = XMLParser.getModuleParamsByModuleName(moduleInstanceType);
    let param;

    moduleInfoPopUp.id = "modInfo"
    moduleInfoPopUp.className = "moduleInfoPopUp"
    moduleInfoPopUp.innerText = "";

    document.getElementById("tablePositionCreateProcess").appendChild(moduleInfoPopUp);

    while(param = moduleParams.iterateNext()){
        for (let i=0; i<param.attributes.length; i++){
            let attrib = param.attributes[i];
            moduleInfoPopUp.innerText += attrib.name + ": " +attrib.value + "\n";
        }
    }
}
/**
* @button saveProcessButton for saving new processes
* */
let saveProcessButton = document.createElement("button");
saveProcessButton.innerHTML = "Save"
saveProcessButton.className = "btn-dark";
saveProcessButton.id = "btnSaveProcess";


saveProcessButton.addEventListener('click', function () {
    if(validateForm()){

    let xmlFile ="<process id=\"" + findMaxProcessId()
        + "\" name=\"" + document.getElementById("inpProcessName").value
        + "\" driver=\"" + document.getElementById("inpProcessDriver").value
        + "\" default_quantity=\""+ document.getElementById("inpProcessWeight").value
        + "\" scale=\""+ document.getElementById("inpProcessScale").value +"\">";


    for(let i = 0; i < processModuleList.length; i++){
        let moduleInstanceName = document.getElementById(processModuleList[i]);
        let moduleInstanceType = XMLParser.getModuleTypeByModuleInstanceName(moduleInstanceName.id).stringValue;
        let moduleInstance = XMLParser.getModuleInstanceByModuleInstanceName(processModuleList[i]);
        let moduleInstanceText = null;
        let modInstanceIterator = null;
        let moduleParams;
        let report = document.createRange().createContextualFragment("<module_instance_report><time_started></time_started><time_finished></time_finished><status></status><message></message><error></error></module_instance_report>");

        if(isParallel(i).length !== 1){
            xmlFile = xmlFile + "<parallel>";
            let parallelModules = isParallel(i);
            let parallels = 0;
            for(parallels = 0; parallels < isParallel(i).length; parallels++){
                console.log(isParallel(i).length);
                moduleInstanceType = XMLParser.getModuleTypeByModuleInstanceName(
                    document.getElementById(parallelModules[parallels]).id).stringValue;
                moduleInstance = XMLParser.getModuleInstanceByModuleInstanceName(parallelModules[parallels]); //gets process module xml node
                while(modInstanceIterator = moduleInstance.iterateNext())
                    moduleInstanceText = modInstanceIterator;
                moduleInstanceText = appendParametersAndReportValues(moduleInstanceText,moduleInstanceType);

                moduleInstanceText.appendChild(report);
                xmlFile = xmlFile + new XMLSerializer().serializeToString(moduleInstanceText);
                console.log(moduleInstanceText);
            }
            xmlFile = xmlFile + "</parallel>";
            i += parallels;

            console.log(i);
        }
        else{
            moduleInstanceText = moduleInstance.iterateNext();
            moduleParams = XMLParser.getModuleParamsByModuleName(moduleInstanceType);
            moduleInstanceText = appendParametersAndReportValues(moduleInstanceText,moduleInstanceType);
            moduleInstanceText.appendChild(report);
            xmlFile = xmlFile + new XMLSerializer().serializeToString(moduleInstanceText);
        }
        console.log(moduleInstanceText);
    }
    xmlFile = xmlFile + "</process>";
    console.log(xmlFile);

    $.ajax({
        type: "POST",
        url: APICalls.POST_API_URL_ADD_PROCESS,
        data: xmlFile,
        contentType: "text",
        success: function (result) {
            console.log(result);
        },
        error: function (result, status) {
            console.log(result);
        }
    });

    }
    else
        alert("You have to fill out all of the fields");
})

/**
 * @param {} moduleInstanceText
 * @param {String} moduleInstanceType
 */
function appendParametersAndReportValues(moduleInstanceText,moduleInstanceType){
    console.log(moduleInstanceType);
    let moduleParams = XMLParser.getModuleParamsByModuleName(moduleInstanceType);
    let param = null;
    let paramNr = 0;
    let paramToBeFilled = [];
    let parameterNames = [];
    while(param = moduleParams.iterateNext()){
        console.log(param);
        paramToBeFilled.push(param);
        parameterNames.push(param.getAttribute("name"));
        paramNr++;
    }

    for(let i = 0; i < paramNr; i++){
        console.log(document.getElementById("input" + parameterNames[i]));
        paramToBeFilled[i].textContent = document.getElementById("input" + parameterNames[i]).value;
        moduleInstanceText.appendChild(paramToBeFilled[i]);
    }

    let moduleReport = XMLParser.getModuleReportByModuleName(moduleInstanceType);
    for(let r = 0; r < moduleReport.snapshotLength; r++)
        moduleInstanceText.appendChild(moduleReport.snapshotItem(r));

    return moduleInstanceText;
}

/**
 * checks if there are any other modules that are running parallel to this one
 * and if there are some it saves their names to an array
 * @param {number} processStep
 * @return {array} parallelModuleIds
 */
//TODO: optimize this method to save correctly
function isParallel(processStep){
    let parallelModuleIds = [];
    for(let i = 0; i < processModuleList.length; i++) {
        let select = document.getElementById((i).toString());
        if(processStep === select.selectedIndex){
            parallelModuleIds.push(processModuleList[i]);
        }
    }
    return parallelModuleIds;
}
/**
 * finds max id of all saved processes for a new process
 * @return maxID;
 * */
function findMaxProcessId(){
    let existingProcessesIDs = XMLParser.getAllProcessesIDs();
    let processIDIterator = null;
    let maxID=0;

    while(processIDIterator = existingProcessesIDs.iterateNext()){
        if(parseInt(processIDIterator.value) > maxID){
            console.log(processIDIterator.value)
            maxID = parseInt(processIDIterator.value);
        }
    }
    return maxID++;
}

function validateForm() {
    let isValid = true;
    $('.form-control').each(function() {
        if ( $(this).val() === '' )
            isValid = false;
    });

    return isValid;
}
