var kontakt = document.getElementById("kontakt");

document.getElementById("btnkontakt").onclick = function () {
  kontakt.style.display = "flex";
  document.getElementById("txtIme").focus();
};

document.getElementById("btnOdustani").onclick = function () {
  Ugasi();
};

window.onclick = function (event) {
  if (event.target.id == "kontakt") {
    Ugasi();
  }
};

function Ugasi() {
  document.getElementById("forma").reset();
  kontakt.style.display = "none";
}
