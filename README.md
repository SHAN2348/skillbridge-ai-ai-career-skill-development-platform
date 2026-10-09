# SkillBridge AI 🚀

### AI-Powered Career Guidance & Skill Development Platform

SkillBridge AI is a full-stack web application designed to help users explore career opportunities, identify skill gaps, and make better career decisions through AI-driven skill analysis and job recommendations.

Developed as part of **NareshIT HackFest 2026**, this project demonstrates practical experience in full-stack development, REST API integration, authentication, database management, and cloud deployment.

## 🌐 Live Application

| Resource           | Link                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| Live Demo          | [SkillBridge AI](https://skillbridge-ai-job.netlify.app/)                                           |
| GitHub Repository  | [View Source Code](https://github.com/SHAN2348/skillbridge-ai-ai-career-skill-development-platform) |
| Developer LinkedIn | [Connect with me](https://www.linkedin.com/in/shan-shareef-shaik-a4595833a/)                        |

## ✨ Features

* **Career Guidance:** Support users in exploring career paths and opportunities.
* **Skill-Gap Analysis:** Help users understand skills they may need to develop for their career goals.
* **Job Recommendations:** Assist users in discovering relevant career opportunities.
* **User Authentication:** JWT-based authentication for protected application features.
* **Role-Based Authorization:** Manage access to features according to user roles.
* **Password Security:** Password hashing using bcrypt.
* **REST API Integration:** Communication between the frontend and backend.
* **Database Integration:** Data management using MongoDB and Mongoose.
* **Responsive UI:** A user-friendly interface for different screen sizes.
* **Cloud Deployment:** Deployed frontend and backend components.

## 🛠️ Tech Stack

| Technology   | Purpose                               |
| ------------ | ------------------------------------- |
| React.js     | Frontend user interface               |
| JavaScript   | Application functionality             |
| Node.js      | Backend runtime                       |
| Express.js   | Backend framework and REST APIs       |
| MongoDB      | Database                              |
| Mongoose     | MongoDB object modeling               |
| JWT          | Authentication                        |
| bcrypt       | Password hashing                      |
| Netlify      | Frontend deployment                   |
| Render       | Backend deployment                    |
| Git & GitHub | Version control and source management |
| Postman      | API testing                           |

## 🏗️ Architecture

```text
                 User
                  |
                  v
          React Frontend
             Netlify
                  |
                  | REST API Requests
                  v
         Node.js + Express
              Render
                  |
          +-------+-------+
          |               |
          v               v
    Authentication    App Logic
     JWT + bcrypt          |
          |                |
          +-------+--------+
                  |
                  v
               MongoDB
```

The frontend handles the user interface, while the backend manages application logic, API requests, authentication, authorization, and database operations.

## 🔐 Authentication & Security

The application incorporates the following security mechanisms:

* JWT-based authentication.
* Password hashing using bcrypt.
* Protected routes and authorization checks.
* Separation of frontend and backend responsibilities.
* Environment variables for sensitive configuration.

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm
* [Git](https://git-scm.com/)
* A MongoDB database or MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/SHAN2348/skillbridge-ai-ai-career-skill-development-platform.git

cd skillbridge-ai-ai-career-skill-development-platform
```

### 2. Install dependencies

Check the repository structure to identify the frontend and backend directories.

For a project with separate frontend and backend folders, install dependencies in each directory:

```bash
cd backend
npm install
```

Then, in a separate terminal:

```bash
cd frontend
npm install
```

Adjust the directory names if your repository uses a different structure.

### 3. Configure environment variables

Create a `.env` file in the backend directory and configure the variables required by your application.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Use the actual environment variable names expected by your source code. Never commit real credentials or secret keys to GitHub.

### 4. Start the backend

Run the development or start command defined in the backend's `package.json`. For example:

```bash
npm run dev
```

Alternatively, use `npm start` if that is the configured script.

### 5. Start the frontend

Open another terminal, navigate to the frontend directory, and run:

```bash
npm run dev
```

If the project uses a different frontend setup, follow the scripts specified in its `package.json`.

Open the local URL shown in your terminal to access the application.

## ☁️ Deployment

The application uses separate hosting platforms for its frontend and backend.

| Component | Platform                            |
| --------- | ----------------------------------- |
| Frontend  | [Netlify](https://www.netlify.com/) |
| Backend   | [Render](https://render.com/)       |
| Database  | MongoDB / MongoDB Atlas             |

### Deployment workflow

1. Push the latest source code to GitHub.
2. Deploy the frontend through Netlify.
3. Deploy the backend through Render.
4. Configure the required environment variables.
5. Set the frontend API URL to the deployed backend.
6. Verify API connectivity, authentication, and database operations.

## 🎯 Project Objectives

* Apply full-stack development concepts to a practical application.
* Develop frontend and backend integration using REST APIs.
* Implement authentication and role-based authorization.
* Work with MongoDB for data persistence.
* Explore AI-driven career guidance and job recommendations.
* Deploy a web application using cloud hosting platforms.

## 📚 Key Learnings

Through this project, I gained practical experience in:

* Building and integrating a full-stack web application.
* Developing REST APIs with Node.js and Express.js.
* Managing data using MongoDB and Mongoose.
* Implementing JWT authentication and password hashing.
* Debugging API integration and authentication issues.
* Testing backend endpoints using Postman.
* Deploying frontend and backend applications.
* Understanding application configuration and production deployment.

## 🔮 Future Enhancements

Potential improvements include:

* Personalized career roadmaps.
* Resume analysis and skill extraction.
* More advanced job-matching algorithms.
* Learning resource recommendations.
* Skill development progress tracking.
* Automated testing and continuous integration.
* Improved application performance and accessibility.

## 👨‍💻 Developer

**Shaik Shan Shareef**

Full-Stack Developer | Python & AI Application Development

* **GitHub:** [SHAN2348](https://github.com/SHAN2348)
* **LinkedIn:** [shan-shareef-shaik-a4595833a](https://www.linkedin.com/in/shan-shareef-shaik-a4595833a/)
* **Project Demo:** [SkillBridge AI](https://skillbridge-ai-job.netlify.app/)

## 📄 License

No license has been specified in this README. Add a `LICENSE` file if you intend to distribute the project under an open-source license.

---

*SkillBridge AI — Bridging the gap between skills, opportunities, and career growth.*
