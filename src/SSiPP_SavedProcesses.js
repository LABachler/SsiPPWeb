import * as XMLParser from './XMLParser.js';
import * as APICalls from "./APICalls.js";

/**
 * submenu of saved processes
 * @type {HTMLElement}
 */
let processesSubMenu = document.getElementById("pageSubmenu");
/**
 * @type {XPathResult}
 * all saved process names
 */
let processesNames = XMLParser.getAllSavedProcesses();
let processName = null;
/**
 * name of a started process
 */
let runProcessName;
/**
 * running processes submenu
 * @type {HTMLElement}
 */
let nowRunningMenuItem = document.getElementById('nowRunning');

let intervals = [];

nowRunningMenuItem.addEventListener("click", function() {
})

while(processName = processesNames.iterateNext()){

    let processNameStr = processName.value;
    let liItem = document.createElement("li");
    let paramText = document.createTextNode(processName.value);
    let aItem = document.createElement("a");

    aItem.href = '#';
    aItem.id = processName.value;
    aItem.className = 'savedProcessesList'

    aItem.addEventListener("click", function (){
        showData(processNameStr, false);
    })

    aItem.appendChild(paramText);
    liItem.appendChild(aItem);
    processesSubMenu.appendChild(liItem);
}

/**
 * builds a whole process flow table
 * @param {string} processName name of a process
 * @param {boolean} nowRunning is the process running or not
 * */
function showData(processName, nowRunning) {

    //clear div
    $('select').remove();
    $('label').hide();
    //$('button').remove();
    $('fieldset').hide();
    $('#tablePosition').show();
    $('#tablePositionCreateProcess').hide();
    $('.table').remove();

    let headerProcessName = createElement('h2', 'h2');
    headerProcessName.innerHTML = processName;

    let scaleLabel = createElement('label', 'labels');
    scaleLabel.innerHTML = "Scale";

    let scaleInput = createElement('select', 'selects');
    scaleInput.id = "processScale";
    let i = 0.2;
    while(i<=2){
        let option = document.createElement('option');
        let name = document.createElement('a');
        option.appendChild(name);
        name.innerText = i.toFixed(1).toString();
        scaleInput.appendChild(option);
        i+=0.2;
    }

    let startProcessButton = createElement('button', "btn-dark");
    let buttonText;

    if (nowRunning)
        buttonText = "STOP";
    else
        buttonText = "START";

    startProcessButton.innerText = buttonText;

    startProcessButton.addEventListener('click', function () {
        console.log(" scale=\""+scaleInput.options[scaleInput.selectedIndex].text+"\"");

        if (buttonText === "STOP") {
            buttonText = "START";
            document.getElementById("" + processName).click();
            document.getElementById("savedProcesses").click();
        } else {
            //TODO: add menu items for started processes
            buttonText = "STOP";
            runProcessName = processName;
            let liItem = document.createElement("li");
            let paramText = document.createTextNode(runProcessName);
            let aItem = document.createElement("a");
            aItem.appendChild(paramText);
            liItem.appendChild(aItem);
            document.getElementById('nowRunning').appendChild(liItem);
            let runProcessID = XMLParser.getProcessIDByProcessesName(processName);

            //document.getElementById("savedProcesses").click();
            //document.getElementById('nowRunning').click();

            $.ajax({
                type: "POST",
                url: APICalls.POST_API_URL_SET_PROCESS,
                data: "<startProcess id=\"" + runProcessID.stringValue + "\" command=\"START\" scale=\""+scaleInput.options[scaleInput.selectedIndex].text+"\"/>",
                contentType: "text",
                success: function (result) {
                    console.log(result);
                },
                error: function (result) {
                    console.log(result);
                }
            });


            aItem.addEventListener('click', function (){
                for(let i = 0; i < intervals.length; i++){
                    clearInterval(intervals[i]);
                }
                let id = runProcessID;
                $('.dataTable').empty();
                insertRowAndCellWithText(dataTable, '▼ START ▼', 'noDataRow');
                processModInstances = XMLParser.getRunningProcessModuleInstances(id.stringValue);
                appendData(processModInstances,dataTable,nowRunning);
                intervals.push(setInterval(function (){
                    $('.dataTable').empty();
                    insertRowAndCellWithText(dataTable, '▼ START ▼', 'noDataRow');
                    processModInstances = XMLParser.getRunningProcessModuleInstances(id.stringValue);
                    appendData(processModInstances,dataTable,true);
                }, 15000))
            })

        }
    });

    let divGrid = document.getElementById('tablePosition');
    divGrid.innerHTML = "";

    /**
     * @type {HTMLElement}
     * table for a process
     */
    let dataTable = createElement('table', 'dataTable');
    insertRowAndCellWithText(dataTable, '▼ START ▼', 'noDataRow');

    divGrid.append(headerProcessName,startProcessButton,scaleLabel,scaleInput,dataTable);
    let processModInstances;

    if (nowRunning === false){
        processModInstances = XMLParser.getProcessModuleInstancesByProcessName(processName);
        appendData(processModInstances, dataTable, nowRunning);
    }
    /*else{

        processModInstances = XMLParser.getRunningProcessModuleInstances();
        appendData(processModInstances,dataTable,nowRunning);
        setInterval(function (){
            $('.dataTable').empty();
            insertRowAndCellWithText(dataTable, '▼ START ▼', 'noDataRow');
            processModInstances = XMLParser.getRunningProcessModuleInstances();
            appendData(processModInstances,dataTable,nowRunning);

        }, 15000)
    }*/

}

