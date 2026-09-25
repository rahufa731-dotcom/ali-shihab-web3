/**
 * DNAC Digital Campus - Master Application Logic
 * Darunnajath Arabic College (DNAC) • كلية دار النجاة العربية
 * Concept Note Implementation: Full Feature Suite
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderTicker();
  renderAboutSection();
  renderPrograms();
  renderFaculty("all");
  renderFacilities("All");
  renderStudentActivities("All");
  renderUpcomingEvents();
  renderNotices("All");
  renderGallery("all");
  setupEventListeners();
  checkSession();
});

// State
let currentNoticeFilter = "All";
let currentGalleryFilter = "all";
let currentFacultyDept = "all";
let currentFacilityCat = "All";
let currentActivityCat = "All";
let isStudentLoggedIn = false;
let currentFacilitySlide = 0;
let facilitySliderTimer;

/* ------------------- Theme (Dark/Light) ------------------- */
function initTheme() {
  const savedTheme = localStorage.getItem("dnac-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("dnac-theme", isDark ? "dark" : "light");
}

/* ------------------- Notice Marquee Ticker ------------------- */
function renderTicker() {
  const tickerContainer = document.getElementById("ticker-items");
  if (!tickerContainer) return;

  const tickerItems = DNAC_DATA.notices.slice(0, 4);
  const itemsHtml = tickerItems
    .map(
      (n) => `
    <span class="inline-flex items-center mx-6 cursor-pointer hover:underline text-emerald-100" onclick="openNoticeModal(${n.id})">
      <span class="bg-amber-400 text-emerald-950 text-xs font-bold px-2 py-0.5 rounded-full mr-2">NOTICE</span>
      ${n.title}
      <span class="text-xs text-emerald-300 ml-2">(${n.date})</span>
    </span>
  `
    )
    .join(" • ");

  // Double it for smooth continuous scrolling
  tickerContainer.innerHTML = itemsHtml + " • " + itemsHtml;
}

/* ------------------- About DNAC Section ------------------- */
function renderAboutSection() {
  // Principal message
  const p = DNAC_DATA.collegeInfo.principalMessage;
  const pCard = document.getElementById("principal-card");
  if (pCard) {
    pCard.innerHTML = `
      <span class="inline-flex items-center gap-2 mb-4 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold px-3 py-1.5 rounded-full">
        <i class="fa-solid fa-quote-left"></i> PRINCIPAL'S DESK
      </span>
      <div>
        <h4 class="text-lg font-bold text-slate-900 dark:text-white">${p.name}</h4>
        <p class="font-arabic text-emerald-600 dark:text-emerald-400 text-sm font-bold">${p.arabicName}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">${p.title} • ${p.qualifications}</p>
        <blockquote class="italic text-xs sm:text-sm text-slate-700 dark:text-slate-300 border-l-2 border-amber-400 pl-3 leading-relaxed mb-4">
          "${p.quote}"
        </blockquote>
        <button onclick="openPrincipalFullModal()" class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
          Read Complete Message from Principal's Desk <i class="fa-solid fa-arrow-right text-[10px]"></i>
        </button>
      </div>
    `;
  }

  // Core Values Grid
  const valuesGrid = document.getElementById("core-values-grid");
  if (valuesGrid) {
    valuesGrid.innerHTML = DNAC_DATA.collegeInfo.coreValues
      .map(
        (v) => `
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 transition group">
        <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">
          <i class="fa-solid ${v.icon}"></i>
        </div>
        <h4 class="font-bold text-sm text-slate-900 dark:text-white">${v.title}</h4>
        <p class="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">${v.desc}</p>
      </div>
    `
      )
      .join("");
  }
}

function openPrincipalFullModal() {
  const p = DNAC_DATA.collegeInfo.principalMessage;
  const modal = document.getElementById("generic-modal");
  const title = document.getElementById("generic-modal-title");
  const body = document.getElementById("generic-modal-body");
  if (!modal || !body) return;

  title.textContent = "From the Principal's Desk";
  body.innerHTML = `
    <div class="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
      <div>
        <h4 class="font-bold text-base text-slate-900 dark:text-white">${p.name}</h4>
        <p class="font-arabic text-emerald-600 dark:text-emerald-400 text-sm">${p.arabicName}</p>
        <p class="text-xs text-slate-500">${p.qualifications}</p>
      </div>
    </div>
    <div class="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
      <p class="font-semibold text-emerald-800 dark:text-emerald-300">"${p.quote}"</p>
      <p>${p.fullMessage}</p>
      <p>Darunnajath Arabic College fosters an ecosystem where intellectual curiosity meets ethical discipline. We welcome researchers, students, and educators from across the nation to partake in this enduring voyage of knowledge.</p>
    </div>
    <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-right">
      <button onclick="closeGenericModal()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold">Close</button>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

/* ------------------- Campus Facilities ------------------- */
function renderFacilities(category = "All") {
  const container = document.getElementById("facilities-grid");
  if (!container) return;

  let filtered = DNAC_DATA.facilities;
  if (category !== "All") {
    filtered = filtered.filter((f) => f.category.toLowerCase() === category.toLowerCase());
  }

  container.innerHTML = filtered
    .map(
      (f) => `
    <div class="min-w-full px-1">
      <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all group flex flex-col md:flex-row">
        <div class="relative h-64 md:h-auto md:min-h-[360px] md:w-1/2 overflow-hidden">
          <img src="${f.image}" alt="${f.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
          <span class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ${f.category}
          </span>
          <span class="absolute bottom-3 right-3 font-arabic text-white bg-emerald-950/80 px-2 py-0.5 rounded text-xs font-bold">
            ${f.arabicTitle}
          </span>
        </div>
        <div class="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
          <h4 class="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            ${f.title}
          </h4>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            ${f.description}
          </p>

          <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Key Highlights</span>
            <div class="grid grid-cols-2 gap-1.5">
              ${f.features
                .map(
                  (feat) => `
                <div class="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                  <i class="fa-solid fa-circle-check text-emerald-500 text-[10px]"></i>
                  <span class="line-clamp-1">${feat}</span>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
          <button onclick="openFacilityModal('${f.id}')" class="mt-5 w-full py-2 bg-slate-100 hover:bg-emerald-600 hover:text-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5">
          <span>Explore Facility Details</span>
          <i class="fa-solid fa-arrow-right text-[10px]"></i>
        </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
  currentFacilitySlide = 0;
  updateFacilitySlider();
  startFacilityAutoplay();
}

function moveFacilitySlide(direction) {
  const total = DNAC_DATA.facilities.length;
  currentFacilitySlide = (currentFacilitySlide + direction + total) % total;
  updateFacilitySlider();
  restartFacilityAutoplay();
}

function startFacilityAutoplay() {
  clearInterval(facilitySliderTimer);
  facilitySliderTimer = setInterval(() => moveFacilitySlide(1), 5500);
}

function restartFacilityAutoplay() {
  clearInterval(facilitySliderTimer);
  facilitySliderTimer = setInterval(() => moveFacilitySlide(1), 5500);
}

function updateFacilitySlider() {
  const slider = document.getElementById("facilities-grid");
  const dots = document.getElementById("facility-slider-dots");
  if (!slider || !dots) return;

  slider.style.transform = `translateX(-${currentFacilitySlide * 100}%)`;
  dots.innerHTML = DNAC_DATA.facilities
    .map(
      (_, index) => `
      <button onclick="currentFacilitySlide = ${index}; updateFacilitySlider()" aria-label="Show facility ${index + 1}" class="w-2.5 h-2.5 rounded-full transition ${index === currentFacilitySlide ? "bg-emerald-600 w-6" : "bg-slate-300 dark:bg-slate-600 hover:bg-emerald-400"}"></button>`
    )
    .join("");
}

function openFacilityModal(facId) {
  const f = DNAC_DATA.facilities.find((item) => item.id === facId);
  if (!f) return;

  const modal = document.getElementById("generic-modal");
  const title = document.getElementById("generic-modal-title");
  const body = document.getElementById("generic-modal-body");
  if (!modal || !body) return;

  title.textContent = f.title;
  body.innerHTML = `
    <div class="relative h-60 rounded-xl overflow-hidden mb-4">
      <img src="${f.image}" alt="${f.title}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
        <div>
          <span class="text-amber-300 text-xs font-bold uppercase">${f.category} Infrastructure</span>
          <h4 class="text-white text-lg font-bold">${f.title}</h4>
          <p class="font-arabic text-emerald-300 text-sm">${f.arabicTitle}</p>
        </div>
      </div>
    </div>
    <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">${f.description}</p>
    <div class="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
      <h5 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Specifications & Operational Guidelines:</h5>
      <ul class="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        ${f.features.map((feat) => `<li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> ${feat}</li>`).join("")}
        <li class="flex items-center gap-2"><i class="fa-solid fa-clock text-amber-500"></i> Open for students & scholars: Monday - Saturday (8:00 AM - 6:00 PM)</li>
      </ul>
    </div>
    <div class="mt-6 flex justify-end">
      <button onclick="closeGenericModal()" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold">Done</button>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

/* ------------------- Student Activities & Clubs ------------------- */
function renderStudentActivities(category = "All") {
  const container = document.getElementById("activities-grid");
  if (!container) return;

  let filtered = DNAC_DATA.studentActivities;
  if (category !== "All") {
    filtered = filtered.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  }

  container.innerHTML = filtered
    .map(
      (act) => `
    <div class="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all group flex flex-col justify-between">
      <div>
        <div class="relative h-44 overflow-hidden">
          <img src="${act.image}" alt="${act.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
            <span class="text-xs font-arabic text-amber-300 font-bold">${act.arabicTitle}</span>
          </div>
          <span class="absolute top-2.5 right-2.5 bg-emerald-800/90 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            ${act.category}
          </span>
        </div>
        <div class="p-4">
          <h4 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            ${act.title}
          </h4>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
            ${act.description}
          </p>
        </div>
      </div>
      <div class="p-4 pt-0">
        <button onclick="showToast('Registrations open for ${act.title}! Inquire at CSU desk.')" class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
          <span>Join Club / Forum</span>
          <i class="fa-solid fa-arrow-right text-[10px]"></i>
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

/* ------------------- Upcoming Events ------------------- */
function renderUpcomingEvents() {
  const container = document.getElementById("events-list");
  if (!container) return;

  container.innerHTML = DNAC_DATA.upcomingEvents
    .map(
      (ev) => `
    <div class="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-500 transition flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      <div class="flex items-start gap-3.5">
        <div class="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex flex-col items-center justify-center flex-shrink-0 font-bold leading-none">
          <i class="fa-regular fa-calendar text-sm mb-1"></i>
          <span class="text-[10px] uppercase font-black">EVENT</span>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              ${ev.tag}
            </span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">
              <i class="fa-solid fa-location-dot text-rose-500 mr-1"></i> ${ev.venue}
            </span>
          </div>
          <h4 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white">${ev.title}</h4>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">${ev.description}</p>
        </div>
      </div>
      <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-700">
        <div class="text-left md:text-right">
          <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 block">${ev.date}</span>
          <span class="text-[10px] text-slate-400">Open for all students</span>
        </div>
        <button onclick="showToast('Event calendar reminder set for: ${ev.title}')" class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shadow-sm">
          <i class="fa-regular fa-bell text-xs"></i>
          <span>Remind Me</span>
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

/* ------------------- Notices & Circulars ------------------- */
function renderNotices(filter = "All", searchQuery = "") {
  const noticesList = document.getElementById("notices-list");
  if (!noticesList) return;

  let filtered = DNAC_DATA.notices;

  if (filter !== "All") {
    filtered = filtered.filter((n) => n.category.toLowerCase() === filter.toLowerCase());
  }

  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (n) => n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q) || n.category.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    noticesList.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
        <i class="fa-regular fa-folder-open text-4xl mb-3 text-slate-400"></i>
        <p class="text-base font-medium">No notices found matching your criteria.</p>
      </div>
    `;
    return;
  }

  noticesList.innerHTML = filtered
    .map(
      (n) => `
    <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-200 flex flex-col justify-between group">
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="text-xs font-semibold px-2.5 py-1 rounded-md ${getCategoryBadgeStyle(n.category)}">
            ${n.category}
          </span>
          <div class="flex items-center text-xs text-slate-400 dark:text-slate-500">
            <i class="fa-regular fa-calendar-days mr-1.5"></i>
            ${n.date}
          </div>
        </div>
        <h4 class="font-bold text-slate-800 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
          ${n.title}
        </h4>
        <p class="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
          ${n.description}
        </p>
      </div>
      
      <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <button onclick="openNoticeModal(${n.id})" class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1">
          <span>Read Details</span>
          <i class="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
        </button>
        <button onclick="mockDownload('${n.file}', '${n.title}')" class="text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700" title="Download Circular PDF">
          <i class="fa-solid fa-file-arrow-down text-sm"></i>
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

function getCategoryBadgeStyle(category) {
  switch (category) {
    case "Examinations":
      return "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300";
    case "Admissions":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
    case "Academic":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
    case "Events":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300";
    default:
      return "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300";
  }
}

function openNoticeModal(noticeId) {
  const notice = DNAC_DATA.notices.find((n) => n.id === noticeId);
  if (!notice) return;

  const modalContainer = document.getElementById("notice-modal");
  const modalContent = document.getElementById("notice-modal-body");
  if (!modalContainer || !modalContent) return;

  modalContent.innerHTML = `
    <div class="flex items-center gap-2 mb-2">
      <span class="text-xs font-bold px-2.5 py-1 rounded ${getCategoryBadgeStyle(notice.category)}">${notice.category}</span>
      <span class="text-xs text-slate-500"><i class="fa-regular fa-clock mr-1"></i> Published: ${notice.date}</span>
    </div>
    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">${notice.title}</h3>
    <div class="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6 space-y-3">
      <p>${notice.description}</p>
      <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs">
        <p class="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">Official Reference: DNAC/ACAD/2026/NOT-${notice.id.toString().padStart(3, "0")}</p>
        <p class="text-slate-600 dark:text-slate-400">Issued under the authority of the Office of the Principal & Academic Council, Darunnajath Arabic College.</p>
      </div>
    </div>
    <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
      <div class="text-xs text-slate-400">
        <i class="fa-solid fa-file-pdf text-red-500 mr-1.5"></i> ${notice.file} (1.4 MB)
      </div>
      <div class="flex items-center gap-2">
        <button onclick="mockDownload('${notice.file}', '${notice.title}')" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-sm transition">
          <i class="fa-solid fa-download"></i> Download Circular (PDF)
        </button>
        <button onclick="closeNoticeModal()" class="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition">
          Close
        </button>
      </div>
    </div>
  `;

  modalContainer.classList.remove("hidden");
  modalContainer.classList.add("flex");
}

function closeNoticeModal() {
  const modalContainer = document.getElementById("notice-modal");
  if (modalContainer) {
    modalContainer.classList.add("hidden");
    modalContainer.classList.remove("flex");
  }
}

function mockDownload(filename, title) {
  showToast(`Initiating download: ${filename} ("${title.slice(0, 30)}...")`);
}

/* ------------------- Academic Programs ------------------- */
function renderPrograms() {
  const container = document.getElementById("programs-grid");
  if (!container) return;

  container.innerHTML = DNAC_DATA.programs
    .map(
      (prog) => `
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col justify-between group">
      <div>
        <div class="flex items-start justify-between mb-3">
          <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
            ${prog.level}
          </span>
          <span class="text-xs font-medium text-slate-400 flex items-center gap-1">
            <i class="fa-regular fa-clock"></i> ${prog.duration}
          </span>
        </div>
        <span class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-1">${prog.department}</span>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          ${prog.title}
        </h3>
        <p class="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed">
          ${prog.description}
        </p>

        <div class="mt-4">
          <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Key Focus Areas:</p>
          <div class="flex flex-wrap gap-1.5">
            ${prog.curriculum
              .slice(0, 3)
              .map(
                (c) => `
              <span class="text-xs bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                ${c}
              </span>
            `
              )
              .join("")}
          </div>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <button onclick="openProgramDetails('${prog.id}')" class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
          Full Syllabus & Admission Criteria <i class="fa-solid fa-chevron-right text-[10px]"></i>
        </button>
        <a href="#admissions" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition">
          View Admission Guidelines
        </a>
      </div>
    </div>
  `
    )
    .join("");
}

function openProgramDetails(progId) {
  const prog = DNAC_DATA.programs.find((p) => p.id === progId);
  if (!prog) return;

  const modal = document.getElementById("program-modal");
  const body = document.getElementById("program-modal-body");
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="flex items-center gap-2 mb-2">
      <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">${prog.level}</span>
      <span class="text-xs text-slate-500">Course Code: ${prog.code} | Intake: ${prog.intake}</span>
    </div>
    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-1">${prog.title}</h3>
    <p class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3">${prog.department}</p>
    <p class="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">${prog.description}</p>
    
    <div class="grid md:grid-cols-2 gap-4 mb-6">
      <div class="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
        <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
          <i class="fa-solid fa-graduation-cap"></i> Eligibility Criteria
        </h4>
        <p class="text-xs text-slate-700 dark:text-slate-300 leading-normal">${prog.eligibility}</p>
      </div>
      <div class="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
        <h4 class="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-1.5">
          <i class="fa-solid fa-briefcase"></i> Career Prospects
        </h4>
        <p class="text-xs text-slate-700 dark:text-slate-300 leading-normal">${prog.career}</p>
      </div>
    </div>

    <div class="mb-6">
      <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-2">Core Course Modules & Subjects:</h4>
      <ul class="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
        ${prog.curriculum.map((c) => `<li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> ${c}</li>`).join("")}
      </ul>
    </div>

    <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
      <button onclick="closeProgramModal()" class="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition">Close</button>
      <a href="#admissions" onclick="closeProgramModal()" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition">View Admission Guidelines</a>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeProgramModal() {
  const modal = document.getElementById("program-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function prefillAdmission(courseName) {
  const selectElem = document.getElementById("admissions-course");
  const section = document.getElementById("admissions");
  if (selectElem && section) {
    for (let i = 0; i < selectElem.options.length; i++) {
      if (selectElem.options[i].text.includes(courseName) || selectElem.options[i].value === courseName) {
        selectElem.selectedIndex = i;
        break;
      }
    }
    section.scrollIntoView({ behavior: "smooth" });
  }
}

/* ------------------- Campus Tour & Gallery ------------------- */
function renderGallery(filter = "all") {
  const galleryGrid = document.getElementById("gallery-grid");
  if (!galleryGrid) return;

  let filtered = DNAC_DATA.gallery;
  if (filter !== "all") {
    filtered = filtered.filter((g) => g.category === filter);
  }

  galleryGrid.innerHTML = filtered
    .map(
      (item) => `
    <div class="group relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-sm cursor-pointer aspect-video" onclick="openLightbox(${item.id})">
      <img src="${item.thumbnail}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <span class="text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-1">${item.category}</span>
        <h4 class="text-white font-bold text-sm leading-tight drop-shadow-sm">${item.title}</h4>
      </div>
      <div class="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <i class="fa-solid fa-expand text-xs"></i>
      </div>
    </div>
  `
    )
    .join("");
}

function openLightbox(itemId) {
  const item = DNAC_DATA.gallery.find((g) => g.id === itemId);
  if (!item) return;

  const modal = document.getElementById("lightbox-modal");
  const imgElem = document.getElementById("lightbox-img");
  const titleElem = document.getElementById("lightbox-title");
  const captionElem = document.getElementById("lightbox-caption");
  if (!modal || !imgElem) return;

  imgElem.src = item.full;
  titleElem.textContent = item.title;
  captionElem.textContent = item.caption;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

/* ------------------- Virtual 360 Tour Simulator ------------------- */
const TOUR_SPOTS = {
  admin: {
    name: "Main Academic Quadrangle & Campus Courtyard",
    image: "assets/images/dnac-campus-main.jpg",
    description: "A view of the DNAC Koonanchery courtyard and its academic buildings."
  },
  library: {
    name: "Library & Reading Space",
    image: "assets/images/library.jpg",
    description: "A dedicated campus library for reading, study and academic reference."
  },
  lab: {
    name: "Computer & Digital Learning Lab",
    image: "assets/images/computer-lab.jpg",
    description: "A digital learning space for computer literacy, academic projects and research."
  },
  auditorium: {
    name: "Campus Auditorium",
    image: "assets/images/auditorium.jpg",
    description: "A venue for assemblies, guest sessions, cultural programmes and campus events."
  }
};

function switchTourSpot(spotKey) {
  const spot = TOUR_SPOTS[spotKey];
  if (!spot) return;

  const tourImg = document.getElementById("tour-view-img");
  const tourTitle = document.getElementById("tour-spot-title");
  const tourDesc = document.getElementById("tour-spot-desc");
  const buttons = document.querySelectorAll(".tour-btn");

  if (tourImg) tourImg.src = spot.image;
  if (tourTitle) tourTitle.textContent = spot.name;
  if (tourDesc) tourDesc.textContent = spot.description;

  buttons.forEach((btn) => {
    if (btn.dataset.spot === spotKey) {
      btn.classList.add("bg-emerald-600", "text-white");
      btn.classList.remove("bg-white/80", "text-slate-800", "dark:bg-slate-800/80", "dark:text-white");
    } else {
      btn.classList.remove("bg-emerald-600", "text-white");
      btn.classList.add("bg-white/80", "text-slate-800", "dark:bg-slate-800/80", "dark:text-white");
    }
  });
}

/* ------------------- Faculty Directory ------------------- */
function renderFaculty(department = "all") {
  const grid = document.getElementById("faculty-grid");
  if (!grid) return;

  let filtered = DNAC_DATA.faculty;
  if (department !== "all") {
    filtered = filtered.filter((f) => f.department.toLowerCase() === department.toLowerCase());
  }

  grid.innerHTML = filtered
    .map(
      (f) => `
    <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200/90 dark:border-slate-700/90 text-center flex flex-col items-center justify-between hover:shadow-xl hover:border-emerald-500 transition-all duration-300 group">
      
      <div class="w-full flex flex-col items-center">
        <!-- Avatar Circle (Uniform for all) -->
        <div class="relative mb-3 mt-1">
          <div class="w-20 h-20 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-600 shadow-inner group-hover:border-emerald-500 transition-colors">
            <i class="fa-solid fa-user text-2xl"></i>
          </div>
        </div>

        <!-- Name & Subject -->
        <h4 class="font-black text-base text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
          ${f.name}
        </h4>
        <p class="font-arabic text-emerald-700 dark:text-emerald-400 text-sm font-semibold mt-0.5">${f.arabicName}</p>
        <p class="text-xs font-black tracking-wider text-slate-500 dark:text-slate-400 uppercase mt-1">
          ${f.subject}
        </p>

        <!-- Uniform Badge -->
        <div class="mt-2.5">
          <span class="text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase ${
            f.badge === "FACULTY"
              ? "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
              : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
          }">
            ${f.badge}
          </span>
        </div>

        <p class="text-xs text-slate-500 dark:text-slate-400 mt-3 line-clamp-2 px-2">
          ${f.specialization}
        </p>
      </div>

      <!-- Action Buttons Matching Live App (Call & Profile) -->
      <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 w-full flex items-center justify-center gap-3">
        <button onclick="showToast('Connecting call to ${f.name} (${f.subject})...')" class="flex-1 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition transform hover:-translate-y-0.5">
          <i class="fa-solid fa-phone text-[11px]"></i>
          <span>CALL</span>
        </button>
        <button onclick="openFacultyModal('${f.id}')" class="flex-1 py-2 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-sm transition">
          PROFILE
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

function openFacultyModal(facultyId) {
  const f = DNAC_DATA.faculty.find((item) => item.id === facultyId);
  if (!f) return;

  const modal = document.getElementById("generic-modal");
  const title = document.getElementById("generic-modal-title");
  const body = document.getElementById("generic-modal-body");
  if (!modal || !body) return;

  title.textContent = `${f.name} - Faculty Profile`;
  body.innerHTML = `
    <div class="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
      <div class="w-16 h-16 rounded-full flex items-center justify-center ${
        f.isPrimary
          ? "bg-indigo-600 text-white"
          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
      }">
        <i class="fa-solid fa-user text-2xl"></i>
      </div>
      <div>
        <h4 class="font-bold text-lg text-slate-900 dark:text-white uppercase">${f.name}</h4>
        <p class="font-arabic text-emerald-600 dark:text-emerald-400 text-base">${f.arabicName}</p>
        <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">${f.subject} • ${f.badge}</p>
      </div>
    </div>
    <div class="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
      <p><span class="font-bold text-slate-500">Designation:</span> ${f.role}</p>
      <p><span class="font-bold text-slate-500">Qualifications:</span> ${f.qualifications}</p>
      <p><span class="font-bold text-slate-500">Department:</span> ${f.department}</p>
      <p><span class="font-bold text-slate-500">Specialization:</span> ${f.specialization}</p>
      <p><span class="font-bold text-slate-500">Institution:</span> Darunnajath Arabic College (DNAC), Koonanchery</p>
    </div>
    <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
      <button onclick="closeGenericModal()" class="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold">Close</button>
      <button onclick="showToast('Connecting call to ${f.name}...'); closeGenericModal()" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5">
        <i class="fa-solid fa-phone text-xs"></i> Contact Teacher
      </button>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

/* ------------------- Interactive Student Portal ------------------- */
function checkSession() {
  const session = localStorage.getItem("dnac-student-session");
  if (session === "active") {
    isStudentLoggedIn = true;
    updatePortalUI();
  }
}

function openPortalModal() {
  const modal = document.getElementById("portal-modal");
  if (!modal) return;

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  if (!isStudentLoggedIn) {
    showLoginView();
  } else {
    showDashboardView();
  }
}

function closePortalModal() {
  const modal = document.getElementById("portal-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function showLoginView() {
  const loginView = document.getElementById("portal-login-view");
  const dashboardView = document.getElementById("portal-dashboard-view");
  if (loginView && dashboardView) {
    loginView.classList.remove("hidden");
    dashboardView.classList.add("hidden");
  }
}

function showDashboardView() {
  const loginView = document.getElementById("portal-login-view");
  const dashboardView = document.getElementById("portal-dashboard-view");
  if (loginView && dashboardView) {
    loginView.classList.add("hidden");
    dashboardView.classList.remove("hidden");
    renderStudentDashboard();
  }
}

function fillDemoStudent() {
  const idInput = document.getElementById("student-id-input");
  const pwdInput = document.getElementById("student-pwd-input");
  if (idInput && pwdInput) {
    idInput.value = "DNAC-2024-042";
    pwdInput.value = "student123";
  }
}

function handleStudentLogin(e) {
  if (e) e.preventDefault();
  const id = document.getElementById("student-id-input").value.trim();
  const pwd = document.getElementById("student-pwd-input").value.trim();

  if (!id || !pwd) {
    showToast("Please enter your Student ID and Password", "error");
    return;
  }

  isStudentLoggedIn = true;
  localStorage.setItem("dnac-student-session", "active");
  updatePortalUI();
  showDashboardView();
  showToast("Welcome back, Muhammad Farhan! Access granted.");
}

function handleStudentLogout() {
  isStudentLoggedIn = false;
  localStorage.removeItem("dnac-student-session");
  updatePortalUI();
  showLoginView();
  showToast("Logged out successfully.");
}

function updatePortalUI() {
  const btn = document.getElementById("nav-portal-btn");
  if (btn) {
    if (isStudentLoggedIn) {
      btn.innerHTML = `<i class="fa-solid fa-user-graduate mr-1.5 text-amber-400"></i> My Student Portal`;
      btn.classList.add("border-amber-400");
    } else {
      btn.innerHTML = `<i class="fa-solid fa-lock mr-1.5"></i> Student Portal`;
      btn.classList.remove("border-amber-400");
    }
  }
}

function renderStudentDashboard() {
  const s = DNAC_DATA.demoStudent;
  
  // Basic info
  document.getElementById("dash-student-name").textContent = s.name;
  document.getElementById("dash-student-program").textContent = `${s.program} • ${s.semester}`;
  document.getElementById("dash-student-reg").textContent = `Reg No: ${s.regNo} | Roll: ${s.rollNo}`;
  document.getElementById("dash-attendance-badge").textContent = `${s.attendancePercentage}% Attendance`;
  document.getElementById("dash-cgpa-badge").textContent = `CGPA: ${s.cgpa}`;

  // Default to overview tab
  switchDashboardTab("overview");
}

function switchDashboardTab(tabName) {
  const tabs = ["overview", "attendance", "grades", "timetable", "hallticket", "fees"];
  tabs.forEach((t) => {
    const el = document.getElementById(`tab-content-${t}`);
    const navBtn = document.getElementById(`dash-tab-btn-${t}`);
    if (el) {
      if (t === tabName) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }
    if (navBtn) {
      if (t === tabName) {
        navBtn.classList.add("bg-emerald-600", "text-white");
        navBtn.classList.remove("text-slate-600", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-700");
      } else {
        navBtn.classList.remove("bg-emerald-600", "text-white");
        navBtn.classList.add("text-slate-600", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-700");
      }
    }
  });

  if (tabName === "attendance") renderAttendanceTab();
  if (tabName === "grades") renderGradesTab();
  if (tabName === "timetable") renderTimetableTab();
  if (tabName === "hallticket") renderHallTicketTab();
  if (tabName === "fees") renderFeesTab();
}

function renderAttendanceTab() {
  const container = document.getElementById("attendance-breakdown-list");
  if (!container) return;

  const s = DNAC_DATA.demoStudent;
  container.innerHTML = s.attendanceDetails
    .map(
      (sub) => `
    <div class="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700">
      <div class="flex items-center justify-between mb-2">
        <div>
          <h5 class="font-bold text-sm text-slate-800 dark:text-white">${sub.subject}</h5>
          <span class="text-xs text-slate-500 dark:text-slate-400">Course Code: ${sub.code}</span>
        </div>
        <div class="text-right">
          <span class="text-sm font-bold ${sub.percentage >= 85 ? "text-emerald-600" : "text-amber-500"}">${sub.percentage}%</span>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">${sub.attended} / ${sub.total} Classes</p>
        </div>
      </div>
      <div class="w-full bg-slate-200 dark:bg-slate-600 h-2 rounded-full overflow-hidden">
        <div class="h-full ${sub.percentage >= 85 ? "bg-emerald-500" : "bg-amber-500"} rounded-full" style="width: ${sub.percentage}%"></div>
      </div>
    </div>
  `
    )
    .join("");
}

function renderGradesTab() {
  const container = document.getElementById("grades-table-body");
  if (!container) return;

  const s = DNAC_DATA.demoStudent;
  container.innerHTML = s.recentGrades
    .map(
      (g) => `
    <tr class="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-xs">
      <td class="p-3 font-medium text-slate-800 dark:text-white">${g.code}</td>
      <td class="p-3 text-slate-700 dark:text-slate-300 font-semibold">${g.course}</td>
      <td class="p-3 text-slate-500">${g.internal}/20</td>
      <td class="p-3 text-slate-500">${g.external}/80</td>
      <td class="p-3 font-bold text-slate-800 dark:text-white">${g.total}/100</td>
      <td class="p-3">
        <span class="px-2 py-0.5 rounded text-xs font-bold ${g.grade === "A+" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300"}">
          ${g.grade} (${g.points})
        </span>
      </td>
    </tr>
  `
    )
    .join("");
}

function renderTimetableTab() {
  const container = document.getElementById("timetable-container");
  if (!container) return;

  const s = DNAC_DATA.demoStudent;
  container.innerHTML = s.timetable
    .map(
      (day) => `
    <div class="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl border border-slate-200 dark:border-slate-700">
      <h5 class="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">${day.day}</h5>
      <div class="grid grid-cols-2 md:grid-cols-6 gap-2">
        ${day.periods
          .map(
            (p, idx) => `
          <div class="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 text-center">
            <span class="text-[10px] text-slate-400 block font-semibold">P${idx + 1}</span>
            <span class="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-2">${p}</span>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `
    )
    .join("");
}

function renderHallTicketTab() {
  const container = document.getElementById("hallticket-container");
  if (!container) return;

  const s = DNAC_DATA.demoStudent;
  const ht = s.hallTicket;

  container.innerHTML = `
    <div id="printable-content" class="bg-white text-slate-900 p-6 rounded-2xl border-2 border-slate-300 shadow-sm max-w-3xl mx-auto">
      <div class="text-center pb-4 border-b-2 border-emerald-900">
        <h3 class="text-lg font-extrabold uppercase text-emerald-900">Darunnajath Arabic College (DNAC)</h3>
        <p class="text-xs font-semibold text-slate-600">AFFILIATED TO DARUL HUDA ISLAMIC UNIVERSITY (DHIU) • CENTRAL EXAMINATION CELL</p>
        <div class="inline-block bg-emerald-900 text-white text-xs font-bold px-3 py-1 rounded mt-2 uppercase">
          E-HALL TICKET / ADMIT CARD
        </div>
      </div>

      <div class="grid grid-cols-4 gap-4 my-5 items-center">
        <div class="col-span-3 text-xs space-y-1.5">
          <p><span class="font-bold text-slate-500 w-32 inline-block">EXAMINATION:</span> <span class="font-bold">${ht.examTitle}</span></p>
          <p><span class="font-bold text-slate-500 w-32 inline-block">CANDIDATE NAME:</span> <span class="font-bold text-emerald-800 uppercase">${ht.candidateName}</span></p>
          <p><span class="font-bold text-slate-500 w-32 inline-block">REGISTER NUMBER:</span> <span class="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-black">${ht.candidateRegNo}</span></p>
          <p><span class="font-bold text-slate-500 w-32 inline-block">EXAM CENTRE:</span> <span>${ht.center}</span></p>
        </div>
        <div class="col-span-1 text-center">
          <img src="${ht.photo}" alt="${ht.candidateName}" class="w-24 h-28 object-cover mx-auto border-2 border-slate-300 rounded shadow-sm">
          <span class="text-[9px] text-slate-500 mt-1 block">Verified Candidate</span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left border border-slate-300">
          <thead class="bg-slate-100 font-bold border-b border-slate-300">
            <tr>
              <th class="p-2 border-r border-slate-300">Date & Day</th>
              <th class="p-2 border-r border-slate-300">Time</th>
              <th class="p-2 border-r border-slate-300">Course Code</th>
              <th class="p-2 border-r border-slate-300">Subject / Course Title</th>
              <th class="p-2 text-center">Invigilator Sign</th>
            </tr>
          </thead>
          <tbody>
            ${ht.papers
              .map(
                (p) => `
              <tr class="border-b border-slate-200">
                <td class="p-2 font-semibold border-r border-slate-300">${p.date}</td>
                <td class="p-2 border-r border-slate-300">${p.time}</td>
                <td class="p-2 font-mono font-bold border-r border-slate-300">${p.code}</td>
                <td class="p-2 font-medium border-r border-slate-300">${p.subject}</td>
                <td class="p-2 border-slate-300"></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="mt-6 flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
        <div class="text-[10px] text-slate-500">
          <p>• Candidate must carry College ID card along with this Hall Ticket.</p>
          <p>• Mobile phones, smart watches & electronic items are strictly prohibited.</p>
        </div>
        <div class="text-center">
          <div class="h-10 flex items-center justify-center font-arabic text-emerald-800 font-bold text-sm italic">
            حسينار البقاوي
          </div>
          <span class="text-[10px] font-bold uppercase block border-t border-slate-400 pt-0.5">Usthad Hassainar Baqawi (Principal)</span>
        </div>
      </div>
    </div>

    <div class="mt-4 flex items-center justify-center gap-3 no-print">
      <button onclick="window.print()" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow flex items-center gap-2">
        <i class="fa-solid fa-print"></i> Print Official Hall Ticket
      </button>
      <button onclick="showToast('Admit Card downloaded as PDF!')" class="px-4 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-lg hover:bg-slate-300 transition flex items-center gap-2">
        <i class="fa-solid fa-file-arrow-down"></i> Save as PDF
      </button>
    </div>
  `;
}

function renderFeesTab() {
  const container = document.getElementById("fees-container");
  if (!container) return;

  const f = DNAC_DATA.demoStudent.fees;
  container.innerHTML = `
    <div class="p-6 bg-slate-50 dark:bg-slate-700/40 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-xl mx-auto">
      <div class="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-600">
        <div>
          <span class="text-xs text-slate-400 block">Current Academic Term</span>
          <h4 class="font-bold text-slate-900 dark:text-white text-base">Semester IV (2025-2026)</h4>
        </div>
        <span class="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-extrabold rounded-full flex items-center gap-1">
          <i class="fa-solid fa-circle-check"></i> ${f.status}
        </span>
      </div>

      <div class="space-y-2 text-xs mb-6">
        <div class="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700">
          <span class="text-slate-600 dark:text-slate-400">Tuition & Campus Fee:</span>
          <span class="font-semibold text-slate-800 dark:text-slate-200">${f.semesterFee}</span>
        </div>
        <div class="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700">
          <span class="text-slate-600 dark:text-slate-400">University Exam Fee:</span>
          <span class="font-semibold text-slate-800 dark:text-slate-200">${f.examFee}</span>
        </div>
        <div class="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700">
          <span class="text-slate-600 dark:text-slate-400">Language Lab & E-Library:</span>
          <span class="font-semibold text-slate-800 dark:text-slate-200">${f.labFee}</span>
        </div>
        <div class="flex justify-between py-2 text-sm font-bold text-slate-900 dark:text-white">
          <span>Total Paid:</span>
          <span class="text-emerald-600 dark:text-emerald-400">₹ 6,670</span>
        </div>
      </div>

      <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs flex items-center justify-between">
        <div>
          <span class="text-[10px] text-slate-500 dark:text-slate-400 block">Receipt Number</span>
          <span class="font-mono font-bold text-emerald-800 dark:text-emerald-300">${f.receiptNo}</span>
        </div>
        <button onclick="showToast('Payment receipt downloaded!')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium text-xs">
          <i class="fa-solid fa-download mr-1"></i> Receipt
        </button>
      </div>
    </div>
  `;
}

/* ------------------- Generic Modal Helper ------------------- */
function closeGenericModal() {
  const modal = document.getElementById("generic-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

/* ------------------- Event Listeners ------------------- */
function setupEventListeners() {
  // Theme toggle button
  const themeToggle = document.getElementById("theme-toggle-btn");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Faculty department filter buttons
  const facultyDeptBtns = document.querySelectorAll(".faculty-dept-btn");
  facultyDeptBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      facultyDeptBtns.forEach((b) => {
        b.classList.remove("bg-emerald-600", "text-white");
        b.classList.add("bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
      });
      btn.classList.add("bg-emerald-600", "text-white");
      btn.classList.remove("bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
      currentFacultyDept = btn.dataset.dept;
      renderFaculty(currentFacultyDept);
    });
  });

  // Facilities category filter buttons
  const facilityFilterBtns = document.querySelectorAll(".facility-filter-btn");
  facilityFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      facilityFilterBtns.forEach((b) => {
        b.classList.remove("bg-emerald-600", "text-white");
        b.classList.add("bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
      });
      btn.classList.add("bg-emerald-600", "text-white");
      btn.classList.remove("bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
      currentFacilityCat = btn.dataset.category;
      renderFacilities(currentFacilityCat);
    });
  });

  // Student activities filter buttons
  const activityFilterBtns = document.querySelectorAll(".activity-filter-btn");
  activityFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activityFilterBtns.forEach((b) => {
        b.classList.remove("bg-emerald-600", "text-white");
        b.classList.add("bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
      });
      btn.classList.add("bg-emerald-600", "text-white");
      btn.classList.remove("bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
      currentActivityCat = btn.dataset.category;
      renderStudentActivities(currentActivityCat);
    });
  });

  // Notice category filter tabs
  const noticeFilterBtns = document.querySelectorAll(".notice-filter-btn");
  noticeFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      noticeFilterBtns.forEach((b) => {
        b.classList.remove("bg-emerald-600", "text-white");
        b.classList.add("bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
      });
      btn.classList.add("bg-emerald-600", "text-white");
      btn.classList.remove("bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
      currentNoticeFilter = btn.dataset.category;
      renderNotices(currentNoticeFilter, document.getElementById("notice-search")?.value || "");
    });
  });

  // Notice search
  const noticeSearch = document.getElementById("notice-search");
  if (noticeSearch) {
    noticeSearch.addEventListener("input", (e) => {
      renderNotices(currentNoticeFilter, e.target.value);
    });
  }

  // Gallery category filter buttons
  const galleryFilterBtns = document.querySelectorAll(".gallery-filter-btn");
  galleryFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      galleryFilterBtns.forEach((b) => {
        b.classList.remove("bg-emerald-600", "text-white");
        b.classList.add("bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
      });
      btn.classList.add("bg-emerald-600", "text-white");
      btn.classList.remove("bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
      currentGalleryFilter = btn.dataset.category;
      renderGallery(currentGalleryFilter);
    });
  });

  // Admission inquiry form submission
  const admissionForm = document.getElementById("admission-form");
  if (admissionForm) {
    admissionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const applicantName = document.getElementById("applicant-name").value;
      const refId = "DNAC-ADM-" + Math.floor(100000 + Math.random() * 900000);

      document.getElementById("ref-id-display").textContent = refId;
      document.getElementById("modal-applicant-name").textContent = applicantName;

      const successModal = document.getElementById("admission-success-modal");
      if (successModal) {
        successModal.classList.remove("hidden");
        successModal.classList.add("flex");
      }
      admissionForm.reset();
    });
  }

  // General contact / inquiry form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Thank you! Your message has been routed to the relevant department desk.");
      contactForm.reset();
    });
  }
}

function closeAdmissionSuccess() {
  const successModal = document.getElementById("admission-success-modal");
  if (successModal) {
    successModal.classList.add("hidden");
    successModal.classList.remove("flex");
  }
}

/* ------------------- Toast Notification ------------------- */
function showToast(message, type = "success") {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-20 opacity-0 pointer-events-none";
    document.body.appendChild(toast);
  }

  if (type === "error") {
    toast.className = "fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl transition-all duration-300 bg-rose-600 text-white text-xs font-semibold";
    toast.innerHTML = `<i class="fa-solid fa-circle-exclamation text-base"></i> <span>${message}</span>`;
  } else {
    toast.className = "fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl transition-all duration-300 bg-emerald-800 text-white text-xs font-semibold border border-emerald-600";
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-base text-amber-400"></i> <span>${message}</span>`;
  }

  // Slide in
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-20", "opacity-0", "pointer-events-none");
  });

  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0", "pointer-events-none");
  }, 3500);
}
