
import * as XMLParser from "./XMLParser.js";
import * as APICalls from "./APICalls.js";

/**
 * "+ module instance" menu item
 * @type {HTMLElement}
 */
let createNewModuleInstance = document.getElementById("createModuleInstance");
/**
 *
 * @type {HTMLDivElement}
 */
let divMain = document.createElement("div");
divMain.className = "moduleInstanceDiv";
/**
 *
 * @type {HTMLElement}
 */
let wrapper = document.getElementById("wrapper");
wrapper.appendChild(divMain);
/**
 *
 * @type {array}
 */
let paramIds = [];

createNewModuleInstance.addEventListener("click", function (){

    divMain.innerHTML = "";
    $('.table').remove();
    $('#tablePosition').hide();
    $('#tablePositionCreateProcess').hide();
    $('#createModuleFieldset').hide();
    $('#createProcessField').hide();
    $('#moduleInstanceFrom').show();
    $('.moduleInstanceDiv').show();
    $('#saveModule').hide();


    let selectWrapper = document.createElement("div");
    let moduleNames = XMLParser.getAllModuleNames();
    let selectModules = document.createElement("select");

    selectWrapper.id = 'selWrapper';
    selectWrapper.className = 'selWrapper';
    selectModules.name = "selectModules";
    selectModules.id = "selectModules";


    let menuSelectHeader = document.createElement("option");
    let mod = null;

    menuSelectHeader.text = "Choose a module ▼"
    menuSelectHeader.hidden = true;
    selectModules.appendChild(menuSelectHeader);

    while (mod = moduleNames.iterateNext()) {

        let moduleListItem = document.createElement("option");
        let moduleListItemName = document.createElement("a");

        moduleListItem.className = "moduleListItem";
        moduleListItemName.className = "moduleListItemName";
        moduleListItemName.value = mod.value;
        moduleListItemName.text = mod.value;

        moduleListItem.appendChild(moduleListItemName);
        selectModules.appendChild(moduleListItem);
    }

    selectModules.className = 'selectMenu';
    selectWrapper.appendChild(selectModules);
    divMain.appendChild(selectWrapper);

    document.getElementById("selectModules").onchange = changeListener;

    function changeListener(){
        let moduleName = selectModules.options[selectModules.selectedIndex].text;
        document.getElementById("wrapper").appendChild(createField(moduleName));
    }

})

/**
 * @param {String} type of module
 * @return {HTMLFormElement} form
 */
function createField(type){

    paramIds = [];
    $('#moduleInstanceForm').remove();
    let formMain = document.createElement("form");
    let divForm = document.createElement("div");
    let fieldsetMain = document.createElement("fieldset");
    let legendFieldName = document.createElement("legend");
    let fieldsetMIParameter = document.createElement("fieldset");
    let legendParameter = document.createElement("legend");
    let pBreakLine = document.createElement("p");

    formMain.id = "moduleInstanceForm";
    fieldsetMIParameter.id ="createModuleInstanceParameterFieldset";
    fieldsetMIParameter.className ="fieldset";
    fieldsetMIParameter.append(legendParameter, pBreakLine);
    legendParameter.innerHTML = "Module Instance Parameters";
    legendParameter.style.fontSize = "15px";
    fieldsetMain.className = "fieldset";
    fieldsetMain.id ="createModuleInstanceField";
    legendFieldName.innerHTML = type;
    legendFieldName.className = "labels";

    fieldsetMain.appendChild(legendFieldName);
    divForm.appendChild(fieldsetMain);
    divMain.appendChild(divForm);


    let params = ["Plc IP", "Data block Name", "Driver", "Line ID"];
    for(let p = 0; p <params.length; p++){
        let lbl = document.createElement("label");
        let inp = document.createElement("input");
        inp.style.cssText = "text-transform: uppercase";
        lbl.innerHTML = params[p];
        inp.className ="form-control form-control-sm";
        inp.id = "parameterModuleInstance"+params[p];
        paramIds.push("parameterModuleInstance"+params[p]);

        fieldsetMIParameter.append(document.createElement("p"),lbl,inp);
    }

    /**
     * saves a module instance and sends an api POST call
     * @type {HTMLButtonElement}
     */
    let btnSave = document.createElement('button');
    btnSave.innerHTML = 'Save';
    btnSave.className = "btn-dark";
    btnSave.type = "button";
    btnSave.id = 'saveModuleInstance';

    $(document).ready(function () {
        $('#saveModuleInstance').on('click', function () {
            if(validateForm()){

                let xmlString = "<module_instance type=\""+type+"\" plc=\""+ document.getElementById(paramIds[0]).value
                    +"\" datablock_name=\"" + document.getElementById(paramIds[1]).value
                    +"\" driver=\"" + document.getElementById(paramIds[2]).value
                    +"\" line_id=\"" + document.getElementById(paramIds[3]).value +"\"/>"

                xmlModuleInstancePOSTApi(xmlString);
                /**
                 * is successfully saved removes the form
                 */
                $('#moduleInstanceForm').remove();
            }
            else
                alert("Please Fill Out All Of The Fields!");
        });
    });

    fieldsetMain.append(fieldsetMIParameter, btnSave);
    return formMain;

}

/**
 * sends an api POST call
 * @param {String} xmlString new module instance xml string
 */
function xmlModuleInstancePOSTApi(xmlString){
    $.ajax({
        type: "POST",
        url: APICalls.POST_API_URL_ADD_MODULE_INSTANCE,
        data: xmlString,
        contentType: "text",
        success: function (result) {
            console.log(result);
        },
        error: function (result, status) {
            console.log(result);
        }
    });

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
