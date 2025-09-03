// Reveal sections on scroll
const elements = document.querySelectorAll(".card, .about p, .collection h2, .contact p, .feedback-form");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("appear");
    }
  });
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
    });
  });
});

// Scroll to Top
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Dark / Light Mode
const modeToggle = document.getElementById("modeToggle");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const icon = modeToggle.querySelector("i");
  if (document.body.classList.contains("dark")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }

  modeToggle.classList.add("switching");
  setTimeout(() => {
    modeToggle.classList.remove("switching");
  }, 500);
});

// Scroll Progress Bar
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let progress = (scrollTop / scrollHeight) * 100;
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

  const icon = langToggle.querySelector("i");
  icon.classList.add("switching");

  document.documentElement.lang = currentLang;
  document.body.dir = currentLang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
  document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(el => {
    el.placeholder = el.getAttribute(`data-${currentLang}`);
  });

  setTimeout(() => {
    icon.classList.remove("switching");
  }, 500);
});
