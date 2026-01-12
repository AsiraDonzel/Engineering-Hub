### ABUAD EngiHub - Engineering Student Portal
ABUAD EngiHub is a high-performance, AI-integrated workspace designed specifically for the College of Engineering at Afe Babalola University (ABUAD). It provides students with a centralized hub for lab report generation, file management, and academic productivity, featuring a robust security model based on Matric Numbers.

### Key Features
- **Smart Assist (AI Lab Generator)**: Leverages the Gemini 1.5 Flash API to transform raw experiment data into professional engineering lab reports (Theory, Discussion, Conclusion).

- **File Hub**: A document management system with PDF conversion tools and offline-ready storage for lecture notes and manuals.

- **Academic Toolkit**: A repository for ABUAD past questions and a digital SIWES Logbook tracker with PDF export functionality.

- **Code Lab**: A lightweight web-based IDE for programming logic and circuit simulation documentation.

- **Productivity Center**: Integrated Pomodoro timer, task manager, and course credit planner.

- **Low-Data Mode**: A custom logic switch that disables animations and heavy API calls to save data costs for students.

### Technical Stack
- **Frontend**: React (Vite), TypeScript, Tailwind CSS

- **State Management**: React Context API

- **Animations**: Framer Motion (Suppressed in Low-Data Mode)

- **PDF Logic**: jsPDF (Client-side generation)

- **Offline Support**: Vite PWA Plugin 

## Installation & Setup
1. Clone the repository:
```bash
git clone https://github.com/AsiraDonzel/Engineering-Hub.git
cd Engineering-Hub
```
2. Install Dependencies:
```bash
npm install
```
3. Environment Variables: Create a .env file in the root directory and add your Gemini API Key:
```bash
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```
4. Run Development Server:
```bash
npm run dev
```
