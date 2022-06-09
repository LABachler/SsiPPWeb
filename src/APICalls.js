// api url

export const GET_API_URL_ALL_PROCESSES_TEMPLATES =
    "http://localhost:7000/SSiPP/process_templates";
export const GET_API_URL_HISTORICAL_PROCESSES =
    "http://localhost:7000/SSiPP/historical_processes";
export const GET_API_URL_ALL_MODULE_INSTANCES =
    "http://localhost:7000/SSiPP/module_instances";
export const GET_API_URL_ALL_MODULES =
    "http://localhost:7000/SSiPP/modules";
export const POST_API_URL_ADD_PROCESS =
    "http://localhost:7000/SSiPP/add_process_template";
export const POST_API_URL_ADD_MODULE_INSTANCE =
    "http://localhost:7000/SSiPP/add_module_instance";
export const POST_API_URL_ADD_MODULE =
    "http://localhost:7000/SSiPP/add_module";
export const POST_API_URL_SET_PROCESS =
    "http://localhost:7000/SSiPP/running_process";
export const GET_API_URL_RUNNING_PROCESS =
    "http://localhost:7000/SSiPP/get_running_process";
export const GET_API_URL_RUNNING_PROCESSES =
    "http://localhost:7000/SSiPP/currently_running_processes";



let xmlModuleInstances;
let xmlModules;
let xmlProcesses;
let xmlHistoricalProcesses;
let xmlRunningProcess;
let xmlRunningProcesses;

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
 * @return {String} running process in an API
 * */
function startRunningProcessAPICall(id){
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


export function getRunningProcess(id){
    startRunningProcessAPICall(id);
    return xmlRunningProcess;
}

export function getRunningProcesses(){
    return xmlRunningProcesses;
}