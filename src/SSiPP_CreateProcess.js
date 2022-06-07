/**
 * enables a user to create a new process
 * @author Naida Ciric
 * @version 5
 * @class XMLParser.js
 * @class APICalls.js
 * */
import * as XMLParser from './XMLParser.js';
import * as APICalls from './APICalls.js';

/**
 *
 * @type {HTMLElement}
 * gets a submenu item (+ process)
 */
let menuItemCreateNewProcess = document.getElementById("createProcess");
/**
 *
 * @type {HTMLElement}
 * div where a select item and add button should be appended
 */
let divMain = document.getElementById("tablePositionCreateProcess");
/**
 * @type {HTMLDivElement}
 * div that holds all other divs for this menu item
 */
let divGrid = document.createElement("div");
/**
 * @type {HTMLFormElement}
 * new process form
 */
let formMain = document.createElement("form");
/**
 * @type {HTMLDivElement}
 * div element where a variable "formMain" will be appended
 */
let divForm = document.createElement("div");
/**
 * @type {HTMLFieldSetElement}
 * main fieldset that is appended to a "formMain"
 * className = "fieldset"
 * id ="createProcessField"
 */
let fieldsetMain = document.createElement("fieldset");
/**
 * @type {HTMLLegendElement}
 * process tag
 */
let legendFieldName = document.createElement("legend");
/**
 * @type {HTMLLabelElement}
 * "name a process"
 */
let lblProcessName = document.createElement("label");
/**
 * @type {HTMLInputElement}
 * input name of a process
 */
let inpProcessName = document.createElement("input");
/**
 * @type {HTMLLabelElement}
 * "driver"
 */
let lblProcessDriver = document.createElement("label");
/**
 * @type {HTMLInputElement}
 * input a driver that is to be used for this process
 */
let inpProcessDriver = document.createElement("input");
/**
 * @type {HTMLLabelElement}
 * weight of this recipe
 */
let lblProcessWeight = document.createElement("label");
/**
 * @type {HTMLInputElement}
 * input for a weight of this recipe
 */
let inpProcessWeight = document.createElement("input");
/**
 * @type {*[]}
 * list of modules in a process
 */
let processModuleList = [];
/**
 * @type {number}
 * number of module instances in this process
 */
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

fieldsetMain.appendChild(legendFieldName);
fieldsetMain.appendChild(lblProcessName);
fieldsetMain.appendChild(inpProcessName);
fieldsetMain.appendChild(lblProcessDriver);
fieldsetMain.appendChild(inpProcessDriver);
fieldsetMain.appendChild(lblProcessWeight);
fieldsetMain.appendChild(inpProcessWeight);
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

        /**
         * @type {string}
         * type of module
         */
        let moduleType = XMLParser.getModuleTypeByModuleInstanceName(selectModules.options[selectModules.selectedIndex].text).stringValue;
        /**
         * @type {XPathResult}
         * parameters of module
         */
        let moduleParams = XMLParser.getModuleParamsByModuleName(moduleType);
        /**
         * @type {HTMLFieldSetElement}
         * fieldset for a module
         */
        let fieldsetModule = document.createElement("fieldset");
        /**
         * @type {HTMLLegendElement}
         * name of a module
         */
        let legendModule = document.createElement("legend");
        /**
         * @type {HTMLParagraphElement}
         * new line
         */
        let pBreakLine = document.createElement("p");
        /**
         * @type {HTMLLegendElement}
         * step in a process
         */
        let legendModuleStep = document.createElement("legend");
        /**
         * @type {HTMLSpanElement}
         * span for attributes
         */
        let spnModuleAttribute;
        /**
         * @type {HTMLLabelElement}
         * name of a parameter
         */
        let lblModuleAttribute;
        /**
         * @type {HTMLInputElement}
         * input a value for a parameter
         */
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
            /**
             * @type {HTMLParagraphElement}
             * new line in a span
             */
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
        /**
         * @type {HTMLSelectElement}
         * possible predecessors to current module instance
         */
        let selPrevious = document.createElement("select");
        selPrevious.id = stepNr.toString();
        stepNr++;

        /**
         * @type {HTMLOptionElement}
         * predecessor option
         */
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
 * @type {HTMLDivElement}
 * wrapper div for a select element with all module instances
 * that gives the possibility to style it
 */
