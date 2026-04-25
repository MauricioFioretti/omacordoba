const slider = document.querySelector(".novedades_container");

document.getElementById("next").onclick = () => {
  slider.scrollBy({ left: 270, behavior: "smooth" });
};

document.getElementById("prev").onclick = () => {
  slider.scrollBy({ left: -270, behavior: "smooth" });
};