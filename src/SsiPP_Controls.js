/**
 * event listener for log out menu item
 */
document.getElementById('logOut').addEventListener("click", function() {
    document.location.href = "index.html"
})

/**
 * sidebar button event listener
 */
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});
