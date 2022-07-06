
/**
 * API URL to get all templates of saved processes
 * @type {string}
 */
export const GET_API_URL_ALL_PROCESSES_TEMPLATES =
    "http://localhost:7000/SSiPP/process_templates";
/**
 * API URL to get all historical processes
 * @type {string}
 */
export const GET_API_URL_HISTORICAL_PROCESSES =
    "http://localhost:7000/SSiPP/historical_processes";
/**
 * API URL to get all saved module instances
 * @type {string}
 */
export const GET_API_URL_ALL_MODULE_INSTANCES =
    "http://localhost:7000/SSiPP/module_instances";
/**
 * API URL to get all saved modules
 * @type {string}
 */
export const GET_API_URL_ALL_MODULES =
    "http://localhost:7000/SSiPP/modules";
/**
 * API URL to post and save new process
 * @type {string}
 */
export const POST_API_URL_ADD_PROCESS =
    "http://localhost:7000/SSiPP/add_process_template";
/**
 * API URL to post and save new module instance
 * @type {string}
 */
export const POST_API_URL_ADD_MODULE_INSTANCE =
    "http://localhost:7000/SSiPP/add_module_instance";
/**
 * API URL to post and save new module
 * @type {string}
 */
export const POST_API_URL_ADD_MODULE =
    "http://localhost:7000/SSiPP/add_module";
/**
 * API URL to start new process
 * @type {string}
 */
export const POST_API_URL_SET_PROCESS =
    "http://localhost:7000/SSiPP/running_process";
/**
 * API URL to get data of a running process
 * @type {string}
 */
export const GET_API_URL_RUNNING_PROCESS =
    "http://localhost:7000/SSiPP/get_running_process";
/**
 * API URL to get all currently running processes
 * @type {string}
 */
export const GET_API_URL_RUNNING_PROCESSES =
    "http://localhost:7000/SSiPP/currently_running_processes";



let xmlModuleInstances;
let xmlModules;
let xmlProcesses;
let xmlHistoricalProcesses;
let xmlRunningProcess;
let xmlRunningProcesses;

/**
 * API calls that get all the information needed when starting the page
 */

$.ajax({
    async: false,
    url: GET_API_URL_ALL_PROCESSES_TEMPLATES,
    type: "GET",
    dataType: "text",
    success: function (data) {
        xmlProcesses = data;
    }
});
$.ajax({
    async: false,
    url: GET_API_URL_ALL_MODULES,
    type: "GET",
    dataType: "text",
    success: function (data) {
        xmlModules = data;
    }
});
$.ajax({
    async: false,
    url: GET_API_URL_ALL_MODULE_INSTANCES,
    type: "GET",
    dataType: "text",
    success: function (data) {
        xmlModuleInstances = data;
    }
});
$.ajax({
    async: false,
    url: GET_API_URL_HISTORICAL_PROCESSES,
    type: "GET",
    dataType: "text",
    success: function (data) {
        xmlHistoricalProcesses = data;
    }
});
$.ajax({
    async: false,
    url: GET_API_URL_RUNNING_PROCESSES,
    type: "GET",
    dataType: "text",
    success: function (data) {
        console.log(data);
        xmlRunningProcesses = data;
    }
});

/**
 * @param {String} id -> id of a running process
 * @return {String} xmlRunningProcess -> currently running process in an API
 * */
function runningProcessAPICall(id){
    $.ajax({
        async: false,
        url: GET_API_URL_RUNNING_PROCESS + "/"+id,
        type: "GET",
        dataType: "text",
        success: function (data) {
            xmlRunningProcess = data;
        }
    });
}

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
/**
 * @param {String} id - running process id
 * @return {String} xmlRunningProcess - currently running process with updated data
 */
export function getRunningProcess(id){
    runningProcessAPICall(id);
    return xmlRunningProcess;
}
/**
 * @return {String} all ids of running processes as xml string
 */
export function getRunningProcesses(){
    return xmlRunningProcesses;
}