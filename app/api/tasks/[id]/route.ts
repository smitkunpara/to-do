import { NextRequest, NextResponse } from 'next/server';
import { updateTask, deleteTask } from '@/lib/taskStore';

// PUT /api/tasks/[id] - Update task completion status
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const taskId = parseInt(resolvedParams.id);
        const body = await request.json();
        const { completed } = body;

        console.log('PUT request received:', { taskId, completed, paramId: resolvedParams.id });

        // Validation
        if (isNaN(taskId)) {
            console.log('Invalid task ID:', resolvedParams.id);
            return NextResponse.json(
                { success: false, message: 'Invalid task ID' },
                { status: 400 }
            );
        }

        if (typeof completed !== 'boolean') {
            console.log('Invalid completed value:', completed);
            return NextResponse.json(
                { success: false, message: 'Completed field must be a boolean' },
                { status: 400 }
            );
        }

        // Update the task
        const updatedTask = updateTask(taskId, { completed });
        console.log('updateTask result:', updatedTask);

        if (!updatedTask) {
            console.log('Task not found for ID:', taskId);
            return NextResponse.json(
                { success: false, message: 'Task not found' },
                { status: 404 }
            );
        }

        // Return validation success - client will handle actual update
        return NextResponse.json({
            success: true,
            data: updatedTask,
            message: 'Task updated successfully'
        });
    } catch (error) {
        console.error('PUT request error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update task' },
            { status: 500 }
        );
    }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const taskId = parseInt(resolvedParams.id);

        // Validation
        if (isNaN(taskId)) {
            return NextResponse.json(
                { success: false, message: 'Invalid task ID' },
                { status: 400 }
            );
        }

        // Remove the task
        const deletedTask = deleteTask(taskId);

        if (!deletedTask) {
            return NextResponse.json(
                { success: false, message: 'Task not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: deletedTask,
            message: 'Task deleted successfully'
        });
    } catch {
        return NextResponse.json(
            { success: false, message: 'Failed to delete task' },
            { status: 500 }
        );
    }
}