let selectWrapper = document.createElement("div");
/**
 * @type {XPathResult}
 * all module names
 */
let moduleNames = XMLParser.getAllModuleInstanceNames();
/**
 * @type {HTMLSelectElement}
 * select element where all module instances
 * will be appended as options to choose from
 */
let selectModules = document.createElement("select");

selectWrapper.id = 'selWrapper';
selectWrapper.className = 'selWrapper';
selectModules.name = "selectModules";
selectModules.id = "selectModuleInstances";

menuItemCreateNewProcess.addEventListener("click", function() {

    divMain.innerHTML = "";
    $('.table').remove();
    $('#createProcessField').show();
    $('#selectModuleInstances').show();
    $('label').show();
    $('#createModuleFieldset').hide();
    $('#tablePosition').hide();
    $('#tablePositionCreateProcess').show();
    $('#moduleInstanceForm').hide();
    $('.moduleInstanceDiv').hide();

    /**
     * @type {HTMLOptionElement}
     * header for module instances select element
     */
    let menuSelHeader = document.createElement("option");
    let module = null;

    menuSelHeader.text = "Choose a process ▼"
    menuSelHeader.hidden = true;
    selectModules.appendChild(menuSelHeader);

    while (module = moduleNames.iterateNext()) {

        /**
         * @type {HTMLOptionElement}
         * new module instance option
         */
        let moduleListItem = document.createElement("option");
        /**
         * shows a name of a module instance
         */
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
    div.append(addButton, selectWrapper);

    /**
    * on select from a menu show info about selected module instance
    * */

    document.getElementById("selectModuleInstances").onchange = changeListener;

    function changeListener(){
            let moduleInstanceName = selectModules.options[selectModules.selectedIndex].text;
            getModuleData(moduleInstanceName);
    }
})

/**
 * div where all information about a module instance will be saved
 * @type {HTMLDivElement}
 */
let moduleInfoPopUp = document.createElement("div");
/**
 * shows info about a module instance with all its parameters
 * @param {string} moduleInstanceName
 * */

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
 * @type {HTMLButtonElement}
 * Button for saving a new process
 */
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
        + "\" scale=\"\">";


    for(let i = 0; i < processModuleList.length; i++){
        /**
         * @type {HTMLElement}
         * name of a module instance to be added
         */
        let moduleInstanceName = document.getElementById(processModuleList[i]);
        /**
         * @type {string}
         * type of module instance
         */
        let moduleInstanceType = XMLParser.getModuleTypeByModuleInstanceName(moduleInstanceName.id).stringValue;
        /**
         * @type {XPathResult}
         * module instance
         */
        let moduleInstance = XMLParser.getModuleInstanceByModuleInstanceName(processModuleList[i]);
        /**
         * module instance xml string
         */
        let moduleInstanceText = null;
        /**
         * iterator for module instance
         */
        let modInstanceIterator = null;
        /**
         * parameters of a module instance
         */
        let moduleParams;

        if(isParallel(i).length !== 1){
            xmlFile = xmlFile + "<parallel>";
            /**
             * array of parallel module instances in a process
             * @type {Array}
             */
            let parallelModules = isParallel(i);
            let parallels = 0;
            for(parallels = 0; parallels < isParallel(i).length; parallels++){

                moduleInstanceType = XMLParser.getModuleTypeByModuleInstanceName(
                    document.getElementById(parallelModules[parallels]).id).stringValue;
                moduleInstance = XMLParser.getModuleInstanceByModuleInstanceName(parallelModules[parallels]); //gets process module xml node

                while(modInstanceIterator = moduleInstance.iterateNext())
                    moduleInstanceText = modInstanceIterator;

                moduleInstanceText = appendParametersAndReportValues(moduleInstanceText,moduleInstanceType);
                moduleInstanceText.appendChild(document.createRange().createContextualFragment(
                    "<module_instance_report><time_started></time_started><time_finished></time_finished><STATUS></STATUS><COMMAND></COMMAND><MESSAGE></MESSAGE><ERROR></ERROR><E_MSG></E_MSG></module_instance_report>"));
                xmlFile = xmlFile + new XMLSerializer().serializeToString(moduleInstanceText);
            }
            xmlFile = xmlFile + "</parallel>";
            i += parallels;
        }
        else{
            moduleInstanceText = moduleInstance.iterateNext();
            moduleParams = XMLParser.getModuleParamsByModuleName(moduleInstanceType);
            moduleInstanceText = appendParametersAndReportValues(moduleInstanceText,moduleInstanceType);
            moduleInstanceText.appendChild(document.createRange().createContextualFragment(
                "<module_instance_report><time_started></time_started><time_finished></time_finished><STATUS></STATUS><COMMAND></COMMAND><MESSAGE></MESSAGE><ERROR></ERROR><E_MSG></E_MSG></module_instance_report>"));
            xmlFile = xmlFile + new XMLSerializer().serializeToString(moduleInstanceText);
        }
    }
    xmlFile = xmlFile + "</process>";

    $.ajax({
        type: "POST",
        url: APICalls.POST_API_URL_ADD_PROCESS,
        data: xmlFile,
        contentType: "text",
        success: function (result) {
            console.log(result);
        },
        error: function (result) {
            console.log(result);
        }
    });
    document.location.reload();

    }
    else
        alert("You have to fill out all of the fields");
})

