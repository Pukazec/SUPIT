$(document).ready(() => {
  $(".rezultati").hide();
  $("#kolegij_input").autocomplete({
    source: "http://www.fulek.com/VUA/SUPIT/GetNastavniPlan",
    autoFocus: false,
    focus: (e, ui) => {
      e.preventDefault();
      $("#kolegij_input").val(ui.item.label);
    },
    select: (e, ui) => {
      e.preventDefault();
      const id = ui.item.value;
      const ime = ui.item.label;
      puniTablicu(id, ime);
    },
  });
});

function puniTablicu(id, ime) {
  try {
    var isti = document.getElementById(id).id;
  } catch {}

  if (isti == id) {
    $("#ponovno-upisano").text("Ponovno ste upisali kolegij: " + ime);
    $(".greska").dialog({
      autoOpen: true,
      modal: true,
      draggable: false,
      resizable: false,
    });
    $("#kolegij_input").val("").focus();
    return;
  }

  $.ajax({
    url: "http://www.fulek.com/VUA/supit/GetKolegij",
    data: { id },
    success: (data) => {
      const { id, kolegij, ects, sati, predavanja, vjezbe, tip } = data;
      const kolegij_skraceno = getSkraceniKolegij(kolegij);
      var tableRow = $(
        '<tr class="kolegij" id="' +
          id +
          '"><td class="naziv">' +
          kolegij +
          '</td><td class="skraceni-naziv">' +
          kolegij_skraceno +
          '</td><td class="sati">' +
          ects +
          '</td><td class="ects">' +
          sati +
          "</td><td>" +
          predavanja +
          "</td><td>" +
          vjezbe +
          "</td><td>" +
          tip +
          '</td><td><input type="button" class="obrisi" id="' +
          id +
          '" value="Obriši" onclick= "brisanje(this)" /></td></tr>'
      );
      zbroji(ects, sati);
      $("tbody").append(tableRow);
      $("#kolegij_input").val("").focus();
      if (ects_ukupno > 0) {
        $(".rezultati").show();
      }
    },
  });
}

var ects_ukupno = 0;
var sati_ukupno = 0;
function zbroji(ects, sati) {
  ects_ukupno += ects;
  sati_ukupno += sati;
  var ects_print =
    '<td class="ukupno" id="ectsUkupno">' + ects_ukupno + "</td>";
  $("#ectsUkupno").replaceWith(ects_print);

  var sati_print =
    '<td class="ukupno" id="satiUkupno">' + sati_ukupno + "</td>";
  $("#satiUkupno").replaceWith(sati_print);
}

function oduzmi(obrisi) {
  var minus_sati =
    obrisi.parentNode.parentNode.childNodes[3].childNodes[0].data;
  var minus_ects =
    obrisi.parentNode.parentNode.childNodes[2].childNodes[0].data;
  ects_ukupno -= minus_ects;
  sati_ukupno -= minus_sati;
  var ects_print =
    '<td class="ukupno" id="ectsUkupno">' + ects_ukupno + "</td>";
  $("#ectsUkupno").replaceWith(ects_print);

  var sati_print =
    '<td class="ukupno" id="satiUkupno">' + sati_ukupno + "</td>";
  $("#satiUkupno").replaceWith(sati_print);

  if (ects_ukupno == 0) {
    $(".rezultati").hide();
  }
}

function brisanje(obrisi) {
  $(obrisi).closest("tr").remove();
  oduzmi(obrisi);
}

function getSkraceniKolegij(kolegij) {
  return kolegij
    .split(" ")
    .map((el) => el.at(0).toUpperCase())
    .join("");
}