/**
 * shows process data in a table form
 * @param {XPathResult}processModInstances
 * @param {HTMLTableElement}dataTable
 * @param {Boolean}nowRunning
 */
export function appendData(processModInstances,
                           dataTable,
                           nowRunning){

    let subTableReport = null;
    let pmInstance = null;
    while(pmInstance = processModInstances.iterateNext()){
        console.log(pmInstance);
        let mainTableRow = dataTable.insertRow(-1);
        let cell = mainTableRow.insertCell(-1);

        cell.className = "mainCell";
        mainTableRow.className = "mainCell";

        if(pmInstance.nodeName === 'parallel'){
            for (let i = 0; i < pmInstance.children.length; i++) {

                let mainRowCellWrapper = document.createElement('div');
                mainRowCellWrapper.style.cssText = "border: 1px solid transparent; vertical-align: top; width: " +
                    100 / pmInstance.children.length + "%; float:left";

                if(pmInstance.children[i].nodeName === 'subParallel'){
                    let rowCellWrapper = createElement('div', 'subCellWrapper');

                    for(let k = 0; k < pmInstance.children[i].children.length; k++){
                        let subTable = createElement('table', 'subTable');

                        insertRowAndCellWithText(subTable,
                            pmInstance.children[i].children[k].getAttribute('datablock_name'), 'subCell');

                        if(nowRunning === true){
                            subTableReport = createSubTableReport();
                            console.log("IS PARALLEL");
                        }

                        for(let j = 0; j < pmInstance.children[i].children[k].children.length; j++){
                            createSubTables(true,pmInstance.children[i].children[k].children[j], nowRunning,
                                subTableReport, subTable, cell, mainTableRow, mainRowCellWrapper)
                            rowCellWrapper.appendChild(subTable);

                            if(nowRunning === true){
                                createTableToggleFunction(subTable, subTableReport);
                            }
                        }
                        if(k < pmInstance.children[i].children.length-1){
                            insertRowAndCellWithText(subTable, '🢃', 'subBindingRow');
                        }

                        mainRowCellWrapper.appendChild(rowCellWrapper);
                    }
                }
                else if(pmInstance.children[i].nodeName === 'module_instance'){

                    let subTable = createElement('table', 'subTable');
                    insertRowAndCellWithText(subTable, pmInstance.children[i].getAttribute("datablock_name"), 'subCell');

                    if(nowRunning === true){
                        subTableReport = createSubTableReport();
                    }

                    cell.appendChild(mainRowCellWrapper);
                    mainTableRow.appendChild(cell);

                    for (let j = 0; j < pmInstance.children[i].children.length; j++) {
                        createModuleInstanceTable(false, mainRowCellWrapper, subTable, subTableReport,
                            pmInstance.children[i].children[j], nowRunning, cell, mainTableRow);
                    }
                }

            }
        }
        else if(pmInstance.nodeName === 'module_instance'){

            let mainRowCellWrapper = createElement('div', 'mainRowCellWrapper');
            let subTable = createElement('table', 'subTable');
            insertRowAndCellWithText(subTable, pmInstance.getAttribute('datablock_name'), 'subCell');

            if(nowRunning === true){
                subTableReport = createSubTableReport();
            }

            cell.appendChild(mainRowCellWrapper);
            mainTableRow.appendChild(cell);

            for(let j = 0; j < pmInstance.children.length; j++){
                createModuleInstanceTable(false, mainRowCellWrapper, subTable, subTableReport,
                    pmInstance.children[j], nowRunning, cell, mainTableRow)
            }
        }

        insertRowAndCellWithText(dataTable, '🢃', 'noDataRow');
    }
    insertRowAndCellWithText(dataTable, 'END', 'noDataRow');
}

