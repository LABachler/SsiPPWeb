document.getElementById('logOut').addEventListener("click", function() {

    document.location.href = "index.html"
})

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});