/**
 * gets parameters for a specific module instance
 * fills those parameters with inputs from a new process form
 * @param {Node} moduleInstanceText
 * @param {String} moduleInstanceType
 * @returns {Node} module instance node
 */
function appendParametersAndReportValues(moduleInstanceText,moduleInstanceType){
    /**
     * @type {XPathResult}
     * module parameters for a module instance
     */
    let moduleParams = XMLParser.getModuleParamsByModuleName(moduleInstanceType);
    let param = null;
    //let paramNr = 0;
    /**
     * list of parameters that will be filled a
     * @type {array}
     */
    let paramToBeFilled = [];
    /**
     * list of parameter names to search for corresponding input field by id
     * @type {array}
     */
    let parameterNames = [];

    while(param = moduleParams.iterateNext()){
        paramToBeFilled.push(param);
        parameterNames.push(param.getAttribute("name"));
        //paramNr++;
    }

    for(let i = 0; i < paramToBeFilled.length; i++){
        paramToBeFilled[i].textContent = document.getElementById("input" + parameterNames[i]).value;
        moduleInstanceText.appendChild(paramToBeFilled[i]);
    }
    /**
     * @type {XPathResult}
     * module report for a module instance
     */
    let moduleReport = XMLParser.getModuleReportByModuleName(moduleInstanceType);
    for(let r = 0; r < moduleReport.snapshotLength; r++)
        moduleInstanceText.appendChild(moduleReport.snapshotItem(r));

    return moduleInstanceText;
}

/**
 * checks if there are any other modules that are running parallel to this one
 * and if there are some it saves their names to an array
 * @param {number} processStep
 * @returns {array} parallelModuleIds
 */
function isParallel(processStep){
    /**
     * list of parallel module instance ids
     * @type {array}
     */
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
 * finds an id for a new process
 * @return maxID;
 * */
function findMaxProcessId(){
    /**
     * all process ids
     * @type {XPathResult}
     */
    let existingProcessesIDs = XMLParser.getAllProcessesIDs();
    let processIDIterator = null;
    let maxID=0;

    while(processIDIterator = existingProcessesIDs.iterateNext()){
        if(parseInt(processIDIterator.value) > maxID){
            console.log(processIDIterator.value)
            maxID = parseInt(processIDIterator.value);
        }
    }
    maxID = maxID + 1;
    return maxID;
}

/**
 * checks if all fields in a form are filled and if not returns false
 * @return {boolean} isValid
 */
function validateForm() {
    let isValid = true;
    $('.form-control').each(function() {
        if ( $(this).val() === '' )
            isValid = false;
    });

    return isValid;
}
