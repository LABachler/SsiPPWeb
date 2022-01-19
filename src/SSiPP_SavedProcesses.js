import * as XMLParser from './XMLParser.js';

/**
 * gets all process names and adds them to a side sub-menu
 * */

let processesSubMenu = document.getElementById("pageSubmenu");  //list of all saved processes
let processesNames = XMLParser.getAllSavedProcesses();
let processName = null;

while(processName = processesNames.iterateNext()){
    console.log(processName);
    let processNameStr = processName.value;
    let liItem = document.createElement("li");
    let paramText = document.createTextNode(processName.value);
    let aItem = document.createElement("a");
    aItem.setAttribute("href", "#");
    aItem.setAttribute("id", processName.value);
    aItem.className = 'savedProcessesList'
    aItem.addEventListener("click", function (){
        showData(processNameStr);
    })



    aItem.appendChild(paramText);
    liItem.appendChild(aItem);
    processesSubMenu.appendChild(liItem);
}

function showData(processName){

    //clear div
    $('select').remove();
    $('label').hide();
    $('button').remove();
    $('fieldset').hide();
    $('#tablePosition').show();
    $('#tablePositionCreateProcess').hide();

    let btnHideSidebarSP = document.createElement('button');
    btnHideSidebarSP.innerHTML = '☰';
    btnHideSidebarSP.className = 'buttons';
    btnHideSidebarSP.id = 'sidebarCollapseBtn';

    $(document).ready(function () {
        $('#sidebarCollapseBtn').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    });


    let header = document.createElement('button');
    header.className = "buttonStartProcess";
    header.innerHTML = " START " + processName + " process";

    let divGrid = document.getElementById('tablePosition');
    divGrid.innerHTML = "";

    let dataTable = document.createElement('table');
    dataTable.className = "dataTable";
    divGrid.appendChild(btnHideSidebarSP);

    let startRow = dataTable.insertRow(-1);
    let startCell = startRow.insertCell(-1);
    startCell.innerHTML = "▼ START ▼"
    startCell.className = "noDataRow";

    divGrid.appendChild(header);
    divGrid.appendChild(dataTable);

    let processModInstances = XMLParser.getProcessModuleInstancesByProcessName(processName);
    let pmInstance = null;

    while(pmInstance = processModInstances.iterateNext()){

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
                    let rowCellWrapper = document.createElement('div');
                    rowCellWrapper.className = "mainRowCellWrapper";


                    for(let k = 0; k < pmInstance.children[i].children.length; k++){
                        let subTable = document.createElement('table');
                        subTable.className = "subTable";
                        let subTableRow = subTable.insertRow(-1);
                        let subCell = subTableRow.insertCell(-1);
                        subCell.innerHTML = pmInstance.children[i].children[k].getAttribute('type');
                        subCell.className = "subCell";


                        for(let j = 0; j < pmInstance.children[i].children[k].children.length; j++){
                            if(pmInstance.children[i].children[k].children[j].nodeName === 'param'){
                                cell.appendChild(mainRowCellWrapper);
                                mainTableRow.appendChild(cell);
                                createParamTable(pmInstance.children[i].children[k].children[j], subTable)
                                console.log(pmInstance.children[i].children[k].children[j])
                            }
                        }
                        if(k < pmInstance.children[i].children.length-1){
                            let binSubTabRow = subTable.insertRow(-1);
                            let bindingCell = binSubTabRow.insertCell(-1);
                            bindingCell.innerHTML = "🢃"
                            bindingCell.className = "subBindingRow";
                        }
                        rowCellWrapper.appendChild(subTable);
                    }
                    mainRowCellWrapper.appendChild(rowCellWrapper);
                }
                else if(pmInstance.children[i].nodeName === 'module_instance'){

                    let subTable = document.createElement('table');
                    subTable.className = "subTable";

                    let subTableRow = subTable.insertRow(-1);

                    let subCell = subTableRow.insertCell(-1);
                    subCell.className = "subCell";
                    subCell.innerHTML = pmInstance.children[i].getAttribute("type");

                    cell.appendChild(mainRowCellWrapper);
                    mainTableRow.appendChild(cell);

                    for (let j = 0; j < pmInstance.children[i].children.length; j++) {
                        if (pmInstance.children[i].children[j].nodeName === 'param') {
                            createParamTable(pmInstance.children[i].children[j], subTable);
                        }
                }
                mainRowCellWrapper.appendChild(subTable);
                }

            }
        }
        else if(pmInstance.nodeName === 'module_instance'){

            let mainRowCellWrapper = document.createElement('div');
            mainRowCellWrapper.className = "mainRowCellWrapper";

            let subTable = document.createElement('table');
            subTable.className = "subTable";

            let subTableRow = subTable.insertRow(-1);

            let subCell = subTableRow.insertCell(-1);
            subCell.innerHTML = pmInstance.getAttribute('type');
            subCell.className = "subCell";

            cell.appendChild(mainRowCellWrapper);
            mainTableRow.appendChild(cell);

            for(let j = 0; j < pmInstance.children.length; j++){
                if(pmInstance.children[j].nodeName === 'param'){
                    createParamTable(pmInstance.children[j], subTable)
                }
                mainRowCellWrapper.appendChild(subTable);
            }
        }

        let bindingRows = dataTable.insertRow(-1);
        let bindingCell = bindingRows.insertCell(-1);
        bindingCell.innerHTML = "🢃"
        bindingCell.className = "noDataRow";
    }

    let endRow = dataTable.insertRow(-1);
    let endCell = endRow.insertCell(-1);
    endCell.innerHTML = " END ";
    endCell.className = "noDataRow";
}

/**
 * creates parameter table to be aded to a main table cell
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