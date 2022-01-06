import * as XMLParser from './XMLParser.js';

/*
* gets all process names and adds them to a side sub-menu
* */


let processesSubMenu = document.getElementById("pageSubmenu");  //list of all saved processes
let processesNames = XMLParser.getAllSavedProcesses();
let processName = null;
while(processName = processesNames.iterateNext()){
    let pName = processName.value;
    let listItem = document.createElement("li");
    let aItem = document.createElement("a");
    aItem.setAttribute("href", "#");
    aItem.setAttribute("id", processName.value);

    aItem.addEventListener("click", function (){
        showData(pName);
    })

    let paramText = document.createTextNode(processName.value);
    aItem.appendChild(paramText);
    listItem.appendChild(aItem);
    processesSubMenu.appendChild(listItem);
}

function showData(processName){
    $('select').remove();
    $('label').remove();
    $('button').remove();
    $('fieldset').hide();
    let header = document.createElement('h2');
    header.style.cssText ='background-color: #560000; color:white; width:700px; height:40px;border-radius:10px';
    header.innerHTML = processName;

    let divGrid = document.getElementById('tablePosition');
    divGrid.style.cssText = "display: block; "
    divGrid.innerHTML = "";
    divGrid.appendChild(header);


    let dataTable = document.createElement('table');
    let startRow = dataTable.insertRow(-1);
    startRow.innerHTML = "▼ START ▼"
    startRow.style.cssText = "border: 2px solid white; background-color:#c7bdbd"
    dataTable.style.cssText = "display: block; text-align: center;border: 1px solid white"
    divGrid.appendChild(dataTable);
    let processModInstances = XMLParser.getAllProcessModuleInstancesByProcessName(processName);
    let pmInstance = null;
    while(pmInstance = processModInstances.iterateNext()){
        let mainTableRow = dataTable.insertRow(-1);
        let cell = mainTableRow.insertCell(-1);
        cell.style.cssText= "border: 1px solid white"
        mainTableRow.style.cssText = "border: 1px solid white"
        if(pmInstance.nodeName === 'parallel'){
            for(let i = 0; i < pmInstance.children.length; i++){
                //let mainRowCell = mainTableRow.insertCell(-1);
                let mainRowCellWrapper = document.createElement('div');
                mainRowCellWrapper.style.cssText = "border: 1px solid white; vertical-align: top; width: "+ 100 /  pmInstance.children.length +"%; float:left"
                cell.appendChild(mainRowCellWrapper);
                mainTableRow.appendChild(cell);
                let subTable = document.createElement('table');
                subTable.style.cssText = "margin: 0 auto; width: 250px"
                let subTableRow = subTable.insertRow(-1);
                let subCell = subTableRow.insertCell(-1);
                subCell.style.cssText = "border: 2px solid white; border-radius: 10px;background-color: #560000; color: white "
                subCell.innerHTML = pmInstance.children[i].getAttribute("type");

                for(let j = 0; j < pmInstance.children[i].children.length; j++){
                    if(pmInstance.children[i].children[j].nodeName === 'param'){
                        let paramTable = document.createElement('table');
                        let paramTableRow = subTable.insertRow(-1);
                        let paramTableCell = paramTableRow.insertCell(-1);
                        let paramRow = paramTable.insertRow(-1);
                        let paramCell = paramRow.insertCell(-1);
                        paramCell.innerHTML = pmInstance.children[i].children[j].getAttribute('name') + " = ";
                        paramCell.style.borderRight = "1px solid white"
                        paramCell = paramRow.insertCell(-1);
                        paramCell.innerHTML = pmInstance.children[i].children[j].innerHTML;
                        paramCell.style.borderRight = "1px solid white"
                        paramCell.style.borderLeft = "1px solid white"
                        paramCell = paramRow.insertCell(-1);
                        paramCell.innerHTML = pmInstance.children[i].children[j].getAttribute('engineering_unit');
                        paramCell.style.borderLeft = "1px solid white"
                        paramTableCell.appendChild(paramTable)
                    }
                }
                mainRowCellWrapper.appendChild(subTable);
            }
        }
        else if(pmInstance.nodeName === 'module_instance'){
            console.log(pmInstance)
            let mainRowCellWrapper = document.createElement('div');
            mainRowCellWrapper.style.cssText = "border: 1px solid white; vertical-align: top; width: 100%; float:left"
            cell.appendChild(mainRowCellWrapper);
            mainTableRow.appendChild(cell);
            let subTable = document.createElement('table');
            subTable.style.cssText = "margin: 0 auto; width: 250px"
            let subTableRow = subTable.insertRow(-1);
            let subCell = subTableRow.insertCell(-1);
            subCell.innerHTML = pmInstance.getAttribute('type');
            subCell.style.cssText = "border: 2px solid white; border-radius: 10px; background-color: #560000; color: white"

            for(let j = 0; j < pmInstance.children.length; j++){
                if(pmInstance.children[j].nodeName === 'param'){
                    let paramTable = document.createElement('table');
                    let paramTableRow = subTable.insertRow(-1);
                    let paramTableCell = paramTableRow.insertCell(-1);
                    let paramRow = paramTable.insertRow(-1);
                    let paramCell = paramRow.insertCell(-1);
                    paramCell.innerHTML = pmInstance.children[j].getAttribute('name');
                    paramCell.style.borderRight = "1px solid white"
                    paramCell = paramRow.insertCell(-1);
                    paramCell.innerHTML = pmInstance.children[j].innerHTML;
                    paramCell.style.borderRight = "1px solid white"
                    paramCell.style.borderLeft = "1px solid white"
                    paramCell = paramRow.insertCell(-1);
                    paramCell.innerHTML = pmInstance.children[j].getAttribute('engineering_unit');
                    paramCell.style.borderLeft = "1px solid white"
                    paramTableCell.appendChild(paramTable)
                }
                mainRowCellWrapper.appendChild(subTable);

            }
        }let startRow = dataTable.insertRow(-1);
        startRow.innerHTML = "🢃"
        startRow.style.cssText = "border: 2px solid white;background-color:#c9c6c5"
    }
    let endRow = dataTable.insertRow(-1);
    endRow.innerHTML = " END "
    endRow.style.cssText = "border: 2px solid white; background-color:#c7bdbd"
}