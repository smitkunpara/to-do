import { NextRequest, NextResponse } from 'next/server';
import { getTasks, addTask } from '@/lib/taskStore';

// GET /api/tasks - Fetch all tasks
export async function GET() {
  try {
    const tasks = getTasks();
    return NextResponse.json({
      success: true,
      data: tasks,
      message: 'Tasks fetched successfully'
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Add a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, completed = false } = body;

    // Validation
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Title is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (title.trim().length > 200) {
      return NextResponse.json(
        { success: false, message: 'Title must be less than 200 characters' },
        { status: 400 }
      );
    }

    if (typeof completed !== 'boolean') {
      return NextResponse.json(
        { success: false, message: 'Completed must be a boolean value' },
        { status: 400 }
      );
    }

    // Create new task (ID will be auto-generated)
    const newTask = addTask({
      title: title.trim(),
      completed,
      createdAt: new Date()
    });

    return NextResponse.json(
      {
        success: true,
        data: newTask,
        message: 'Task created successfully'
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to create task' },
      { status: 500 }
    );
  }
}
