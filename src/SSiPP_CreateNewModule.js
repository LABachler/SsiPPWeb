import * as XMLParser from "./XMLParser.js";

let menuItemCreateNewModule = document.getElementById("createModule");//menu item

menuItemCreateNewModule.addEventListener('click', function () {
    let divMain = document.getElementById("tablePositionCreateProcess");//
    let formMain = document.createElement("form");
    let divForm = document.createElement("div");
    let fieldsetModule = document.createElement("fieldset");
    let legendFieldModuleName = document.createElement("legend");
    let lblModuleName = document.createElement("label");
    let inpModuleName = document.createElement("input");
    let lblModuleDescription = document.createElement("label");
    let inpModuleDescription = document.createElement("input");
    let parameters = [];
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
    divMain.className = "divMain";

    fieldsetModule.appendChild(legendFieldModuleName);
    fieldsetModule.appendChild(lblModuleName);
    fieldsetModule.appendChild(inpModuleName);
    fieldsetModule.appendChild(lblModuleDescription);
    fieldsetModule.appendChild(inpModuleDescription);
    divForm.appendChild(fieldsetModule);
    formMain.appendChild(divForm);
    //remove elem from div

    divMain.innerHTML = "";
    $('#tablePosition').hide();
    $('#tablePositionCreateProcess').show();
    $('#createProcessField').hide();
    $('#moduleInstanceForm').hide();
    let btnSaveModule = document.createElement('button');
    btnSaveModule.innerHTML = 'Save';
    btnSaveModule.className = "btn-dark";
    btnSaveModule.id = 'saveModule';

    let btnAddParameter = document.createElement('button');
    btnAddParameter.innerHTML = '+ Parameter';
    btnAddParameter.className = "btn-dark";
    btnAddParameter.id = 'addParam';

    let btnAddReport = document.createElement('button');
    btnAddReport.innerHTML = '+ Report';
    btnAddReport.className = "btn-dark";
    btnAddReport.id = 'addReport';

    let btnHideSB = document.createElement('button');
    btnHideSB.innerHTML = '☰';
    btnHideSB.className = "btn-dark";
    btnHideSB.type = "button";
    btnHideSB.id = 'sidebarCollapseButton';

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
                    + document.getElementById("inpModuleName").value + "\" comment=\"" + document.getElementById("inpModuleDescription").value + "\">";

                for (let param = 0; param < parameters.length; param++) {
                    xmlModuleString += "<param name=\"" + document.getElementById(parameters[param++]).value +
                        "\" type=\"" + document.getElementById(parameters[param++]).value +
                        "\" engineering_unit=\"" + document.getElementById(parameters[param++]).value +
                        "\" plc_name=\"" + document.getElementById(parameters[param++]).value +
                        "\" min_val=\"" + document.getElementById(parameters[param++]).value +
                        "\" max_val=\"" + document.getElementById(parameters[param]).value +
                        "\" multiplier=\"1\"></param>";
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
                xmlModuleString = vkbeautify.xml(xmlModuleString, 4);
                console.log(xmlModuleString);
            }else alert("You have to fill out all of the fields!");
//TODO: api POST ajax -> send module to an api
        });
    });

    fieldsetModule.append(btnAddParameter, btnAddReport);
    divMain.append(btnHideSB,formMain, btnSaveModule);
})

function getMaxId(){
    let existingModuleIDs = XMLParser.getAllModuleIDs();
    let moduleIDIterator = null;
    let maxID=0;

    while(moduleIDIterator = existingModuleIDs.iterateNext()){
        if(parseInt(moduleIDIterator.value) > maxID){
            console.log(moduleIDIterator.value)
            maxID = parseInt(moduleIDIterator.value);
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
