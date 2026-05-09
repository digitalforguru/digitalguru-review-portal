import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://johavlaywmsjelumhirv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvaGF2bGF5d21zamVsdW1oaXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODMwNDQsImV4cCI6MjA5Mzc1OTA0NH0.rEtIZ-Pzk0paEb2wom6wG1jJ6Dej_u5FO_TIoNRygEg"
);

const openBtn = document.getElementById("openReviewBtn");
const overlay = document.getElementById("reviewOverlay");
const closeBtn = document.getElementById("closeReviewBtn");
const stepContent = document.getElementById("stepContent");
const progressDots = document.getElementById("progressDots");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

let currentStep = 0;

const reviewData = {
  name: "",
  email: "",
  rating: "",
  widget: "",
  device: "",
  feedback: "",
  screenshot_link: "",
  repost_ok: false
};

const steps = [
  {
    key: "rating",
    title: "how are you liking DigitalGuru? ✧",
    subtitle: "choose the one that fits best",
    type: "options",
    options: ["obsessed ♡", "pretty good", "needs work"]
  },
  {
    key: "widget",
    title: "favorite widget?",
    subtitle: "pick the one you used or liked most",
    type: "options",
    options: [
      "calendar",
      "journal",
      "mood tracker",
      "affirmations",
      "weekly weather",
      "countdown",
      "vision board",
      "horoscope",
      "live clock",
      "weather"
    ]
  },
  {
    key: "device",
    title: "what device are you using?",
    subtitle: "this helps me fix weird device bugs",
    type: "options",
    options: ["ipad", "laptop", "phone", "both ipad + laptop"]
  },
  {
    key: "feedback",
    title: "tell me anything ✧",
    subtitle: "bugs, ideas, favorite features, emotional support...",
    type: "textarea",
    placeholder: "write your thoughts here..."
  },
  {
    key: "screenshot_link",
    title: "dashboard screenshot?",
    subtitle: "optional: paste a link or write your @ so i can find it",
    type: "input",
    placeholder: "link, username, or leave blank"
  },
  {
    key: "repost_ok",
    title: "can DigitalGuru feature your review?",
    subtitle: "for screenshots, testimonials, or dashboard inspo",
    type: "options",
    options: ["yes ♡", "no"]
  },
  {
    key: "contact",
    title: "last thing ✧",
    subtitle: "optional, but helpful if you want updates or giveaway info",
    type: "contact"
  }
];

function openReview() {
  overlay.classList.remove("hidden");
  currentStep = 0;
  renderStep();
}

function closeReview() {
  overlay.classList.add("hidden");
}

function renderDots() {
  progressDots.innerHTML = "";

  steps.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `dot ${index === currentStep ? "active" : ""}`;
    progressDots.appendChild(dot);
  });
}

function renderStep() {
  const step = steps[currentStep];

  renderDots();

  backBtn.style.visibility = currentStep === 0 ? "hidden" : "visible";
  nextBtn.textContent = currentStep === steps.length - 1 ? "submit" : "next";

  let html = `
    <div>
      <h2 class="step-title">${step.title}</h2>
      <p class="step-subtitle">${step.subtitle}</p>
    </div>
  `;

  if (step.type === "options") {
    html += `<div class="option-grid">`;

    step.options.forEach(option => {
      const savedValue = reviewData[step.key];

      const isSelected =
        step.key === "repost_ok"
          ? (option === "yes ♡" && savedValue === true) ||
            (option === "no" && savedValue === false && savedValue !== "")
          : savedValue === option;

      html += `
        <button class="option-btn ${isSelected ? "selected" : ""}" data-value="${option}">
          ${option}
        </button>
      `;
    });

    html += `</div>`;
  }

  if (step.type === "textarea") {
    html += `
      <textarea
        id="stepInput"
        placeholder="${step.placeholder}"
      >${reviewData[step.key] || ""}</textarea>
    `;
  }

  if (step.type === "input") {
    html += `
      <input
        id="stepInput"
        placeholder="${step.placeholder}"
        value="${reviewData[step.key] || ""}"
      />
