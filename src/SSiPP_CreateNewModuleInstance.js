
import * as XMLParser from "./XMLParser.js";

let createNewModuleInstance = document.getElementById("createModuleInstance");
let divMain = document.getElementById("tablePositionCreateProcess");
let paramIds = [];

createNewModuleInstance.addEventListener("click", function (){
    let btnHideSB = document.createElement('button');
    btnHideSB.innerHTML = '☰';
    btnHideSB.className = "btn-dark";
    btnHideSB.type = "button";
    btnHideSB.id = 'sidebarCollapseButton';

    $(document).ready(function () {
        $('#sidebarCollapseButton').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    });
    divMain.innerHTML = "";
    $('#tablePosition').hide();
    $('#tablePositionCreateProcess').show();
    $('#createModuleFieldset').hide();
    $('#createProcessField').hide();
    $('#moduleInstanceFrom').show();
    /**
     * select menu with all modules
     * */

    divMain.appendChild(btnHideSB);
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

function createField(type){

    paramIds = [];
    $('#moduleInstanceForm').remove();
    let formMain = document.createElement("form");//main form where all module instances are appended
    formMain.id = "moduleInstanceForm";
    let divForm = document.createElement("div");
    let fieldsetMain = document.createElement("fieldset");
    let legendFieldName = document.createElement("legend");
    let lblModuleInstanceName = document.createElement("label");
    let inpModuleInstanceName = document.createElement("input");
    let fieldsetMIParameter = document.createElement("fieldset");
    let legendParameter = document.createElement("legend");
    fieldsetMIParameter.id ="createModuleInstanceParameterFieldset";
    fieldsetMIParameter.className ="fieldset";
    let pBreakLine = document.createElement("p");
    fieldsetMIParameter.append(legendParameter, pBreakLine);
    legendParameter.innerHTML = "Module Instance Parameters";
    legendParameter.style.fontSize = "15px";


    fieldsetMain.className = "fieldset";
    fieldsetMain.id ="createModuleInstanceField";
    legendFieldName.innerHTML = type;
    legendFieldName.className = "labels"
    lblModuleInstanceName.innerHTML = "Name a module instance";
    lblModuleInstanceName.className = "labels"
    divMain.className = "divMain";
    inpModuleInstanceName.className = "form-control";
    inpModuleInstanceName.id = "inpModuleInstanceName";
    inpModuleInstanceName.value = type + "-";

    fieldsetMain.appendChild(legendFieldName);
    fieldsetMain.appendChild(lblModuleInstanceName);
    fieldsetMain.appendChild(inpModuleInstanceName);
    divForm.appendChild(fieldsetMain);
    formMain.appendChild(divForm);


    let params = ["Plc IP", "Data block Name", "Line ID"]
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
    //<module_instance type="DOS-LINE" plc="192.168.1.1" name="DOS-LINE-WATER" datablock_name="DB-1" line_id="1"/>

    let btnSave = document.createElement('button');
    btnSave.innerHTML = 'Save';
    btnSave.className = "btn-dark";
    btnSave.type = "button";
    btnSave.id = 'saveModuleInstance';

    $(document).ready(function () {
        $('#saveModuleInstance').on('click', function () {
            if(validateForm()){

                let xmlString = "<module_instance type=\""+type+"\" plc=\""+ document.getElementById(paramIds[0]).value +"\" name=\""
                    + document.getElementById("inpModuleInstanceName").value +"\" datablock_name=\""
                    + document.getElementById(paramIds[1]).value +"\" line_id=\""
                    + document.getElementById(paramIds[2]).value +"\"/>"
                console.log(xmlString);
                xmlModuleInstancePOSTApi(xmlString);
                $('#moduleInstanceForm').remove();
            }
            else
                alert("Please Fill Out All Of The Fields!");
        });
    });

    fieldsetMain.append(fieldsetMIParameter, btnSave);
    return formMain;

}
//TODO API Call to POST on module instances api
function xmlModuleInstancePOSTApi(xmlString){

}


function validateForm() {
    let isValid = true;
    $('.form-control').each(function() {
        if ( $(this).val() === '' )
            isValid = false;
    });

    return isValid;
}
