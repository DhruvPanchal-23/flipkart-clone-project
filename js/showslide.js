let slideIndex = 1;
showSlides(slideIndex);

/* ---------- MANUAL CONTROLS ---------- */
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

/* ---------- SHOW SLIDE ---------- */
function showSlides(n) 
{
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}

/* ---------- AUTO SLIDE ---------- */
setInterval(() => {
  plusSlides(1);
}, 2000); // Change slide every 2 seconds