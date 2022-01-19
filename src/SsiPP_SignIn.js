let attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
    let username = document.getElementById("floatingInput").value;
    let password = document.getElementById("floatingPassword").value;
    if ( username === "naida@gmail.com" && password === "12345"){
        document.location.href = "SsiPP.html"
        alert ("Login successfully");
    }
    else{
        attempt --;// Decrementing by one.
        alert("You have left "+attempt+" attempt;");
// Disabling fields after 3 attempts.
        if( attempt === 0){
            document.getElementById("floatingInput").disabled = true;
            document.getElementById("floatingPassword").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
}