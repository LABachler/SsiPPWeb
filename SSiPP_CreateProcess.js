
import * as XMLParser from './XMLParser.js';
import * as Style from './CSS_Style.js';

let createNewProcess = document.getElementById("createProcess");  //menu item
let mainDiv = document.getElementById("tablePosition");           //
let canvas = document.createElement("div");                        //div that holds all other divs for this menu item
             //wrapper dir vor select cascade menu

/*
* button for saving new processes
* */
let saveProcessButton = document.createElement("button");
saveProcessButton.innerHTML = "Save"
saveProcessButton.style.cssText = Style.addButtonStyle;
saveProcessButton.onmouseenter = function (){
    saveProcessButton.style.cssText = Style.addButtonHoverStyle;
}
saveProcessButton.onmouseleave = function (){
    saveProcessButton.style.cssText = Style.addButtonStyle;
}
saveProcessButton.addEventListener('click', function () {
    console.log(document.getElementsByTagName("fieldset"))

})

let fieldForm = document.createElement("form");
fieldForm.id = "fieldForm";
let formDiv = document.createElement("div");
let fieldset = document.createElement("fieldset");
fieldset.style.cssText = "padding:15px; border:3px solid #5e0000; background:#c7bdbd; border-radius:15px"
let fieldName = document.createElement("legend");
fieldName.innerHTML = "Process";
fieldset.appendChild(fieldName);
let fieldProcessName = document.createElement("label");
fieldProcessName.innerHTML = "Name a process";
let nameInput = document.createElement("input");
nameInput.style.borderRadius = "10px";
nameInput.style.marginLeft = "15px";
fieldset.appendChild(fieldProcessName);
fieldset.appendChild(nameInput);
formDiv.appendChild(fieldset);
fieldset.appendChild(saveProcessButton);
fieldForm.appendChild(formDiv);
let i = 0;

/*
* button onclick adds module instances to a new process
* style for that button and methods
* @param {string} modType - name of a chosen module instance type
* @param {node-array} moduleParams - all parameter nodes of a chosen module instance type
* @param {node} param - one parameter node from parameter node array
* @param {fieldset-tag} modFieldSet - creates a fieldset for one module instance
* @param {legend-tag} modLegend - creates a legend tag to show a name of a module instance
* @param {p-tag} paramBreak - creates a break between to parameters so they aren't shown in the same line
* @param {legend-tag} modStep shows which step in the process this module instance is
* @param {span-tag}
*
* */
let addButton = document.createElement('button');
addButton.innerHTML = '+';
addButton.style.cssText = Style.addButtonStyle;

addButton.onmouseenter = function(){
    addButton.style.cssText =  Style.addButtonHoverStyle;
}
addButton.onmouseleave = function (){
    addButton.style.cssText = Style.addButtonStyle;
}
addButton.addEventListener('click', function () {

    let modType = XMLParser.getModuleByModuleInstanceName(selectModules.options[selectModules.selectedIndex].text).stringValue;
    let moduleParams = XMLParser.getModuleParamsByModuleName(modType);
    let param = null;
    let modFieldset = document.createElement("fieldset");
    modFieldset.style.cssText = "padding:10px; border:3px solid #5e0000; background:#c7bdbd; border-radius:15px"
    modFieldset.id = selectModules.options[selectModules.selectedIndex].text;
    let modLegend = document.createElement("legend");
    let paramBreak = document.createElement("p");
    let modAttName;
    let modAttLegend;
    let modAttInput;
    let modStep = document.createElement("legend");
    modStep.style.fontSize = "18px"
    modLegend.innerHTML = selectModules.options[selectModules.selectedIndex].text;
    modLegend.style.fontSize = "20px"
    modStep.innerHTML = " Step: " + i;
    modFieldset.appendChild(modLegend);
    modFieldset.appendChild(paramBreak);
    modFieldset.appendChild(modStep);

    while(param = moduleParams.iterateNext()) {
        let paramBreak = document.createElement("p");

        for (let i=0; i<param.attributes.length; i++) {
            let attrib = param.attributes[i];

            if (attrib.name === "name" || attrib.name === "engineering_unit") {
                modAttName = document.createElement("span");
                modAttLegend = document.createElement("label");
                modAttLegend.innerHTML = attrib.value;
                modAttLegend.style.cssText = "margin-left: 10px;"
                modAttName.appendChild(modAttLegend);

                if(attrib.name === "name" ) {
                    modAttInput = document.createElement("input");
                    modAttInput.style.cssText = "border-radius:10px; margin-left: 10px";
                    modAttInput.id = attrib.value;
                    modAttName.appendChild(modAttInput);
                }
                modFieldset.appendChild(modAttName);
            }
            modFieldset.appendChild(paramBreak)
        }
    }
    i++;

    modAttName = document.createElement("span");
    modAttLegend = document.createElement("label");
    modAttLegend.innerHTML = "predecessor:";
    modAttName.appendChild(modAttLegend);
    modAttInput = document.createElement("input");
    modAttInput.style.cssText = "border-radius:10px; margin-left: 10px";
    modAttName.appendChild(modAttInput);
    modFieldset.appendChild(modAttName);
    modFieldset.appendChild(paramBreak)
    fieldset.appendChild(modFieldset);
    canvas.appendChild(fieldset);
    document.getElementById("wrapper").appendChild(canvas);
})


