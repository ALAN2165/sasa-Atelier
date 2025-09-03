// Reveal sections on scroll
const elements = document.querySelectorAll(".card, .about p, .collection h2, .contact p, .feedback-form");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("appear"); });
}, { threshold: 0.2 });
elements.forEach(el => observer.observe(el));

// Typing Effect
const text = "Elegance in Every Stitch";
let i = 0;
function typing() {
  if (i < text.length) {
    document.getElementById("typing").textContent += text.charAt(i);
    i++;
    setTimeout(typing, 120);
  }
}
typing();

// Feedback Stars
const stars = document.querySelectorAll(".stars span");
stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    stars.forEach((s, i) => {
      s.classList.toggle("active", i <= index);
      s.setAttribute("aria-checked", i <= index ? "true" : "false");
    });
  });
});

// Scroll to Top
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) scrollBtn.classList.add("show");
  else scrollBtn.classList.remove("show");
});
scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Dark / Light Mode
const modeToggle = document.getElementById("modeToggle");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const icon = modeToggle.querySelector("i");
  if (document.body.classList.contains("dark")) icon.classList.replace("fa-moon", "fa-sun");
  else icon.classList.replace("fa-sun", "fa-moon");
  modeToggle.classList.add("switching");
  setTimeout(() => modeToggle.classList.remove("switching"), 500);
});

// Scroll Progress Bar
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = progress + "%";
});

// Explore Button
document.getElementById("exploreBtn").addEventListener("click", () => {
  document.getElementById("collection").scrollIntoView({ behavior: "smooth" });
});

// Smooth Scroll for Nav Links
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});

// Language Toggle
const langToggle = document.getElementById("langToggle");
let currentLang = "en";
langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  // icon animation
  langToggle.classList.add("switching");
  setTimeout(() => langToggle.classList.remove("switching"), 500);

  document.documentElement.lang = currentLang;
  document.body.dir = currentLang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
  document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(el => {
    el.placeholder = el.getAttribute(`data-${currentLang}`);
  });
});
// ===== الكود بتاعك زي ما هو فوق =====

// ✅ Swiper Init
const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: "slide",
  speed: 800,
});
// ===== EmailJS Send Feedback =====
const feedbackForm = document.getElementById("feedbackForm");
const formMessage = document.getElementById("formMessage");

feedbackForm.addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm(service_bx794b7, template_sfno6wa, feedbackForm)
    .then(() => {
      formMessage.textContent = "شكراً! تم إرسال ملاحظاتك بنجاح 🎉";
      formMessage.className = "success";
      feedbackForm.reset();
      stars.forEach(s => { s.classList.remove("active"); s.setAttribute("aria-checked","false"); });
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      formMessage.textContent = "حصل خطأ أثناء الإرسال. حاول مرة تانية.";
      formMessage.className = "error";
    });
});
