# 🛠️ Issue Management System

## 📖 Overview

This repository hosts an **Issue Management System** designed for small to medium-sized teams to efficiently track and resolve issues. Built with **Next.js** on the frontend and **Django** on the backend, it offers real-time issue creation, collaborative commenting, and issue status tracking, all within a sleek and modern UI. The platform also provides visual insights into user activity using **Chart.js**, styled beautifully with **ShadCN** components.

## ✨ Key Features

- 📝 **Real-Time Issue Creation**: Users can quickly create issues with details like title, description, and priority. The issues are instantly stored and displayed.
- 💬 **Collaborative Commenting**: Team members can comment on issues in real-time, enhancing communication and speeding up issue resolution.
- 🔄 **Issue Status Tracking**: Admin can easily track the status of issues, marking them as open or closed.
- 📊 **Data Visualization**: Interactive charts powered by **Chart.js** visualize system activity, giving insights into the number of issues created, commented on, and resolved.

## 🔧 Technology Stack

- **Frontend**: [Next.js](https://nextjs.org/docs) ⚡
  - Leverages server-side rendering for fast load times and a responsive user interface.
- **Backend**: [Django](https://www.djangoproject.com) + [Django REST Framework](https://www.django-rest-framework.org) 🛠️
  - Handles all business logic, API calls, and user authentication.
- **Database**: [SQLite](https://www.sqlite.org/docs.html) 🗄️
  - A lightweight database that stores users, issues, comments, and statuses.
- **Styling**: [ShadCN](https://shadcn.dev) 🎨
  - A modern UI component library offering a customizable and visually appealing design.
- **Data Visualization**: [Chart.js](https://www.chartjs.org/docs/latest/) 📈
  - Generates interactive charts that track user activity and system usage.

## 🏗️ System Architecture

- **Frontend (Next.js)**: Provides a fast, user-friendly experience using server-side rendering for responsive UI.
- **Backend (Django)**: Manages business logic, APIs, and issue operations such as creation, commenting, and status updates.
- **API Integration**: Communication between the frontend and backend is facilitated through RESTful APIs, built using **Django REST Framework**.
- **Database (SQLite)**: Stores data related to issues, user comments, and issue statuses.

## ⚙️ Installation

### 1. **Clone the Repository**
   ```bash
   git clone https://github.com/hkpushpam/Issue-Management-System.git
   ```

### 2. **Backend Setup** 🛠️
   - Navigate to the backend directory and set up a virtual environment:
     ```bash
     cd backend
     python3 -m venv venv
     source venv/bin/activate  # For Windows: venv\Scripts\activate
     ```
   - Install the backend dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the Django migrations to set up the database:
     ```bash
     python manage.py migrate
     ```
   - Start the Django development server:
     ```bash
     python manage.py runserver
     ```

### 3. **Frontend Setup** 💻
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install the frontend dependencies:
     ```bash
     npm install
     ```
   - Start the Next.js development server:
     ```bash
     npm run dev
     ```

## 🚀 Usage

- Access the application in your browser at `http://localhost:3000` for the **Next.js frontend** and `http://localhost:8000` for the **Django backend**.
- Users can create issues, comment on them, and mark them as resolved.
- Use the interactive dashboard to view charts that visualize user activity and system usage.

## 🛠️ Future Enhancements

- **Scalability**: Transition from SQLite to **PostgreSQL** or **MySQL** for handling larger datasets.
- **Performance Improvements**: Optimize API response times for smoother handling of extensive issue tracking.
- **New Features**: Implement features like email notifications, issue categorization, and priority levels for better workflow management.

## 🤝 Contributions

We welcome contributions! 🎉 Fork the repository, make your changes, and submit a pull request. Let’s make this system even better together!

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

## 📚 References

- 📖 [Next.js Documentation](https://nextjs.org/docs)
- 🛠️ [Django REST Framework Documentation](https://www.django-rest-framework.org)
- 🗃️ [SQLite Documentation](https://www.sqlite.org/docs.html)
- 🎨 [ShadCN Documentation](https://shadcn.dev)
- 📈 [Chart.js Documentation](https://www.chartjs.org/docs/latest/)

---

We hope this Issue Management System helps your team stay organized and resolve issues faster! 👨‍💻👩‍💻
