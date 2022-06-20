document
  .querySelector(".navbar-page")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const id = event.target.dataset.id;

    if (!id) return;

    const position = document
      .querySelector(`.section-${id}`)
      .getBoundingClientRect().top;

    const navHeight = document
      .querySelector("nav")
      .getBoundingClientRect().height;

    const offset = position + window.pageYOffset - navHeight;

    window.scrollTo({ top: offset, behavior: "smooth" });

    resetAnimation();
  });

function resetAnimation() {
  const element = document.getElementsByClassName("lijepiTekst");
  [...element].forEach((el) => {
    el.classList.remove("lijepiTekst");
    void el.offsetWidth;
    el.classList.add("lijepiTekst");
  });
}
