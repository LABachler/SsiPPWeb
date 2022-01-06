import * as XMLFiles from './XMLFiles.js';
let xPath;

/*
* universal xml Parser
* returns parsed xml text
* */

function xmlParser(text) {
    let parser = new DOMParser();
    return parser.parseFromString(text, "text/xml");
}

/*
* evaluates a given path for any xml text
* returns result nodes
* */

function evaluateXPATH(xPath, xmlText) {
    let xmlDoc = xmlParser(xmlText);
    return xmlDoc.evaluate(xPath, xmlDoc, null, XPathResult.ANY_TYPE, null);
}

/*
* returns a list of names for module instances
* */

export function getAllModuleInstanceNames() {
    xPath = "//module_instance/@name"
    return evaluateXPATH(xPath, XMLFiles.xmlModuleInstances);
}
    //console.log(getAllModuleInstanceNames().iterateNext())
/*
* get module type with module instance name
* */
export function getModuleByModuleInstanceName(miName) {
    xPath = "string(//module_instance[@name='" + miName + "']/@type)";
    return evaluateXPATH(xPath, XMLFiles.xmlModuleInstances);
}
                console.log(getModuleByModuleInstanceName("DOS-LINE-WATER").stringValue)
/*
* gets a specific attribute
* */
export function getModuleInstancesBySpecifiedAttribute(attName, attValue){
    xPath = "//module_instance[@"+attName+"='"+attValue+"']"
    return evaluateXPATH(xPath, XMLFiles.xmlModuleInstances);
}
                //console.log(getModuleInstancesBySpecifiedAttribute("name","DOS-LINE-WATER").iterateNext())
/*
* gets all module parameters with its name
* */
export function getModuleParamsByModuleName(modName){
    xPath = "//module[@name='"+modName+"']/param";
    return evaluateXPATH(xPath, XMLFiles.xmlModules);
}
                //console.log(getModuleParamsByModuleName("DOS-LINE").iterateNext());

export function getModuleReportsByModuleName(modName) {
    xPath = "//module[@name='" + modName + "']/report/@name";
    return evaluateXPATH(xPath, XMLFiles.xmlModules);
}

/*
* get all attributes of a specific node
* */
export function getAllNodeAttributes(nodeName){
    xPath = "//"+nodeName+"/@*";
    return evaluateXPATH(xPath, XMLFiles.xmlModules);
}

/*
* gets names of saved processes
* */
export function getAllSavedProcesses(){
    xPath = "//process/@name";
    return evaluateXPATH(xPath,XMLFiles.xmlProcesses);
}

//console.log(getAllSavedProcesses().iterateNext());

export function getAllProcessModuleInstancesByProcessName(pName){
    xPath = "/processes/process[@name='" + pName + "']/*"
    return evaluateXPATH(xPath,XMLFiles.xmlProcesses);
}


