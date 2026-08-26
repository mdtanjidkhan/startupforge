
# 🚀 StartupForge  
### Full-Stack Startup Collaboration & Job Opportunity Platform

StartupForge is a modern full-stack platform that connects **startup founders** with talented **collaborators**.  

Founders can create and manage startup opportunities, while collaborators can discover roles, search with real-time filtering, and apply for suitable opportunities seamlessly.

---

# ✨ Features

## 👥 Role-Based Platform

- **Founder**
  - Create startup opportunities
  - Manage posted roles
  - Track applicants

- **Collaborator**
  - Browse available opportunities
  - Search and filter roles
  - Apply for startup positions

---

## 🔍 Smart Search & Filtering

- Real-time opportunity searching
- Debounced search implementation
- Filter by:
  - Role type
  - Work type
  - Commitment level

Optimized for smooth user experience without unnecessary API calls.

---

## 📊 Dynamic Dashboard

- Real-time application statistics
- Total applications count
- Pending reviews
- Rejected applications

Data is dynamically calculated from MongoDB using optimized queries.

---

## 📱 Responsive User Interface

- Fully responsive design
- Mobile-first approach
- Desktop optimized layout
- Dark mode support

---

# 🛠️ Tech Stack

## 🎨 Frontend

| Technology | Purpose |
|---|---|
| React | UI development |
| Next.js (App Router) | Full-stack React framework |
| Tailwind CSS | Styling |
| HeroUI | UI components |
| React Icons | Icon library |
| React Hot Toast | Notifications |


## ⚙️ Backend

| Technology | Purpose |
|---|---|
| Node.js | Server runtime |
| Express.js | REST API development |
| MongoDB | Database |
| JWT | Authentication & Authorization |


---

# 🔐 Authentication & Security

- JWT based authentication
- Protected routes
- Role-based authorization
- Secure user sessions


---
🚀 Getting Started
1. Clone the repository
git clone https://github.com/mdtanjidkhan/startupforge.git
cd startupforge
2. Install dependencies
npm install
3. Configure environment variables

Create a .env.local file and add the required environment variables.

MONGODB_URI=your_mongodb_uri,

JWT_SECRET=your_jwt_secret,

NEXT_PUBLIC_API_URL=your_api_url,

Never commit your actual secrets or environment variables to GitHub.

4. Run the development server
npm run dev

Open http://localhost:3000 in your browser.

👨‍💻 Author

Md. Tanjid Hasan

Full-Stack JavaScript Developer

GitHub: https://github.com/mdtanjidkhan

Portfolio: https://tanjid-portfolio.netlify.app/

⭐ If you like StartupForge, consider giving the repository a star!