/*
* createNewProcess - makes a select menu with its items, a button for adding modules
* @param {select-tag} selectModules - creates select element
* @param {div-tag} selectWrapper - wraps a select menu in a div for styling
* @param {string-array} moduleNames - has all module instance names dor select menu
* @param {option-tag} menuSelHeader - menu select instructions
* @param {attribute-node} module - has all attributes "name" with its value for a module instance
* @param {option-tag} moduleListItem - adds an option in select menu
* @param {a-tag} moduleListItemName - adds the name of a module instance to a previously created option
* */
let selectWrapper = document.createElement("div");
selectWrapper.id = 'selWrapper';
let moduleNames = XMLParser.getAllModuleInstanceNames();
selectWrapper.style.cssText = Style.addButtonStyle;
let selectModules = document.createElement("select");
selectModules.name = "selectModules";
selectModules.id = "selectModules";


createNewProcess.addEventListener("click", function() {

    mainDiv.style.cssText = "display: grid; \n" +
        "  grid-template-columns: 1fr 0.2fr; \n" +
        "  grid-template-rows: 0.2fr;\n"+
        "  gap: 2px 2px; \n"
    //remove elem from div
    mainDiv.innerHTML = "";
    $('label').remove();
    $('fieldset').show();
    //add items to a menu
    let menuSelHeader = document.createElement("option");
    menuSelHeader.text = "Choose a process"
    selectModules.appendChild(menuSelHeader);

    let module;
    while (module = moduleNames.iterateNext()) {
        let moduleListItem = document.createElement("option");
        moduleListItem.style.cssText = "background: #c7bdbd";
        let moduleListItemName = document.createElement("a");
        moduleListItemName.style.fontFamily = "\"Lucida Console\", \"Courier New\", monospace"
        moduleListItemName.value = module.value;
        moduleListItemName.text = module.value;
        moduleListItemName.id = module.value;
        moduleListItem.appendChild(moduleListItemName);
        selectModules.appendChild(moduleListItem);
    }

    selectModules.style.cssText = Style.selectStyle;
    selectWrapper.appendChild(selectModules);
    document.getElementById("tablePosition").appendChild(selectWrapper);
    document.getElementById('tablePosition').appendChild(addButton);

    /*
    * on select from a menu show info about selected module instance
    * @param {string} moduleInstanceName - represents name of a selected module instance
    * */
    document.getElementById("selectModules").onchange = changeListener;
    function changeListener(){
        let moduleInstanceName = selectModules.options[selectModules.selectedIndex].text;
        getModuleData(moduleInstanceName);

    }
})

/*
* getModuleData shows info about a module instance with all ist parameters
* @param {div-tag} moduleInfoPopUp - div for info text about a module instance
* @param {string} moduleInstanceType - represents a type of a module instance
* @param {node-array} moduleParams - represents all parameters of a module
* @param {node} param - represents one node from node array
* @attrib {node-attribute} - has only one attribute with its name and value
* */

let moduleInfoPopUp = document.createElement("div");

function getModuleData(moduleInstanceName){
    let moduleInstanceType = XMLParser.getModuleByModuleInstanceName(moduleInstanceName).stringValue;
    let moduleParams = XMLParser.getModuleParamsByModuleName(moduleInstanceType);
    let param = moduleParams.iterateNext()

    moduleInfoPopUp.id = "modInfo"
    moduleInfoPopUp.style.cssText = "margin-left:10px; padding: 10px; background: #c7bdbd; border-radius: 20px; border: 2px solid #610101;"
    moduleInfoPopUp.innerText="";
    moduleInfoPopUp.style.maxHeight = param.attributes.length * 30 +"px";

    document.getElementById("tablePosition").appendChild(moduleInfoPopUp);

    for (let i=0; i<param.attributes.length; i++){
        let attrib = param.attributes[i];
        moduleInfoPopUp.innerText += attrib.name + ": " +attrib.value + "\n";
    }

}