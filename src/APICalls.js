// api url

export const GET_API_URL_ALL_PROCESSES_TEMPLATES =
    "http://localhost:3000/processes";
export const GET_API_URL_HISTORICAL_PROCESSES =
    "http://localhost:3000/processesHistory";
export const GET_API_URL_ALL_MODULE_INSTANCES =
    "http://localhost:3000/moduleInstances";
export const GET_API_URL_ALL_MODULES =
    "http://localhost:3000/modules";
export const POST_API_URL_ADD_PROCESS =
    "http://localhost:3000/process";
export const POST_API_URL_ADD_MODULE_INSTANCE =
    "http://localhost:3000/moduleInstance";
export const POST_API_URL_ADD_MODULE =
    "http://localhost:3000/module";
export const POST_API_URL_SET_PROCESS =
    "http://localhost:3000/runningProcess";



// getHistoricalProcesses()
// setProcess(xmlString, STATUS) -> bei jeder Änderung kommt über Stream ein update des XML Strings
// saveProcessTemplate(xmlstring)


let xmlModuleInstances;
let xmlModules;
let xmlProcesses;
let xmlHistoricalProcesses;

/*
$.ajax({
    type: "POST",
    url: api_url_module_instances,
    data: JSON.stringify({"moduleInstances" : xmlModuleInstances.toString() }),
    contentType: "application/json",
    success: function (result) {
        console.log(result);
    },
    error: function (result, status) {
        console.log(result);
    }
});


$.ajax({
    type: "POST",
    url: api_url_modules,
    data: JSON.stringify({"modules" : xmlModules.toString() }),
    contentType: "application/json",
    success: function (result) {
        console.log(result);
    },
    error: function (result, status) {
        console.log(result);
    }
});*/


$.ajax({
    async: false,
    url: GET_API_URL_ALL_PROCESSES_TEMPLATES,
    type: "GET",
    dataType: "json",
    success: function (data) {
        xmlProcesses = data[data.length - 1].processes;
    }
});
$.ajax({
    async: false,
    url: GET_API_URL_ALL_MODULES,
    type: "GET",
    dataType: "json",
    success: function (data) {
        xmlModules = data[data.length - 1].modules;
    }
});
$.ajax({
    async: false,
    url: GET_API_URL_ALL_MODULE_INSTANCES,
    type: "GET",
    dataType: "json",
    success: function (data) {
        xmlModuleInstances = data[data.length - 1].moduleInstances;
    }
});
//TODO: add this when an api exists
/*
$.ajax({
    async: false,
    url: GET_API_URL_HISTORICAL_PROCESSES,
    type: "GET",
    dataType: "json",
    success: function (data) {
        xmlModuleInstances = data[data.length - 1].processesHistory;
    }
});
*/

/**
 * @return {String} last saved processes in an API
 * */
export function getAllSavedProcesses(){
    return xmlProcesses;
}
/**
 * @return {String} all historical processes in an API
 * */
export function getAllHistoricalProcesses(){
    return xmlHistoricalProcesses;
}
/**
 * @return {String} last saved modules in an API
 * */
export function getAllModules(){
    return xmlModules;
}
/**
 * @return {String} last saved moduleInstances in an API
 * */
export function getAllModuleInstances(){
    return xmlModuleInstances;
}

