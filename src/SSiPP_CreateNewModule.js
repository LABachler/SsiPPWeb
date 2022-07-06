import * as XMLParser from "./XMLParser.js";
import * as APICalls from "./APICalls.js";

/**
 * item in a menu
 * @type {HTMLElement}
 */
let menuItemCreateNewModule = document.getElementById("createModule");

menuItemCreateNewModule.addEventListener('click', function () {
    /**
     * already existing div where I will append everything else on this page
     * @type {HTMLElement}
     */
    let divMain = document.getElementById("tablePositionCreateProcess");
    /**
     * main form for a module
     * @type {HTMLFormElement}
     */
    let formMain = document.createElement("form");
    /**
     * child div of FormMain
     * parent div of fieldsetModule
     * @type {HTMLDivElement}
     */
    let divForm = document.createElement("div");
    /**
     * fieldset for a module
     * @type {HTMLFieldSetElement}
     */
    let fieldsetModule = document.createElement("fieldset");
    /**
     * "new module" - legend
     * @type {HTMLLegendElement}
     */
    let legendFieldModuleName = document.createElement("legend");
    /**
     * "Name a module" - label
     * @type {HTMLLabelElement}
     */
    let lblModuleName = document.createElement("label");
    /**
     * input for a new module name
     * @type {HTMLInputElement}
     */
    let inpModuleName = document.createElement("input");
    /**
     * "Description" - label
     * @type {HTMLLabelElement}
     */
    let lblModuleDescription = document.createElement("label");
    /**
     * input field for a description of a module
     * @type {HTMLInputElement}
     */
    let inpModuleDescription = document.createElement("input");
    /**
     * array for added parameters in a module
     * @type {array}
     */
    let parameters = [];
    /**
     * array for added report values in a module
     * @type {array}
     */
    let reports = [];

    fieldsetModule.className = "fieldset";
    fieldsetModule.id ="createModuleFieldset";
    legendFieldModuleName.innerHTML = "New Module";
    legendFieldModuleName.className = "labels";
    lblModuleName.innerHTML = "Name a module";
    lblModuleName.className = "labels";
    lblModuleDescription.innerHTML = "Description";
    lblModuleDescription.className = "labels";
    inpModuleDescription.className = "form-control";
    inpModuleDescription.id = "inpModuleDescription";
    inpModuleName.className = "form-control";
    inpModuleName.style.cssText = "text-transform: uppercase";
    inpModuleName.id = "inpModuleName";
    divMain.className = "moduleDiv";

    fieldsetModule.appendChild(legendFieldModuleName);
    fieldsetModule.appendChild(lblModuleName);
    fieldsetModule.appendChild(inpModuleName);
    fieldsetModule.appendChild(lblModuleDescription);
    fieldsetModule.appendChild(inpModuleDescription);
    divForm.appendChild(fieldsetModule);
    formMain.appendChild(divForm);
    //remove elem from div

    divMain.innerHTML = "";
    $('.table').remove();
    $('#tablePosition').hide();
    $('#tablePositionCreateProcess').show();
    $('#createProcessField').hide();
    $('#moduleInstanceForm').hide();
    $('.moduleInstanceDiv').hide();

    /**
     * saves a module and sends an api POST call
     * @type {HTMLButtonElement} btnSaveModule
     */
    let btnSaveModule = document.createElement('button');
    btnSaveModule.innerHTML = 'Save';
    btnSaveModule.className = "btn-dark";
    btnSaveModule.id = 'saveModule';

    /**
     * adds new parameter to a module
     * @type {HTMLButtonElement} btnAddParameter
     */
    let btnAddParameter = document.createElement('button');
    btnAddParameter.innerHTML = '+ Parameter';
    btnAddParameter.className = "btn-dark";
    btnAddParameter.id = 'addParam';

    /**
     * adds new report to a module
     * @type {HTMLButtonElement} btnAddReport
     */
    let btnAddReport = document.createElement('button');
    btnAddReport.innerHTML = '+ Report';
    btnAddReport.className = "btn-dark";
    btnAddReport.id = 'addReport';

    let paramNr = 0;
    let reportNr = 0;
    $(document).ready(function () {
        $('#addParam').on('click', function () {
            let fieldsetParameter = document.createElement("fieldset");
            let legendParameter = document.createElement("legend");
            let labelsAndInputs = ["Name","Type","Engineering-Unit","Plc-name", "Min","Max"];
            fieldsetParameter.id ="createModuleFieldset";
            fieldsetParameter.className ="fieldset";
            let pBreakLine = document.createElement("p");
            fieldsetParameter.append(legendParameter, pBreakLine);
            legendParameter.innerHTML = "Parameter - " + paramNr;
            legendParameter.style.fontSize = "15px";

            for(let i = 0; i < labelsAndInputs.length; i++){
                let lbl = document.createElement("label");
                let inp = document.createElement("input");
                inp.style.cssText = "text-transform: uppercase";
                lbl.innerHTML = labelsAndInputs[i];
                inp.className ="form-control form-control-sm";
                inp.id = "parameter"+labelsAndInputs[i] + paramNr;
                parameters.push("parameter"+labelsAndInputs[i] + paramNr);

                fieldsetParameter.append(pBreakLine,lbl,inp);

            }
            fieldsetModule.append(pBreakLine,fieldsetParameter);
            paramNr++;
            console.log(parameters);

        });
        $('#addReport').on('click', function () {
            let fieldsetReport = document.createElement("fieldset");
            let legendReport = document.createElement("legend");
            let labelsAndInputs = ["Name","Type","Engineering-Unit","Plc-name"];
            fieldsetReport.id ="createModuleFieldset";
            fieldsetReport.className ="fieldset";
            let pBreakLine = document.createElement("p");
            fieldsetReport.append(legendReport, pBreakLine);
            legendReport.innerHTML = "Report - " + reportNr;
            legendReport.style.fontSize = "15px";

            for(let i = 0; i < labelsAndInputs.length; i++) {
                let lbl = document.createElement("label");
                let inp = document.createElement("input");
                inp.style.cssText = "text-transform: uppercase";
                lbl.innerHTML = labelsAndInputs[i];
                inp.className = "form-control form-control-sm";
                inp.id = "report" + labelsAndInputs[i] + reportNr;
                reports.push("report" + labelsAndInputs[i] + paramNr);
                fieldsetReport.append(pBreakLine,lbl,inp);
            }
            fieldsetModule.append(pBreakLine,fieldsetReport);
            reportNr++;
            console.log(reports);

        });
        $('#sidebarCollapseButton').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
        $('#saveModule').on('click', function () {
            if(validateForm()) {
                let xmlModuleString = "<module id =\"" + getMaxId() + "\" name=\" "
                    + document.getElementById("inpModuleName").value + "\" comment=\""
                    + document.getElementById("inpModuleDescription").value + "\">";

                for (let param = 0; param < parameters.length; param++) {
                    xmlModuleString += "<param name=\"" + document.getElementById(parameters[param++]).value +
                        "\" type=\"" + document.getElementById(parameters[param++]).value +
                        "\" engineering_unit=\"" + document.getElementById(parameters[param++]).value +
                        "\" plc_name=\"" + document.getElementById(parameters[param++]).value +
                        "\" min_val=\"" + document.getElementById(parameters[param++]).value +
                        "\" max_val=\"" + document.getElementById(parameters[param]).value +
                        "\"></param>";
                    console.log(xmlModuleString);
                }
                for (let report = 0; report < reports.length; report++) {
                    xmlModuleString += "<report name=\"" + document.getElementById(parameters[report++]).value +
                        "\" type=\"" + document.getElementById(parameters[report++]).value +
                        "\" engineering_unit=\"" + document.getElementById(parameters[report++]).value +
                        "\" plc_name=\"" + document.getElementById(parameters[report]).value +
                        "\"></report>";
                    console.log(xmlModuleString);

                }
                xmlModuleString += "</module>";

                $.ajax({
                    async: false,
                    type: "POST",
                    url: APICalls.POST_API_URL_ADD_MODULE,
                    data: xmlModuleString.toString(),
                    contentType: "text",
                    success: function (result) {
                        console.log(result);
                    },
                    error: function (result, status) {
                        console.log(result + "->" + status);
                    }
                });
                document.location.reload();

            }else alert("You have to fill out all of the fields!");
        });
    });

    fieldsetModule.append(btnAddParameter, btnAddReport, btnSaveModule);
    divMain.append(formMain);
})

/**
 * gets next id for a module
 * @return {number}
 */
function getMaxId(){
    let existingModuleIDs = XMLParser.getAllModuleIDs();
    let moduleIDIterator = null;
    let maxID=0;

    while(moduleIDIterator = existingModuleIDs.iterateNext()){
        if(parseInt(moduleIDIterator.value) > maxID){
            maxID = parseInt(moduleIDIterator.value);
        }
    }
    maxID = maxID + 1;
    return maxID;
}

/**
 * checks if all input fields are filled out
 * @return {boolean}
 */
function validateForm() {
    let isValid = true;
    $('.form-control').each(function() {
        if ( $(this).val() === '' )
            isValid = false;
    });

    return isValid;
}
