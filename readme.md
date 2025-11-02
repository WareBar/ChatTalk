# 💬 ChatTalk  
> A real-time chat application built with Django Channels and React — seamless messaging for individuals and groups.

![GitHub last commit](https://img.shields.io/github/last-commit/WareBar/ChatTalk?color=4CAF50)
![GitHub repo size](https://img.shields.io/github/repo-size/WareBar/ChatTalk?color=2196F3)
![GitHub license](https://img.shields.io/github/license/WareBar/ChatTalk?color=FFC107)

---

## 🪶 Overview  

**ChatTalk** is a full-stack real-time chat platform designed to demonstrate modern **WebSocket-based communication**.  
It supports **1-on-1**(on work) and **group conversations**, built on a clean and scalable architecture using **Django Channels** on the backend and **React (Vite)** on the frontend.

The project is modular, maintainable, and easy to extend — perfect for learning, prototypes, or even production-grade messaging apps.

---

## 🧰 Tech Stack  

### ⚙️ Backend
- **Django** – Core backend framework  
- **Django Channels** – WebSocket communication layer  
- **ASGI** – Asynchronous server interface for real-time support  
- **Redis** – Channel layer for message broadcasting  
- **SQLite** – Database  

### 🖥️ Frontend
- **React + Vite** – Fast, modern frontend framework  
- **Tailwind CSS** – Responsive and elegant UI styling  
- **Axios** – API event handling  
- **Lucide Icons** – Clean and modern icons  

### 🧩 Communication
- **WebSockets** – Real-time, bi-directional event system  
- **REST API** – For CRUD operations and authentication  

---

## ✨ Features  

✅ Real-time messaging (WebSockets)  
✅ Private and group chats  
✅ User presence and notifications  
✅ Modular frontend and backend structure  
✅ Built with performance and scalability in mind  
✅ Easy to extend and customize  

---

## 📁 Project Structure  

```bash
ChatTalk/
├── backend/                   # Django backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── chat/                  # Core chat app (models, serializers, views)
│   ├── User/                  # User management and authentication
│   ├── Message/               # Message handling and notifications
│   └── settings.py            # Django settings and Channels config
│
├── frontend/                  # React + Vite frontend
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── pages/             # Page components (Home, Chat, etc.)
│   │   ├── components/        # UI components and layouts
│   │   ├── hooks/             # Custom React hooks
│   │   ├── context/           # State/context management
│   │   └── App.jsx
│   └── public/
│
└── README.md                  # Project documentation

---

```

## ⚡ Installation Guide  

Follow these steps to set up **ChatTalk** on your local machine.

### 🧩 Prerequisites  
Before installation, make sure you have:
- **Python 3.10+**
- **Node.js 18+**
- **npm** or **yarn**
- **Redis** (optional but recommended for WebSockets)

---

### 🐍 Backend Setup (Django)

1. **Navigate to backend folder**
   ```bash
   cd backend
2. **Create a virtual environment
3.  ** pip install -r requirements.txt

4.  **Apply migration -> python manage.py migrate

5.  **Run the backend server -> python manage.py runserver


