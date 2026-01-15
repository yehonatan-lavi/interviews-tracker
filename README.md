# 🎯 SDK Interview Tracker - BioCatch

A modern application for managing and tracking job interviews for the SDK team, focusing on balanced workload distribution among team members.

## ✨ Key Features

### 📊 Real-time Statistics
- **Visual representation** of interview counts per team member.
- **Interactive charts** with color-coded progress bars.
- **Auto-detection** of high/low workload (above/below average).
- **Core metrics**: Total interviews and average per person.

### ➕ Smart Interview Addition
- **Automatic recommendation** for the interviewer with the fewest interviews.
- Detailed fields:
  - Candidate Name
  - Interviewer (with current interview count display)
  - Date and Time
  - Status (Scheduled/Completed/Cancelled)
  - Additional Notes
- **Validation** for all required fields.

### 📋 Advanced Interview Management
- **Search** by candidate name or interviewer.
- **Filter** by status or specific interviewer.
- **Sort** by date, candidate name, or interviewer.
- **Edit and Delete** existing interviews.
- Clean and modern **card view**.

### 💾 Local Storage
- All data is saved in LocalStorage.
- Data persists even after closing the browser.

### 🎨 Modern Design
- Clean and intuitive interface.
- **Automatic support** for dark/light mode.
- **Fully responsive** - works great on mobile and tablet.
- **Smooth animations** and visual feedback.

## 🚀 Installation and Setup

### Prerequisites
- Node.js version 20.19+ or 22.12+ (**Important!**)
- npm or yarn

### Setup Steps

1. **Check Node.js Version**
```bash
node --version
```

If the version is lower than 20.19, please upgrade:
```bash
# Using nvm (recommended)
nvm install 20
nvm use 20
```

2. **Install Dependencies**
```bash
cd interviews-tracker
npm install
```

3. **Run Development Server**
```bash
npm run dev
```

4. **Open Browser**
The app should automatically open at `http://localhost:5173`.

## 👥 Team Members

The app comes pre-configured with the SDK team members:
- Asaf Inbar
- Aviv Frenkel
- Ben Drori
- Daniel Caspit
- Daniel Hadad
- Dvir Daniel
- Gal Mirkin
- Tal Kanel
- Tal Levi
- Yoav Paskaro

## 💡 Future Feature Ideas

1. **Data Export**
   - Export to Excel/CSV.
   - Monthly report generation.

2. **Notifications**
   - Alert when a team member reaches a certain interview threshold.
   - Reminders before interviews.

3. **Calendar Integration**
   - Sync with Google Calendar.
   - Auto-add events to the calendar.

4. **Ratings and Reviews**
   - Track candidate performance.
   - Notes and recommendations.

5. **Interview Templates**
   - Save question templates.
   - Interview topics by role.

## 🛠️ Technologies

- **React 19**
- **TypeScript**
- **Vite**
- **CSS3** with CSS Variables
- **LocalStorage API**

---

**Built with pride for the BioCatch SDK Team** 🚀
