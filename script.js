const FORM_URL = "https://forms.gle/REPLACE_WITH_YOUR_APPLICATION_FORM";
const CONTACT_URL = "https://forms.gle/REPLACE_WITH_YOUR_CONTACT_FORM";

const slides = Array.from(document.querySelectorAll(".hero-slide"));
const dots = Array.from(document.querySelectorAll(".hero-dots button"));
const prevButton = document.querySelector(".hero-prev");
const nextButton = document.querySelector(".hero-next");
const heroStage = document.querySelector(".hero-stage");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");
const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
const formLinks = Array.from(document.querySelectorAll("[data-form-link]"));
const contactLinks = Array.from(document.querySelectorAll("[data-contact-link]"));
const toast = document.querySelector(".toast");

let activeSlide = 0;
let slideTimer = null;
let toastTimer = null;

function showToast(message) {
  if (!toast) return;

  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function isPlaceholderUrl(url) {
  return !url || url.includes("REPLACE_WITH");
}

function openManagedUrl(url, label) {
  if (isPlaceholderUrl(url)) {
    showToast(`${label} 링크가 아직 연결되지 않았습니다. README에서 주소를 교체해주세요.`);
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

function showSlide(nextIndex) {
  if (!slides.length) return;

  activeSlide = (nextIndex + slides.length) % slides.length;

  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === activeSlide);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeSlide);
    dot.setAttribute("aria-current", index === activeSlide ? "true" : "false");
  });
}

function startSlider() {
  if (slides.length <= 1) return;

  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => {
    showSlide(activeSlide + 1);
  }, 6200);
}

function stopSlider() {
  window.clearInterval(slideTimer);
}

function closeMenu() {
  if (!menuButton || !nav) return;

  menuButton.classList.remove("open");
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "메뉴 열기");
}

function toggleMenu() {
  if (!menuButton || !nav) return;

  const isOpen = menuButton.classList.toggle("open");
  nav.classList.toggle("open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
}

if (prevButton) {
  prevButton.addEventListener("click", () => {
    showSlide(activeSlide - 1);
    startSlider();
  });
}

if (nextButton) {
  nextButton.addEventListener("click", () => {
    showSlide(activeSlide + 1);
    startSlider();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startSlider();
  });
});

if (heroStage) {
  heroStage.addEventListener("mouseenter", stopSlider);
  heroStage.addEventListener("mouseleave", startSlider);
  heroStage.addEventListener("focusin", stopSlider);
  heroStage.addEventListener("focusout", startSlider);
}

if (menuButton) {
  menuButton.addEventListener("click", toggleMenu);
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

formLinks.forEach((button) => {
  button.addEventListener("click", () => {
    openManagedUrl(FORM_URL, "신청");
  });
});

contactLinks.forEach((button) => {
  button.addEventListener("click", () => {
    openManagedUrl(CONTACT_URL, "문의");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  if (!nav || !menuButton) return;
  if (!nav.classList.contains("open")) return;

  const clickedInsideNav = nav.contains(event.target);
  const clickedMenuButton = menuButton.contains(event.target);

  if (!clickedInsideNav && !clickedMenuButton) {
    closeMenu();
  }
});

const sections = Array.from(document.querySelectorAll("main section[id]"));

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0, 0.25, 0.6],
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

showSlide(0);
startSlider();
