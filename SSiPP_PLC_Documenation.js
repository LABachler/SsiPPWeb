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
    let i=0,j=0;
    let plcList=new Array();
    let tr,td;
    let det,sum;



    for(let plc of moduleInstances){
        plcList[i]=plc.getAttribute('plc');
        i++
    }

    plcList= new Set(plcList);

    for(let ip of plcList) {
        tr=document.createElement("tr");
        det=document.createElement('details');
        det.style.cssText='padding:10px';
        sum=document.createElement('summary');
        sum.style.cssText = 'color: #051750; text-align:left; font-family: \'Poppins\', sans-serif; font-size:14pt; padding:10px 0px 10px 0px'

        tblPlcData.appendChild(tr);

        tr.appendChild(det);
        det.appendChild(sum);

        sum.innerHTML="IP: "+ip.toString();

        for(let moduleName of moduleInstances){
             if(moduleName.getAttribute('plc')===ip){
                 tr=document.createElement("tr");
                 det.appendChild(tr);
                 td = document.createElement("td");
                 td.style.cssText="text-align:left; padding-left:18px";
                 td.innerHTML=moduleName.getAttribute('name');

                 tr.appendChild(td);

             }
        }
        j++
    }
}

loadDoc();



