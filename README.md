# 📝 To-Do List Application

A modern, responsive to-do list application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. This project demonstrates both backend API development and frontend React integration.

## 🚀 Features

### Backend (API)
- ✅ **GET /api/tasks** - Fetch all tasks
- ✅ **POST /api/tasks** - Add a new task
- ✅ **PUT /api/tasks/:id** - Update task completion status  
- ✅ **DELETE /api/tasks/:id** - Delete a task
- ✅ In-memory data storage
- ✅ Input validation and error handling
- ✅ RESTful API design

### Frontend (React/Next.js)
- ✅ Task list display with real-time updates
- ✅ Add new tasks with form validation
- ✅ Toggle task completion (mark as done/undone)
- ✅ Delete tasks with confirmation
- ✅ Responsive design (mobile-friendly)
- ✅ Loading states and error handling
- ✅ Progress tracking and statistics
- ✅ Modern UI with Tailwind CSS

### Design Features
- 📱 **Mobile-responsive** design
- 🎨 **Modern UI** with clean aesthetics
- ⚡ **Fast loading** with optimized components
- 🔄 **Real-time updates** without page refresh
- 📊 **Progress tracking** with completion statistics
- 🎯 **Intuitive UX** with clear visual feedback

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Data Storage**: In-memory (for demo purposes)
- **Validation**: Built-in TypeScript and runtime validation

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- PowerShell (Windows) or any terminal

### 1. Clone the Repository
```powershell
git clone <repository-url>
cd to-do
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Run the Development Server
```powershell
npm run dev
```

The application will be available at **http://localhost:3000**

## 🔧 Available Scripts

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api`

#### 1. Get All Tasks
```http
GET /api/tasks
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Learn Next.js",
      "completed": false,
      "createdAt": "2025-06-27T10:00:00.000Z"
    }
  ],
  "message": "Tasks fetched successfully"
}
```

#### 2. Add New Task
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "New task title",
  "completed": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "New task title",
    "completed": false,
    "createdAt": "2025-06-27T10:05:00.000Z"
  },
  "message": "Task created successfully"
}
```

#### 3. Update Task Status
```http
PUT /api/tasks/1
Content-Type: application/json

{
  "completed": true
}
```

#### 4. Delete Task
```http
DELETE /api/tasks/1
```

## 🧪 Testing the Application

### Manual Testing Steps:

1. **Start the application**:
   ```powershell
   npm run dev
   ```

2. **Open browser** and navigate to `http://localhost:3000`

3. **Test Adding Tasks**:
   - Enter a task title in the input field
   - Click "Add Task" button
   - Verify the task appears in the list

4. **Test Completing Tasks**:
   - Click the checkbox or "Complete" button next to a task
   - Verify the task shows strike-through text and moves to "Completed Tasks" section

5. **Test Deleting Tasks**:
   - Click the "Delete" button next to any task
   - Verify the task is removed from the list

6. **Test Responsive Design**:
   - Resize browser window or test on mobile device
   - Verify UI adapts correctly to different screen sizes

### API Testing with PowerShell:

```powershell
# Get all tasks
Invoke-RestMethod -Uri "http://localhost:3000/api/tasks" -Method GET

# Add a new task
$body = @{
    title = "Test Task"
    completed = $false
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/tasks" -Method POST -Body $body -ContentType "application/json"

# Update task (replace {id} with actual task ID)
$updateBody = @{
    completed = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/tasks/{id}" -Method PUT -Body $updateBody -ContentType "application/json"

# Delete task (replace {id} with actual task ID)
Invoke-RestMethod -Uri "http://localhost:3000/api/tasks/{id}" -Method DELETE
```

## 📁 Project Structure

```
to-do/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts              # GET, POST endpoints
│   │       └── [id]/
│   │           └── route.ts          # PUT, DELETE endpoints
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Main page component
├── components/
│   ├── TaskForm.tsx                  # Add task form
│   ├── TaskItem.tsx                  # Individual task component
│   └── TaskList.tsx                  # Task list container
├── hooks/
│   └── useTasks.ts                   # Custom hook for task management
├── lib/
│   └── taskStore.ts                  # In-memory data store
├── types/
│   └── task.ts                       # TypeScript type definitions
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Key Implementation Highlights

### Backend Features:
- **RESTful API design** with proper HTTP methods
- **Input validation** with detailed error messages
- **Error handling** with appropriate HTTP status codes
- **TypeScript interfaces** for type safety
- **Modular code structure** for maintainability

### Frontend Features:
- **Custom React hooks** for state management
- **Component-based architecture** for reusability
- **Real-time UI updates** without page refresh
- **Loading states** for better user experience
- **Error handling** with user-friendly messages
- **Responsive design** using Tailwind CSS

### Code Quality:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Modular components** for maintainability
- **Clean code practices** with proper commenting
- **Separation of concerns** between API and UI logic

## 🚧 Future Enhancements

- 💾 Database integration (PostgreSQL/MongoDB)
- 🔐 User authentication and authorization
- 📅 Due dates and task scheduling
- 🏷️ Task categories and tags
- 🔍 Search and filtering functionality
- 📤 Export tasks to CSV/JSON
- 🔄 Real-time sync across devices
- 🎨 Theme customization options

## 👨‍💻 Developer Notes

This application was built as part of a MERN/Next.js intern assessment. It demonstrates:

- Full-stack development capabilities
- API design and implementation
- React/Next.js frontend development
- TypeScript usage for type safety
- Modern UI/UX design principles
- Responsive web design
- Code organization and structure

The application is production-ready for demo purposes but would benefit from database integration and enhanced security features for real-world deployment.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**List Application

A modern, responsive to-do list application built with Next.js 15, React 19, and TypeScript. Features a clean interface with task management capabilities and client-side data persistence.

## 🎨 Features 

### Task Management
- **Create**: Add new tasks with title validation
- **Read**: View all tasks with completion status
- **Update**: Toggle task completion status
- **Delete**: Remove tasks with confirmation

