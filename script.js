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

// ===== ✅ Swiper Init مع breakpoints =====
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
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    900: {
      slidesPerView: 3,
    }
  }
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

// ===== ScrollSpy Nav Highlight + Moving Indicator =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

// create indicator line
const nav = document.querySelector("nav");
const indicator = document.createElement("span");
indicator.classList.add("nav-indicator");
nav.appendChild(indicator);

function moveIndicator(element, show = true) {
  if (!show || !element) {
    indicator.style.width = "0";
    indicator.style.opacity = "0";
    return;
  }
  const rect = element.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  indicator.style.width = rect.width + "px";
  indicator.style.left = (rect.left - navRect.left) + "px";
  indicator.style.opacity = "1";
}

function updateNavColors() {
  navLinks.forEach(link => {
    if (!link.classList.contains("active")) {
      link.style.color = document.body.classList.contains("dark") ? "white" : "black";
      link.style.background = "none";
      link.style.webkitBackgroundClip = "unset";
      link.style.webkitTextFillColor = "unset";
      link.style.animation = "";
    } else {
      link.style.background = "linear-gradient(270deg, hotpink, pink, beige, hotpink)";
      link.style.backgroundSize = "300% 300%";
      link.style.webkitBackgroundClip = "text";
      link.style.webkitTextFillColor = "transparent";
      link.style.animation = "moveColors 6s linear infinite";
    }
  });
}

function updateScrollSpy() {
  let current = "";
  let insideSection = false;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
      insideSection = true;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
      moveIndicator(link, true);
    }
  });

  if (!insideSection) moveIndicator(null, false);

  updateNavColors();
}

window.addEventListener("scroll", updateScrollSpy);
window.addEventListener("load", updateScrollSpy);
