var navigation = document.getElementById("navigation");
var toggle = 0;
document.getElementById("toggle").onclick = function () {
  if (toggle === 0) {
    navigation.style.display = "flex";
    toggle = 1;
  } else {
    navigation.style.display = "none";
    toggle = 0;
  }
};