/**
 * inserts a row and a cell with a text and class name
 * @param {HTMLTableElement} table
 * @param {string} text text in a cell
 * @param {string} className
 * */
function insertRowAndCellWithText(table, text, className){
    let row = table.insertRow(-1);
    let cell = row.insertCell(-1)
    cell.innerHTML = text;
    cell.className = className;
}

/**
 * creates an element and gives ist a class name
 * @param {string} elementName name of the element to create
 * @param {string} className class of the element
 * */
export function createElement(elementName, className){
    let element = document.createElement(elementName);
    element.className = className;
    return element;
}
/**
 * calls on methods to create module instance tables and appends
 * them to module instance wrapper(mainRowCellWrapper)
 * @param {boolean} hasSubParallel is true if a module instance has subParallel module instance
 * @param {HTMLDivElement} mainRowCellWrapper module instance table wrapper
 * @param {HTMLTableElement} subTable module instance table
 * @param {HTMLTableElement} subTableReport module instance report table
 * @param {any} pmInstanceChild module instance parsed from xml
 * @param {boolean} nowRunning is the process now running or not
 * @param {HTMLTableCellElement} cell cell in which to append a module instance table wrapper
 * @param {HTMLTableRowElement} mainTableRow row where cell is appended to
 * */

function createModuleInstanceTable(hasSubParallel,
                                   mainRowCellWrapper,
                                   subTable,
                                   subTableReport,
                                   pmInstanceChild,
                                   nowRunning,
                                   cell,
                                   mainTableRow){

    createSubTables(hasSubParallel,pmInstanceChild, nowRunning, subTableReport,
        subTable, cell, mainTableRow, mainRowCellWrapper);

    mainRowCellWrapper.appendChild(subTable);

    if(nowRunning === true){
        subTable.appendChild(subTableReport);
    }
}


/**
 * creates a table with module instance name and it's parameters
 * @param {boolean} hasSubParallel is true if a module instance has subParallel module instance
 * @param {HTMLDivElement} mainRowCellWrapper module instance table wrapper
 * @param {HTMLTableElement} subTable module instance table
 * @param {HTMLTableElement} subTableReport module instance report table
 * @param {any} pmInstanceChild module instance parsed from xml
 * @param {boolean} nowRunning is the process now running or not
 * @param {HTMLTableCellElement} cell cell in which to append a module instance table wrapper
 * @param {HTMLTableRowElement} mainTableRow row where cell is appended to
 * */

