# Task Manager Backend

This is the backend service for the Task Manager application, built with **Node.js**, **Express**, and **TypeScript**. 

It follows the **Modular Monolith** architecture pattern and implements **Clean Architecture** principles to ensure scalability, maintainability, and loose coupling.

## 🚀 Technologies

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Language**: TypeScript
-   **Database**: MongoDB (with Mongoose/Native Driver)
-   **Tooling**: `nodemon`, `ts-node`, `eslint`, `prettier`

## 🏗 Architecture

The codebase is structured to enforce separation of concerns and dependency rules (inner layers should not depend on outer layers).

### Modules
The application is divided into feature-based modules:
-   `src/modules/tasks`: Handles task management logic.

### Layers (Clean Architecture)
Each module contains the following layers:

1.  **Domain** (`domain`):
    -   Contains Enterprise Business Rules (Entities) and Interfaces.
    -   *Dependencies*: None.
    -   *Examples*: `Task.entity.ts`, `ITaskRepository.ts`

2.  **Application** (`application`):
    -   Contains Application Business Rules (Use Cases).
    -   *Dependencies*: Domain.
    -   *Examples*: `CreateTask.usecase.ts`

3.  **Infrastructure** (`infrastructure`):
    -   Contains Frameworks & Drivers (Database implementations, External APIs).
    -   *Dependencies*: Domain (interfaces).
    -   *Examples*: `MongoTaskRepository.ts`

4.  **Presentation** (`presentation`):
    -   Contains Interface Adapters (Controllers, Routes).
    -   *Dependencies*: Application.
    -   *Examples*: `TaskController.ts`, `task.routes.ts`

### Shared
Cross-cutting concerns are located in `src/shared`:
-   `config`: Configuration (Database, etc.)
-   `middleware`: Express middleware (Error handling, etc.)
-   `utils`: Common utilities (Response formatting, etc.)

## 🛠 Setup & Installation

### Prerequisites
-   Node.js (v16+)
-   MongoDB (running locally or a cloud URI)

### Steps

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd Backend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory (or ensure defaults work for you):
    ```env
    # Server Configuration
    API_PORT=5001   # Default: 5001 (Avoids AirPlay conflict on macOS port 5000)

    # Database Configuration
    MONGO_URI=mongodb://localhost:27017
    DB_NAME=task_manager
    ```

4.  **Run in Development Mode**
    ```bash
    npm run dev
    ```
    The server will start at `http://localhost:5001`.

## 📡 API Endpoints

Base URL: `/api/v1`

### Tasks
-   `POST /tasks`: Create a new task
-   `GET /tasks`: Get all tasks for the current user
-   `GET /tasks/:id`: Get a specific task by ID
-   `PUT /tasks/:id`: Update a task
-   `DELETE /tasks/:id`: Delete a task