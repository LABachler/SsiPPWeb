
import * as XMLParser from './XMLParser.js';
import * as SSiPP_SavedProcesses from './SSiPP_SavedOrRunningProcesses.js';
import {createElement} from "./SSiPP_SavedOrRunningProcesses.js";

let historicalProcesses = document.getElementById("historicalProcesses");
let tablePosition = document.getElementById("wrapper");

historicalProcesses.addEventListener('click', function(){

    $('#tablePosition').hide();
    $('#tablePositionCreateProcess').hide();
    $('#createModuleFieldset').hide();
    $('#createProcessField').hide();
    $('#moduleInstanceFrom').hide();
    $('.table').remove();
    $('.moduleInstanceDiv').hide();

    let parseNames = XMLParser.getAllHistoricalProcesses();
    let parseIDs = XMLParser.getAllHistoricalProcessesIDs();
    let nameIterator = null;
    let iDIterator = null;
    let table = document.createElement("table");
    table.id = "history";
    table.className = 'table table-hover table-dark';
    tablePosition.appendChild(table);

    let tableHeaders = [ "Process_ID", "Process_Name", "Time Finished"];
    let tableHeader = document.createElement("thead");
    let tableHeaderRow = document.createElement("tr");
    table.appendChild(tableHeader);
    tableHeader.appendChild(tableHeaderRow);
    let ids = [];

    for(let i = 0; i < tableHeaders.length; i++){
        let tableHeaderCell = document.createElement("th");
        tableHeaderCell.innerHTML = tableHeaders[i];
        tableHeaderRow.appendChild(tableHeaderCell);

    }

    let trNr = 0;
    let tableBody = document.createElement("tbody");
    table.appendChild(tableBody);

    while(iDIterator = parseIDs.iterateNext()){
        let tableRow = document.createElement("tr");
        tableBody.appendChild(tableRow);
        tableRow.id = trNr.toString() + "row";
        let tableCell = tableRow.insertCell();
        tableCell.innerText = iDIterator.value;
        ids.push(iDIterator.value);
        trNr++;
    }
    trNr = 0;
    while(nameIterator = parseNames.iterateNext()){
        let tableCell = document.getElementById(trNr.toString() + "row").insertCell();
        tableCell.innerText = nameIterator.value;
        console.log(nameIterator.value);
        trNr++;
    }
    for(let i = 0; i < ids.length; i++){
        let times = [];
        let parseTimeFinished = XMLParser.getAllHistoricalProcessesFinishedTimesByProcessId(ids[i]);
        let iterator = null;
        while(iterator = parseTimeFinished.iterateNext())
            times.push(iterator.textContent)
        let tableCell = document.getElementById(i.toString() + "row").insertCell();
        tableCell.innerText= times[times.length - 1];
    }
    let toggle = 1;
    $("body").on("click", "#history tr", function () {
        $("#history").hide();
        $("#tablePosition").hide();
        $('#divHistoricalProcesses').remove();
        let divHistoricalProcess = document.createElement("div");
        divHistoricalProcess.id = "divHistoricalProcesses";
        tablePosition.appendChild(divHistoricalProcess);
        console.log($(this).index());
        let dataTable = createElement('table', 'historicalDataTable');
        let processModInstances = XMLParser.getHistoricalProcessModuleInstancesByProcessId($(this).children()[0].innerText);
        let headerProcessName = createElement('h3', 'h2');
        headerProcessName.innerHTML = $(this).children()[1].innerText;
        divHistoricalProcess.append(headerProcessName, dataTable);
        SSiPP_SavedProcesses.appendData(processModInstances,true, true);
    });
    $("body").on("click", "#divHistoricalProcesses", function () {
        this.remove();
        $('.h3').remove();
        $("#history").show();
    });

})