function createSubTables(hasSubParallel,
                         pmInstanceChild,
                         nowRunning,
                         subTableReport,
                         subTable,
                         cell,
                         mainTableRow,
                         mainRowCellWrapper){

    if(pmInstanceChild.nodeName === 'param'){
        if(hasSubParallel){
            cell.appendChild(mainRowCellWrapper);
            mainTableRow.appendChild(cell);
        }
        createParamTable(pmInstanceChild, subTable)
    }
    else if(nowRunning === true && pmInstanceChild.nodeName === 'report'){

        cell.appendChild(mainRowCellWrapper);
        mainTableRow.appendChild(cell);

        createParamTable(pmInstanceChild, subTableReport);
    }
    else if(nowRunning === true && pmInstanceChild.nodeName === 'module_instance_report'){
        for(let l = 0; l < pmInstanceChild.children.length; l++){

            createReportValuesTable(pmInstanceChild.children[l], subTableReport);

        }
    }
}

/**
 * creates a toggle function on a module instance table to show or hide report values
 * @param {HTMLTableElement} table adds method to this table
 * @param {HTMLTableElement} toggleTable table that needs to be shown or hidden
 * */
export function createTableToggleFunction(table, toggleTable){
    let toggle = 0;
    table.addEventListener('click', function (){
        if(toggle === 0){
            table.appendChild(toggleTable);
            toggle = 1;
        }
        else if(toggle === 1){
            toggleTable.remove();
            toggle = 0;
        }

    });
}

/**
 * creates a table for module instance report values
 * */
function createSubTableReport(){
    let subTableReport = document.createElement('table');
    subTableReport.className = "subTable";

    let subTableRow = subTableReport.insertRow(-1);
    let subCell = subTableRow.insertCell(-1);

    subCell.innerHTML = "REPORT:";
    subCell.className = "subCell";

    return subTableReport;
}
/**
 * creates parameter table to be added to a main table cell
 * @param {any} pmInstance parameter to add into a table
 * @param {HTMLTableElement} subTable in this table we add a parameter table
 * */
function createParamTable(pmInstance, subTable){
    let paramTable = document.createElement('table');
    let paramTableRow = subTable.insertRow(-1);
    let paramTableCell = paramTableRow.insertCell(-1);

    let paramRow = paramTable.insertRow(-1);
    paramRow.className = 'subTableRow';

    let paramCell = paramRow.insertCell(-1);
    paramCell.innerHTML = pmInstance.getAttribute('name');
    paramCell.className = "paramCell";

    paramCell = paramRow.insertCell(-1);
    paramCell.innerHTML = pmInstance.innerHTML;
    paramCell.className = "paramCell";

    paramCell = paramRow.insertCell(-1);
    paramCell.innerHTML = pmInstance.getAttribute('engineering_unit');
    paramCell.className = "paramCell";


    paramTableCell.appendChild(paramTable)
}

/**
 * creates a table with module instance report values
 * @param {any} pmInstance module instance
 * @param {HTMLTableElement} subTable table for report values table
 * */
function createReportValuesTable(pmInstance, subTable){
    let reportTable = document.createElement('table');
    let reportTableRow = subTable.insertRow(-1);
    let reportTableCell = reportTableRow.insertCell(-1);

    let reportRow = reportTable.insertRow(-1);
    reportRow.className = 'subTableRow';

    let reportCell = reportRow.insertCell(-1);
    reportCell.innerHTML = pmInstance.tagName;
    reportCell.className = "paramCell";

    reportCell = reportRow.insertCell(-1);
    reportCell.innerHTML = pmInstance.innerHTML;
    reportCell.className = "paramCell";


    reportTableCell.appendChild(reportTable)
}

/**
 * for the purpose of animating a current running module instance
 * changes a class name to add an animation to a table
 * @param {string} tableID id of a table whose class needs to be changed
 * @param {string} newClassName a class name to be added
 * */
function changeClassOfATable(tableID, newClassName){
    let oldClassName = $('#'+tableID).className;
    $('#'+tableID).removeClass(oldClassName);
    $('#'+tableID).addClass(newClassName);
}