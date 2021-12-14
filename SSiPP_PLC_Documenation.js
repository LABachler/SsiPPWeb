let xmlFileModuleInstances = 'SSiPP_module_instances.xml';

function loadDoc() {
    let xhttp = new XMLHttpRequest();

    xhttp.open("GET", xmlFileModuleInstances, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            xmlFunctionPlc(this.response);
        }
    };
}


function xmlFunctionPlc(xml) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "text/xml");
    let moduleInstances = xmlDoc.getElementsByTagName("module_instance",); //array of all moduleInstances
    let showIntegratedPlc = document.getElementById("integratedPlc");

    showIntegratedPlc.addEventListener("click", function (){
        $('select').remove();
        $('label').remove();
        let tblPlcHeader=document.getElementById("processName");
        tblPlcHeader.innerHTML="Integrated PLCs";
        tblPlcHeader.style.cssText ='background-color: white; border-radius:10px'
        fillPlcTable(moduleInstances);
    })


}
function fillPlcTable(moduleInstances){
    let tblPlcData=document.getElementById("tblHistoryData");
    tblPlcData.innerHTML="";
    let i=0;
    let plcList=new Array();
    let tr,th,td;

    for(let plc of moduleInstances){
        plcList[i]=plc.getAttribute('plc');
        i++
    }

    plcList= new Set(plcList);

    for(let ip of plcList) {
        tr=document.createElement("tr");
        th = document.createElement("th");
        tblPlcData.appendChild(tr);
        th.innerHTML=ip.toString();
        tr.appendChild(th);
        for(let moduleName of moduleInstances){
             if(moduleName.getAttribute('plc')===ip){
                 tr=document.createElement("tr");
                 td = document.createElement("td");
                 td.innerHTML=moduleName.getAttribute('name');
                 tblPlcData.appendChild(tr);
                 tr.appendChild(td);
             }
        }
    }
}

loadDoc();



