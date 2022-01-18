/**
 * enables a user to create a new process
 * @author Naida Ciric
 * @version 3
 * @file XMLParser.js
 * */
import * as XMLParser from './XMLParser.js';

let menuItemCreateNewProcess = document.getElementById("createProcess");//menu item
let divMain = document.getElementById("tablePositionCreateProcess");//
let divGrid = document.createElement("div");//div that holds all other divs for this menu item
let formMain = document.createElement("form");//main form where all module instances are appended
let divForm = document.createElement("div");
let fieldsetMain = document.createElement("fieldset");
let legendFieldName = document.createElement("legend");
let lblProcessName = document.createElement("label");
let inpProcessName = document.createElement("input");
let processModuleList = [];
let stepNr = 0;

fieldsetMain.className = "fieldset";
legendFieldName.innerHTML = "Process";
legendFieldName.className = "labels"
lblProcessName.innerHTML = "Name a process";
lblProcessName.className = "labels"
divMain.className = "divMain";
inpProcessName.className = "pNameInput";
inpProcessName.id = "inpProcessName";

fieldsetMain.appendChild(legendFieldName);
fieldsetMain.appendChild(lblProcessName);
fieldsetMain.appendChild(inpProcessName);
divForm.appendChild(fieldsetMain);
formMain.appendChild(divForm);

/**
* @button addButton onclick adds module instances to a new process
* style for that button and methods
* */
let addButton = document.createElement('button');
addButton.innerHTML = '+';
addButton.className = "buttons";

addButton.addEventListener('click', function () {

    let moduleType = XMLParser.getModuleByModuleInstanceName(selectModules.options[selectModules.selectedIndex].text).stringValue;
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

    while(param = moduleParams.iterateNext()) {
        let paramBreak = document.createElement("p");

        for (let i=0; i<param.attributes.length; i++) {
            let attrib = param.attributes[i];

            if (attrib.name === "name" || attrib.name === "engineering_unit") {
                spnModuleAttribute = document.createElement("span");
                lblModuleAttribute = document.createElement("label");
                lblModuleAttribute.className = "labels"
                lblModuleAttribute.innerHTML = attrib.value;
                spnModuleAttribute.appendChild(lblModuleAttribute);

                if(attrib.name === "name" ) {
                    inpModuleAttribute = document.createElement("input");
                    inpModuleAttribute.className = "moduleAttInp";
                    inpModuleAttribute.id = attrib.value;
                    spnModuleAttribute.appendChild(inpModuleAttribute);
                }
                fieldsetModule.appendChild(spnModuleAttribute);
            }
            fieldsetModule.appendChild(paramBreak)
        }
        fieldsetMain.appendChild(saveProcessButton);
    }
    stepNr++;

    lblModuleAttribute = document.createElement("label");
    lblModuleAttribute.className = "labels"
    lblModuleAttribute.innerHTML = "predecessor:";

    inpModuleAttribute = document.createElement("input");
    inpModuleAttribute.className = "moduleAttInp";
    inpModuleAttribute.id = lblModuleAttribute.innerHTML;

    spnModuleAttribute = document.createElement("span");
    spnModuleAttribute.appendChild(lblModuleAttribute);
    spnModuleAttribute.appendChild(inpModuleAttribute);

    fieldsetModule.appendChild(spnModuleAttribute);
    fieldsetModule.appendChild(pBreakLine);
    fieldsetMain.appendChild(fieldsetModule);
    divGrid.appendChild(fieldsetMain);
    document.getElementById("wrapper").appendChild(divGrid);
})

/**
* menuItemCreateNewProcess - makes a select menu with its items, a button for adding modules
* */
let selectWrapper = document.createElement("div");
let moduleNames = XMLParser.getAllModuleInstanceNames();
let selectModules = document.createElement("select");

selectWrapper.id = 'selWrapper';
selectWrapper.className = 'buttons';
selectModules.name = "selectModules";
selectModules.id = "selectModules";


menuItemCreateNewProcess.addEventListener("click", function() {


    //remove elem from div
    divMain.innerHTML = "";
    $('fieldset').show();
    $('label').show();
    $('#tablePosition').hide();
    $('#tablePositionCreateProcess').show();

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
        moduleListItemName.id = module.value;

        moduleListItem.appendChild(moduleListItemName);
        selectModules.appendChild(moduleListItem);
    }

    selectModules.className = 'selectMenu';
    selectWrapper.appendChild(selectModules);
    document.getElementById("tablePositionCreateProcess").appendChild(selectWrapper);
    document.getElementById('tablePositionCreateProcess').appendChild(addButton);

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


    let moduleInstanceType = XMLParser.getModuleByModuleInstanceName(moduleInstanceName).stringValue;
    let moduleParams = XMLParser.getModuleParamsByModuleName(moduleInstanceType);
    let param = moduleParams.iterateNext()

    moduleInfoPopUp.id = "modInfo"
    moduleInfoPopUp.className = "moduleInfoPopUp"
    moduleInfoPopUp.innerText="";

    document.getElementById("tablePositionCreateProcess").appendChild(moduleInfoPopUp);

    for (let i=0; i<param.attributes.length; i++){
        let attrib = param.attributes[i];
        moduleInfoPopUp.innerText += attrib.name + ": " +attrib.value + "\n";
    }

}
/**
* @button saveProcessButton for saving new processes
* */
let saveProcessButton = document.createElement("button");
saveProcessButton.innerHTML = "Save"
saveProcessButton.className = "buttons";
saveProcessButton.id = "btnSaveProcess";

//TODO: save a process on a button click and make a xml file
saveProcessButton.addEventListener('click', function () {

    let title = document.getElementById("inpProcessName").value;
    console.log(title);

    for(let i = 0; i <= processModuleList.length; i++){
        let moduleInstance = document.getElementById(processModuleList[i]);

    }
})
