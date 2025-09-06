// ===== Reveal sections on scroll =====
const elements = document.querySelectorAll(".card, .about p, .collection h2, .contact p, .feedback-form");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("appear"); });
}, { threshold: 0.2 });
elements.forEach(el => observer.observe(el));

// ===== Typing Effect (multi-lang support) =====
function startTypingEffect() {
  const typingEl = document.getElementById("typing");
  if (!typingEl) return;
  const text = typingEl.getAttribute(`data-${document.documentElement.lang}`) || "Elegance in Every Stitch";
  typingEl.textContent = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      typingEl.textContent += text.charAt(i);
      i++;
      setTimeout(typing, 120);
    }
  }
  typing();
}
startTypingEffect();

// ===== Feedback Stars + Animation =====
const stars = document.querySelectorAll(".stars i");
let selectedRating = 0;

function createSparkle(x, y) {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 600);
}

stars.forEach((star, index) => {
  star.addEventListener("click", (e) => {
    selectedRating = index + 1;
    stars.forEach((s, i) => {
      if (i <= index) {
        s.classList.remove("fa-regular");
        s.classList.add("fa-solid", "active");
        s.style.color = "#FFD700";
        s.style.transform = "scale(1.3)";
        setTimeout(() => { s.style.transform = "scale(1)"; }, 200);
      } else {
        s.classList.remove("fa-solid", "active");
        s.classList.add("fa-regular");
        s.style.color = "";
        s.style.transform = "scale(1)";
      }
    });
    createSparkle(e.clientX, e.clientY);
  });
});

// ===== Scroll to Top =====
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) scrollBtn.classList.add("show");
  else scrollBtn.classList.remove("show");
});
if (scrollBtn) scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== Dark / Light Mode =====
const modeToggle = document.getElementById("modeToggle");
if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const icon = modeToggle.querySelector("i");
    if (document.body.classList.contains("dark")) icon.classList.replace("fa-moon", "fa-sun");
    else icon.classList.replace("fa-sun", "fa-moon");
    modeToggle.classList.add("switching");
    setTimeout(() => modeToggle.classList.remove("switching"), 500);
    updateNavColors();
  });
}

// ===== Scroll Progress Bar =====
const progressBar = document.getElementById("progressBar");
if (progressBar) {
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + "%";
  });
}

// ===== Explore Button =====
const exploreBtn = document.getElementById("exploreBtn");
if (exploreBtn) {
  exploreBtn.addEventListener("click", () => {
    const coll = document.getElementById("collection") || document.querySelector(".collection-section");
    if (coll) coll.scrollIntoView({ behavior: "smooth" });
  });
}

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ===== Language Toggle =====
const langToggle = document.getElementById("langToggle");
let currentLang = "en";
if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
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

    startTypingEffect();
  });
}

// ===== Swiper Init (defensive) =====
try {
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
      0: { slidesPerView: 1 },
      600: { slidesPerView: 2 },
      900: { slidesPerView: 3 }
    }
  });
} catch (e) {
  // Swiper not loaded — skip
}

// ===== Loader =====
const loaderOverlay = document.getElementById("loaderOverlay");
function showLoader() { if (loaderOverlay) loaderOverlay.classList.add("show"); }
function hideLoader() { if (loaderOverlay) loaderOverlay.classList.remove("show"); }

// ===== Newsletter Thank You Message =====
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showLoader();

    setTimeout(() => {
      hideLoader();
      newsletterForm.style.display = "none";
      const thankYou = document.createElement("div");
      thankYou.className = "thank-you-box pulse";

      if (document.documentElement.lang === "ar") {
        thankYou.innerHTML = `<h3>✅ شكراً لاشتراكك!</h3><p>ستصلك أحدث الأخبار والعروض أولاً بأول.</p>`;
      } else {
        thankYou.innerHTML = `<h3>✅ Thank you for subscribing!</h3><p>You’ll now stay updated with our latest news & offers.</p>`;
      }

      newsletterForm.parentNode.appendChild(thankYou);

      setTimeout(() => {
        thankYou.style.animation = "fadeOut 0.5s forwards";
        setTimeout(() => {
          thankYou.remove();
          newsletterForm.style.display = "flex";
          newsletterForm.reset();
        }, 500);
      }, 5000);
    }, 1500);
  });
}

