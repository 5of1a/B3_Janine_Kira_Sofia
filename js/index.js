let currentSlide = 0;

const slides = document.querySelectorAll(".index-pic");
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

document.addEventListener("DOMContentLoaded", () => {
  showSlide(currentSlide);
  setInterval(nextSlide, 3000);
});

setTimeout(() => {
  document.getElementById("newsletter-popup").style.display = "flex";
}, 8000);

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("newsletter-popup").style.display = "none";
});

document.getElementById("email").addEventListener("input", () => {
  const email = document.getElementById("email").value;
  const subscribeButton = document.querySelector("#newsletter-form button");

  subscribeButton.disabled = email.trim() === "";
});

document.getElementById("newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;

  console.log(`Email submitted: ${email}`);

  document.getElementById("newsletter-form").style.display = "none";
  document.getElementById("thank-you-message").style.display = "block";
});
