# 📝 To-Do List Application

A modern, responsive to-do list application built with **Next.js 15**, and **TypeScript**. This project demonstrates full-stack development capabilities with both backend API development and frontend React integration.

### Backend
- **GET /api/tasks** - Fetch all tasks  
- **POST /api/tasks** - Add new task with title and completed status
- **PUT /api/tasks/:id** - Update task completion status
- **DELETE /api/tasks/:id** - Delete task by ID
- **In-memory data store** for task persistence
- **Input validation** with proper error handling
- **RESTful API design** with appropriate HTTP status codes

### Frontend
- **Task list display** showing all tasks from backend
- **Add task form** with input validation and submit functionality
- **Toggle completion** using checkbox interface
- **Delete functionality** with intuitive delete icon
- **Responsive design** that works on mobile and desktop
- **Strike-through effect** for completed tasks
- **API integration** with smooth frontend-backend communication
- **Loading states** and error handling for better UX

### Using the Interface

#### 1. **Adding Tasks**
- Enter your task title in the input field at the top
- Click the **"Add Task"** button or press Enter
- Your task will appear in the "Pending Tasks" section

#### 2. **Completing Tasks**
- Click the **checkbox** (☐) next to any task to mark it as complete
- Completed tasks will:
  - Show a checkmark (☑) in green
  - Display with strike-through text
  - Move to the "Completed Tasks" section

#### 3. **Deleting Tasks**
- Click the **trash icon** (🗑️) next to any task to delete it
- The task will be permanently removed from the list

#### 4. **Viewing Progress**
- The blue statistics bar shows:
  - **Total tasks** count
  - **Pending tasks** count  
  - **Completed tasks** count
  - **Progress percentage** based on completion ratio

## 🛠️ Tech Stack

- **Frontend**: Next.js 15,  TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Data Storage**: In-memory with globalThis persistence
- **Validation**: TypeScript + runtime validation
Proper error boundaries and user feedback
