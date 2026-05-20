# SQLMaster — SQL Study Website

A modern, responsive React app for learning SQL with authentication, interactive lessons, practice challenges, and quizzes.

## Tech Stack

- **React.js** (Vite)
- **Tailwind CSS v4**
- **React Router DOM**
- **Context API** (Auth + Theme)
- **Framer Motion**
- **React Hot Toast**

## Features

- Login & Register with form validation, toast messages, and localStorage auth
- Tutorial dashboard with navbar, sidebar, and animated page transitions
- SQL Lessons (DDL, DML, DQL) with dynamic tabs, search, and expandable lesson cards
- Practice SQL editor with challenges and answer checking
- Interactive quiz with progress and score summary
- Profile page with stats, badges, and editable name
- Dark / Light mode toggle
- Mobile-responsive sidebar with overlay
- Logout confirmation modal
- Progress bars on dashboard and sidebar

## Project Structure

```
src/
├── components/     # Navbar, Sidebar, LessonCard, LogoutModal
├── context/        # AuthContext, ThemeContext
├── data/           # sqlLessons.js (DDL, DML, DQL content)
├── pages/          # Login, Register, Dashboard, Lessons, Practice, Quiz, Profile
├── routes/         # ProtectedRoute, GuestRoute
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. **Register** a new account on the Register page (password min 6 characters, confirm password must match).
2. **Login** with your credentials — you will be redirected to the dashboard.
3. Use the **sidebar** to navigate: Dashboard, SQL Lessons, Practice, Quiz, Profile.
4. In **SQL Lessons**, switch between DDL / DML / DQL tabs and search lessons by title or keyword.
5. Toggle **dark/light mode** from the navbar.
6. **Logout** from the sidebar (confirmation modal appears).

## Demo Login

On the Login page, click **Fill Demo Credentials** after registering at least one account to auto-fill the first registered user's email and password.

## Data Storage

User accounts and session data are stored in the browser's `localStorage`:

- `sql_study_users` — registered users
- `sql_study_user` — current logged-in user (no password stored)
- `sql_study_theme` — dark/light preference
