🏆 Project: ContestHub - The Ultimate Creative Contest Platform
ContestHub is a modern, full-stack, role-based platform designed for creating, discovering, participating in, and managing a wide array of creative contests, including Design, Article Writing, Gaming Reviews, and Business Ideas. The application boasts a professional, responsive UI and robust role management for Admins, Contest Creators, and Normal Users.


Live Site URL:	[https://contest-hub-bfe54.web.app/]

Client Side Repository:	[https://github.com/himel2535/contestHub-frontend]

Server Side Repository:	[https://github.com/himel2535/contestHub-backend]

Export to Sheets

🔑 Test Account Credentials
To fully test the application's comprehensive role management features, you can use the following demo accounts:

	Email	Password
Role: Admin ,	Email: admin@gmail.com	, Password: admin@gmail.com

Role: Contest Creator, Email: jhankar@gmail.com,  Password: jhankar@gmail.com

Normal User	[Please use a self-registered user account]	[Password]

Export to Sheets

✨ Key Features & Functionality (20+ Feature Highlights)
Robust Role-Based Access Control (RBAC): Implements three distinct user roles (Admin, Contest Creator, Normal User) with dedicated, responsive, and secure dashboards.

- Secure Payment Integration: Features a seamless and secure payment flow (e.g., Stripe) for contest registration. Participant count dynamically updates upon successful payment.

- Dynamic Leaderboard: A dedicated page where users are ranked globally based on their total number of contest wins, motivating healthy competition.

- Creator Request System: Normal Users can submit a request to Become a Contest Creator, which Admins can approve or reject via their dashboard.

- Admin Inventory & Messaging: Implements a full Contact Us form where users can send messages, which are collected and displayed in the Admin's My Inventory for review.

- Optimized Data Fetching: Uses TanStack Query for all data operations to ensure efficient caching, background fetching, and real-time UI updates (e.g., immediate update of the "Submit Task" button after payment).

- Dashboard Statistics: Each role's dashboard features unique and relevant statistical overviews (e.g., Admin: Total Users/Contests; User: Win Percentage Chart; Creator: Earnings/Contest Stats).

- JWT Security & Private Routes: Ensures API security using JWT and maintains user session across page refreshes for all private and dashboard routes.

- Advanced Contest Management:

- Creator: Can add, edit (if pending), delete, manage submissions, and declare a single contest winner.

- Admin: Can approve, reject, or delete submitted contests.

- Intuitive Contest Discovery: The Home Page features a search bar allowing users to find contests by Contest Type, and the All Contests page includes category tabs.

- Comprehensive User Profile: Users can view their Participated Contests (sorted by upcoming deadline) and My Winning Contests, alongside a profile update form.

- Aesthetic & Technical Polish: Fully responsive design across all views, professional Dark/Light Theme Toggle (saved in localStorage), and clean code utilizing Framer Motion/AOS for smooth animations.

💻 Technologies Used
Category	Technologies
Frontend:	React, Tailwind CSS,headlessui, TanStack Query, React Hook Form, Framer Motion (or AOS), React Datepicker
Backend:	Node.js, Express.js
Database:	MongoDB
Authentication:	Firebase Auth (Email/Password & Google Sign-in), JWT

Export to Sheets

🚀 Getting Started Locally
Clone the Repositories:

Bash

git clone [https://github.com/himel2535/contestHub-frontend]

git clone [https://github.com/himel2535/contestHub-backend]

Client Setup:

Bash

cd [client-folder-name]
npm install
# Create a .env file and set necessary environment variables (e.g., VITE_API_URL)
npm run dev
Server Setup:

Bash

cd [server-folder-name]
npm install
# Create a .env file and hide secrets (MongoDB URI, JWT Secret, Firebase/Payment Keys)
npm start
npm run dev
Visit http://localhost:5173 (or your client's designated port) in your browser.