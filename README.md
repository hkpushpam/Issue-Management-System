# Issue Management System

## Overview

This repository contains an issue management system designed for small to medium-sized teams to track and resolve issues efficiently. Built using **Next.js** for the frontend and **Django** for the backend, this system offers real-time issue creation, commenting, and issue status tracking, all supported by a modern and intuitive user interface. The platform also provides visualizations of user activity using **Chart.js** and is styled with **ShadCN**.

## Key Features

- **Real-Time Issue Creation**: Users can create issues by providing details such as title, description, and priority. These issues are stored in the database and displayed immediately.
- **Collaborative Commenting**: Users can comment on issues, enabling real-time collaboration for issue resolution.
- **Issue Status Tracking**: Issues can be marked as open or closed, allowing users to track the status of issues in real time.
- **Data Visualization**: Interactive charts visualize the number of issues created, commented on, and resolved, providing insights into system usage and trends.
  
## Technology Stack

- **Frontend**: [Next.js](https://nextjs.org/docs)
  - Utilizes server-side rendering for fast load times and a responsive user interface.
- **Backend**: [Django](https://www.djangoproject.com) + [Django REST Framework](https://www.django-rest-framework.org)
  - Handles API calls, business logic, and user authentication.
- **Database**: [SQLite](https://www.sqlite.org/docs.html)
  - A lightweight database that stores users, issues, comments, and statuses.
- **Styling**: [ShadCN](https://shadcn.dev)
  - A modern component library that provides customizable UI elements.
- **Data Visualization**: [Chart.js](https://www.chartjs.org/docs/latest/)
  - Generates interactive graphs for tracking system activity.

## System Architecture

- **Frontend (Next.js)**: Handles the user interface, providing a fast and responsive experience using server-side rendering.
- **Backend (Django)**: Manages the business logic, handles API requests, and manages issue-related operations such as creation, commenting, and status updates.
- **API Integration**: RESTful APIs, created using Django REST Framework, facilitate communication between the frontend and backend.
- **Database (SQLite)**: Stores issue data, user comments, and issue statuses.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/issue-management-system.git
   ```

2. **Backend Setup**:
   - Navigate to the backend directory and set up a virtual environment:
     ```bash
     cd backend
     python3 -m venv venv
     source venv/bin/activate
     ```
   - Install backend dependencies:
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

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Start the Next.js development server:
     ```bash
     npm run dev
     ```

## Usage

- Access the application in your browser at `http://localhost:3000` (Next.js frontend) and `http://localhost:8000` (Django backend).
- Users can create issues, comment on them, and mark them as resolved.
- Use the interactive dashboard to visualize user interactions with the system.

## Future Enhancements

- **Scalability**: Migrate from SQLite to PostgreSQL or MySQL for better performance in larger applications.
- **Performance Optimization**: Optimize API response times for better handling of large datasets.
- **Additional Features**: Implement features such as email notifications, issue categorization, and priority assignment to improve user workflow.

## Contributions

Feel free to contribute to the project! Fork the repository, make your changes, and create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Django REST Framework Documentation](https://www.django-rest-framework.org)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [ShadCN Documentation](https://shadcn.dev)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)

---