// ==== EmailJS Send Feedback + Popup =====
const feedbackForm = document.getElementById("feedbackForm");
const feedbackPopup = document.getElementById("thankYouPopup");
const popupMessage = feedbackPopup ? feedbackPopup.querySelector("p") : null;
const closePopupBtn = document.getElementById("closePopupBtn");

window.addEventListener("load", () => {
  if (feedbackPopup) feedbackPopup.style.display = "none";
});

if (feedbackForm) {
  feedbackForm.addEventListener("submit", function(e) {
    e.preventDefault();
    showLoader();

    emailjs.sendForm("service_bx794b7", "template_sfno6wa", feedbackForm, "angnRXHRdzuZeo33H")
      .then(() => {
        hideLoader();
        if (popupMessage) {
          if (document.documentElement.lang === "ar") {
            popupMessage.textContent = "🎉 تم الإرسال بنجاح! رأيك يفرق معانا ❤️";
            closePopupBtn.textContent = "تم";
          } else {
            popupMessage.textContent = "🎉 Sent successfully! Your feedback means a lot ❤️";
            closePopupBtn.textContent = "Thanks";
          }
        }
        feedbackForm.reset();
        selectedRating = 0;
        stars.forEach(s => {
          s.classList.remove("fa-solid", "active");
          s.classList.add("fa-regular");
          s.style.color = "";
          s.style.transform = "scale(1)";
        });
        feedbackPopup.classList.remove("fade-out");
        feedbackPopup.style.display = "flex";
        setTimeout(() => feedbackPopup.classList.add("show"), 10);
      })
      .catch(() => {
        hideLoader();
        if (popupMessage) {
          if (document.documentElement.lang === "ar") {
            popupMessage.textContent = "❌ حصل خطأ أثناء الإرسال. حاول مرة تانية.";
            closePopupBtn.textContent = "إغلاق";
          } else {
            popupMessage.textContent = "❌ An error occurred while sending. Please try again.";
            closePopupBtn.textContent = "Close";
          }
        }
        feedbackPopup.classList.remove("fade-out");
        feedbackPopup.style.display = "flex";
        setTimeout(() => feedbackPopup.classList.add("show"), 10);
      });
  });
}

// ===== Close Popup Button =====
if (closePopupBtn && feedbackPopup) {
  closePopupBtn.addEventListener("click", () => {
    feedbackPopup.classList.remove("show");
    feedbackPopup.style.display = "none";
  });
}


// ===== ScrollSpy Nav Highlight + Moving Indicator =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
const nav = document.querySelector("nav");
const indicator = document.createElement("span");
indicator.classList.add("nav-indicator");
if (nav) nav.appendChild(indicator);

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

// ======= Collection Slider (صور تتحرك بين A-B-C + Zoom للوسط + Smooth Transition) =======
(function () {
  const slotA = document.getElementById("slotA");
  const slotB = document.getElementById("slotB");
  const slotC = document.getElementById("slotC");
  const bars = document.querySelectorAll(".collection-row .bar span");

  const images = [
    "assets/dress1.jpg",
    "assets/dress2.jpg",
    "assets/dress3.jpg"
  ];

  let index = 0;
  const delay = 3000;

  function renderSlides() {
    slotA.innerHTML = `<img src="${images[index % images.length]}" alt="Dress" class="fade">`;
    slotB.innerHTML = `<img src="${images[(index + 1) % images.length]}" alt="Dress" class="fade middle">`;
    slotC.innerHTML = `<img src="${images[(index + 2) % images.length]}" alt="Dress" class="fade">`;

    requestAnimationFrame(() => {
      document.querySelectorAll(".fade").forEach(img => {
        img.style.opacity = "1";
        img.style.transform = "scale(1)";
        img.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      });
      const midImg = slotB.querySelector("img");
      midImg.style.transform = "scale(1.15)";
    });

    bars.forEach(bar => {
      bar.style.transition = "none";
      bar.style.width = "0%";
    });

    const bar = bars[index % bars.length];
    bar.style.transition = "width 3s linear";
    requestAnimationFrame(() => {
      bar.style.width = "100%";
    });
  }

  function loop() {
    index = (index + 1) % images.length;
    renderSlides();
  }

  renderSlides();
  setInterval(loop, delay);
})();
