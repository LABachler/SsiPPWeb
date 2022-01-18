/*TODO api aufruf apicall.getmoduleinstancexml statt XMLFiles.xmlModuleInstances ->  klasse für api calls schreiben
*/
import * as XMLFiles from './XMLFiles.js';
let xPath;

/**
 * universal xmlParser
 * returns parsed xml text
 * @param {string} text passes an XML String that needs to be parsed
 * @returns {Document} document parsed from xml string
 * */

function xmlParser(text) {
    let parser = new DOMParser();
    return parser.parseFromString(text, "text/xml");
}

/**
 * evaluates a given path for any xml text
 * returns result nodes
 * @param {string} xPath xPath to find needed data in a xml string
 * @param {string} xmlText xml string to be evaluated
 * */

function evaluateXPATH(xPath, xmlText) {
    let xmlDoc = xmlParser(xmlText);
    return xmlDoc.evaluate(xPath, xmlDoc, null, XPathResult.ANY_TYPE, null);
}

/**
* returns a list of names for module instances
* */

export function getAllModuleInstanceNames() {
    xPath = "//module_instance/@name"
    return evaluateXPATH(xPath, XMLFiles.xmlModuleInstances);
}

/**
* get module type with module instance name
 * @param {string} miName module instance name
* */
export function getModuleByModuleInstanceName(miName) {
    xPath = "string(//module_instance[@name='" + miName + "']/@type)";
    return evaluateXPATH(xPath, XMLFiles.xmlModuleInstances);
}

/**
* gets a specific attribute
 * @param {string} attName attribute name
 * @param {string} attValue
 * @returns {XPathResult}
* */
export function getModuleInstancesBySpecifiedAttribute(attName, attValue){
    xPath = "//module_instance[@"+attName+"='"+attValue+"']"
    return evaluateXPATH(xPath, XMLFiles.xmlModuleInstances);
}

/**
* gets all module parameters with its name
 * @param {string} moduleName module name
 * @returns {XPathResult}
**/
export function getModuleParamsByModuleName(moduleName){
    xPath = "//module[@name='"+moduleName+"']/param";
    return evaluateXPATH(xPath, XMLFiles.xmlModules);
}

/**
 * gets all module reports by module name
 * @param {string} modName module name
 * @returns {XPathResult}
 * */

export function getModuleReportByModuleName(modName) {
    xPath = "//module[@name='" + modName + "']/report/@name";
    return evaluateXPATH(xPath, XMLFiles.xmlModules);
}

/**
 * @param {string} nodeName name of a node for which we need attributes
 * @returns {XPathResult}
 * */

export function getNodeAttributes(nodeName){
    xPath = "//"+nodeName+"/@*";
    return evaluateXPATH(xPath, XMLFiles.xmlModules);
}

/**
* gets names of saved processes
* */

export function getAllSavedProcesses(){
    xPath = "//process/@name";
    return evaluateXPATH(xPath,XMLFiles.xmlProcesses);
}
/**
 * @param {string} pName process name
 * @returns {XPathResult}
 * */

export function getProcessModuleInstancesByProcessName(pName){
    xPath = "/processes/process[@name='" + pName + "']/*"
    return evaluateXPATH(xPath,XMLFiles.xmlProcesses);
}


