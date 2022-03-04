function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.innerHTML === "Light Off") {
        x.innerHTML = "Light On";
    } else {
        x.innerHTML = "Light Off";
    }
}