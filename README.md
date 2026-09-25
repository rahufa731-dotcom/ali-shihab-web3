# DNAC Digital Campus Website
### Darunnajath Arabic College (DNAC) • كلية دار النجاة العربية
*Affiliated with the University of Calicut | Recognized by Govt. of Kerala | Established 1976*

A modern, responsive, and feature-rich digital campus website and student information portal built for **Darunnajath Arabic College (DNAC)**.

---

## 🌟 Key Highlights & Features

### 1. 🎓 Interactive Student Information Portal (SIS)
- **Instant 1-Click Demo Login**: Pre-filled with student credentials (`DNAC-2024-042`) or custom login.
- **Attendance Tracker**: Visual progress indicators and subject-by-subject percentage dials with minimum 75% alerts.
- **University Examination Grade Sheet**: Semester-wise CBCSS credit table with SGPA calculation and printable transcript.
- **Interactive Timetable**: Day-by-day weekly schedule with lecture halls and faculty references.
- **Calicut University E-Hall Ticket**: Official printable admit card with candidate photo, barcode, exam routine, and controller of examinations endorsement.
- **Fee Management**: Online fee status, itemized breakdown, and downloadable payment receipts.

### 2. 📢 Live Circulars & Notice Marquee
- Continuous smooth news ticker marquee with pause-on-hover.
- Searchable and filterable Notice Board with categories:
  - Examinations (Calicut University time tables, internal mark lists)
  - Admissions
  - Academic
  - Events & Sports
- Modal viewer with downloadable PDF circular simulation.

### 3. 🏛️ 360° Virtual Campus Tour & Photo Archive
- Interactive campus simulator with instant hotspot switcher:
  - Main Administrative & Academic Complex
  - Allama Shibli Nomani Central Library & Research Wing
  - Digital Arabic Language & Simultaneous Interpretation Lab
  - Dr. APJ Abdul Kalam Smart Conference Auditorium
- High-definition gallery with filterable categories and full-screen lightbox modal.

### 4. 📚 Academic Programs & Syllabi
- Detailed curriculum explorer for:
  - **Afzal-ul-Ulama Preliminary** (2 Years Foundation)
  - **B.A. Afzal-ul-Ulama in Arabic** (3 Years Degree)
  - **M.A. Post Graduate in Arabic** (2 Years PG)
  - **Diploma in Commercial Arabic & Translation** (1 Year Career Course)
- Pop-up syllabus modal detailing course codes, eligibility criteria, core modules, and career prospects.

### 5. 📝 Online Admissions 2026-27 Application
- Interactive multi-field admission form with instant client-side validation.
- Auto-generated Application Reference Number (`DNAC-ADM-XXXXXX`) and success confirmation.

### 6. 🌙 Modern Design & Dark/Light Mode
- Built with Tailwind CSS, FontAwesome 6, and Google Fonts (*Plus Jakarta Sans* & *Amiri* Arabic calligraphy).
- Light and Dark mode toggle with saved state in `localStorage`.
- Fully responsive across desktop, tablet, and mobile displays.

---

## 🚀 How to Run Locally

### Option A: Via Python HTTP Server (Recommended)
From this project directory, run:
```bash
python -m http.server 8080
```
Then open your web browser and navigate to:
[http://localhost:8080](http://localhost:8080)

### Option B: Direct File Open
You can also directly open `index.html` by double-clicking it in Windows Explorer or opening it in Chrome, Edge, or Firefox.

---

## 📁 File Structure
```
dnac-digital-campus/
├── index.html            # Master landing page & student portal modal
├── css/
│   └── styles.css        # Custom styles, Arabic typography, print stylesheet
├── js/
│   ├── portal-data.js    # Mock database for students, notices, exams, faculty
│   └── app.js            # Interactive application logic & state management
└── README.md             # Documentation
```
