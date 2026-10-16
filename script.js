// ===== CONFIG — replace with real business details =====
const CONFIG = {
  phone: "7995328760", // country code + number, no + or spaces — used for WhatsApp contact links
  callNumber: "+91 7995328760",
  instagramHandle: "nrfoods_catering", // no @ symbol
  // Paste the Web app URL from google-apps-script.gs deployment here.
  // The enquiry form ONLY sends data here (Google Sheets) — no WhatsApp popup.
  googleScriptUrl: "https://script.google.com/macros/s/AKfycbxjthFy6uwQxi039Fz2ybnQIGJExTzV893EmwU121kqYuT7xPM_taDSsDcDsmfQhXQX/exec",
};

// ===== Loading screen =====
const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("loader-hidden"), 700);
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ===== Menu tabs =====
const tabBtns = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".menu-panel");
tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.querySelector(`.menu-panel[data-panel="${btn.dataset.tab}"]`).classList.add("active");
  });
});

// ===== Gallery placeholder tiles (swap with real <img> tags later) =====
const galleryData = [
  { label: "Wedding buffet setup", from: "#8C2F39", to: "#C97C1F" },
  { label: "Live biryani counter", from: "#52713F", to: "#E29A3A" },
  { label: "Dine-in outlet interior", from: "#C97C1F", to: "#8C2F39" },
  { label: "Corporate lunch boxes", from: "#2B1B12", to: "#6E2029" },
  { label: "Dessert station", from: "#E29A3A", to: "#52713F" },
  { label: "Andhra thali", from: "#6E2029", to: "#E29A3A" },
  { label: "Event decor", from: "#52713F", to: "#8C2F39" },
  { label: "Kitchen prep", from: "#C97C1F", to: "#2B1B12" },
];
const galleryGrid = document.getElementById("galleryGrid");
galleryData.forEach(item => {
  const tile = document.createElement("div");
  tile.className = "gallery-tile";
  tile.style.background = `linear-gradient(135deg, ${item.from}, ${item.to})`;
  tile.innerHTML = `<span>${item.label}</span>`;
  galleryGrid.appendChild(tile);
});

// ===== WhatsApp / Instagram / Call links =====
// wa.me and instagram.com links open the native app automatically on
// mobile (iOS/Android intercept them as universal links) — no extra
// deep-link code needed, this is the standard, reliable approach.
const waMessage = encodeURIComponent("Hi NR Foods, I'd like a catering quote.");
const waUrl = `https://wa.me/${CONFIG.phone}?text=${waMessage}`;
const igUrl = `https://www.instagram.com/${CONFIG.instagramHandle}/`;

["waBtn", "waFloat", "footerWaBtn", "navWaBtn"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = waUrl;
});
["igFloat", "footerIgBtn", "navIgBtn"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = igUrl;
});
document.getElementById("callBtn").href = `tel:+${CONFIG.phone}`;

// ===== Enquiry form — saves ONLY to Google Sheets (no WhatsApp popup) =====
const form = document.getElementById("enquiryForm");
const status = document.getElementById("formStatus");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const submitBtn = form.querySelector("button[type=submit]");
  const data = Object.fromEntries(new FormData(form).entries());

  if (!CONFIG.googleScriptUrl) {
    status.textContent = "Setup incomplete — add your Google Apps Script URL to script.js (CONFIG.googleScriptUrl) to enable this form.";
    return;
  }

  submitBtn.disabled = true;
  status.textContent = "Sending your enquiry...";
  try {
    await fetch(CONFIG.googleScriptUrl, {
      method: "POST",
      mode: "no-cors", // Apps Script web apps don't return CORS headers
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(data),
    });
    status.textContent = "Enquiry sent! We'll get back to you within 24 hours.";
    form.reset();
  } catch (err) {
    status.textContent = "Something went wrong sending your enquiry. Please try again or contact us on WhatsApp.";
  } finally {
    submitBtn.disabled = false;
  }
});

// ===== Sticky nav shadow on scroll =====
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.style.boxShadow = window.scrollY > 8 ? "0 2px 12px rgba(43,27,18,0.06)" : "none";
});
