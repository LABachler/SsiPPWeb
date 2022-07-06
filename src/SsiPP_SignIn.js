let attempt = 3;
function validate(){
    let username = document.getElementById("floatingInput").value;
    let password = document.getElementById("floatingPassword").value;
    if ( username === "diplomarbeit" && password === "NLB2022"){
        document.location.href = "SsiPP.html"
        alert ("Login successfully");
    }
    else{
        attempt --;// Decrementing by one.
        alert("You have left "+attempt+" attempts;");
// Disabling fields after 3 attempts.
        if( attempt === 0){
            document.getElementById("floatingInput").disabled = true;
            document.getElementById("floatingPassword").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
}