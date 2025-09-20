import React, { useState, useEffect } from 'react';

// Helper component for icons
const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d={path} clipRule="evenodd" />
    </svg>
);

// Individual Task Card Component
const TaskCard = ({ task, columnId, openDeleteModal, openEditModal, handleDragStart }) => {
    return (
        <div
            id={task.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 cursor-grab active:cursor-grabbing group"
            draggable
            onDragStart={(e) => handleDragStart(e, { taskId: task.id, sourceColumnId: columnId })}
        >
            <div className="flex justify-between items-start">
                <h4 className="font-semibold text-gray-800 pr-2">{task.title}</h4>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal(task, columnId)} className="text-gray-400 hover:text-blue-500" aria-label="Edit task">
                        <Icon path="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" className="w-4 h-4" />
                    </button>
                    <button onClick={() => openDeleteModal(task.id, columnId)} className="text-gray-400 hover:text-red-500" aria-label="Delete task">
                        <Icon path="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <p className="text-sm text-gray-600 my-2">{task.description}</p>
            <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                <img src={`https://i.pravatar.cc/150?u=${task.assignee}`} alt={task.assignee} className="w-6 h-6 rounded-full border-2 border-white shadow-md" />
            </div>
        </div>
    );
};

// Column Component
const Column = ({ title, tasks, columnId, handleDrop, handleDragOver, openModal, handleDragStart, openDeleteModal, openEditModal }) => {
    const columnStyles = { 'To Do': 'bg-blue-50 border-blue-200', 'In Progress': 'bg-yellow-50 border-yellow-200', 'Done': 'bg-green-50 border-green-200' };
    const headerStyles = { 'To Do': 'text-blue-600', 'In Progress': 'text-yellow-600', 'Done': 'text-green-600' };

    return (
        <div id={columnId} className={`flex-1 p-4 rounded-xl min-h-[70vh] ${columnStyles[title]}`} onDrop={(e) => handleDrop(e, columnId)} onDragOver={handleDragOver}>
            <div className="flex justify-between items-center mb-4">
                <h3 className={`font-bold text-lg ${headerStyles[title]}`}>{title}</h3>
                {title === 'To Do' && (
                    <button onClick={openModal} className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-colors duration-200" aria-label="Add new task">
                        <Icon path="M12 4.5v15m7.5-7.5h-15" className="w-5 h-5 stroke-current stroke-2" />
                    </button>
                )}
            </div>
            <div className="h-full">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} columnId={columnId} openDeleteModal={openDeleteModal} openEditModal={openEditModal} handleDragStart={handleDragStart} />
                ))}
            </div>
        </div>
    );
};

// Add Task Modal Component
const AddTaskModal = ({ isOpen, onClose, handleAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    if (!isOpen) return null;
    const handleSubmit = (e) => { e.preventDefault(); if (title.trim()) { handleAddTask({ title, description }); setTitle(''); setDescription(''); onClose(); } };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md m-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="add-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" id="add-title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="add-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea id="add-description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Edit Task Modal Component
const EditTaskModal = ({ isOpen, onClose, task, handleUpdateTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            handleUpdateTask({ ...task, title, description });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md m-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Confirmation Modal for Deleting a Task
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md m-4 text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Deletion</h2>
                <p className="text-gray-600 mb-8">
                    Are you sure you want to delete the task: <strong className="text-red-600">"{taskTitle}"</strong>?
                </p>
                <div className="flex justify-center gap-4">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};


// Main TaskList Component
export default function TaskList() {
    const [tasks, setTasks] = useState({
        'todo': [
            { id: '1', title: 'Implement User Authentication', description: 'Set up NextAuth with Google Provider.', assignee: 'alex', dueDate: '2025-09-22' },
            { id: '2', title: 'Design Database Schema', description: 'Define models for Users, Tasks, and Projects.', assignee: 'sam', dueDate: '2025-09-23' },
        ],
        'inProgress': [
            { id: '3', title: 'Develop Dashboard UI', description: 'Create the main layout with sidebar and navbar.', assignee: 'jamie', dueDate: '2025-09-21' },
        ],
        'done': [
            { id: '4', title: 'Setup Next.js Project', description: 'Initialize project with TailwindCSS.', assignee: 'alex', dueDate: '2025-09-20' },
        ]
    });
    
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    
    const [editingTask, setEditingTask] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const [isClient, setIsClient] = useState(false);
    useEffect(() => { setIsClient(true); }, []);

    const handleDragStart = (e, taskInfo) => {
        e.dataTransfer.setData("taskInfo", JSON.stringify(taskInfo));
    };
    
    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (e, targetColumnId) => {
        e.preventDefault();
        const { taskId, sourceColumnId } = JSON.parse(e.dataTransfer.getData("taskInfo"));
        if (sourceColumnId === targetColumnId) return;

        const taskToMove = tasks[sourceColumnId].find(t => t.id === taskId);
        if (!taskToMove) return;

        const newTasks = { ...tasks };
        newTasks[sourceColumnId] = newTasks[sourceColumnId].filter(t => t.id !== taskId);
        newTasks[targetColumnId] = [...newTasks[targetColumnId], taskToMove];
        setTasks(newTasks);
    };

    const handleAddTask = ({ title, description }) => {
        const newTask = { id: crypto.randomUUID(), title, description, assignee: 'new_user', dueDate: new Date().toISOString().split('T')[0] };
        setTasks(prev => ({ ...prev, 'todo': [newTask, ...prev.todo] }));
    };

    const openDeleteModal = (taskId, columnId) => {
        const task = tasks[columnId]?.find(t => t.id === taskId);
        if (task) {
            setTaskToDelete({ taskId, columnId, title: task.title });
            setDeleteModalOpen(true);
        }
    };
    
    const handleConfirmDelete = () => {
        if (!taskToDelete) return;
        const { taskId, columnId } = taskToDelete;
        
        const newTasks = { ...tasks };
        newTasks[columnId] = newTasks[columnId].filter(t => t.id !== taskId);
        setTasks(newTasks);

        setDeleteModalOpen(false);
        setTaskToDelete(null);
    };

    const openEditModal = (task, columnId) => {
        setEditingTask({ ...task, columnId });
        setEditModalOpen(true);
    };

    const handleUpdateTask = (updatedTask) => {
        const { columnId } = editingTask;
        const newTasks = { ...tasks };
        newTasks[columnId] = newTasks[columnId].map(t => t.id === updatedTask.id ? updatedTask : t);
        setTasks(newTasks);
        setEditingTask(null);
        setEditModalOpen(false);
    };

    if (!isClient) return null;

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row gap-6">
                <Column title="To Do" tasks={tasks.todo} columnId="todo" handleDrop={handleDrop} handleDragOver={handleDragOver} openModal={() => setAddModalOpen(true)} openDeleteModal={openDeleteModal} openEditModal={openEditModal} handleDragStart={handleDragStart} />
                <Column title="In Progress" tasks={tasks.inProgress} columnId="inProgress" handleDrop={handleDrop} handleDragOver={handleDragOver} openDeleteModal={openDeleteModal} openEditModal={openEditModal} handleDragStart={handleDragStart} />
                <Column title="Done" tasks={tasks.done} columnId="done" handleDrop={handleDrop} handleDragOver={handleDragOver} openDeleteModal={openDeleteModal} openEditModal={openEditModal} handleDragStart={handleDragStart} />
            </div>
            <AddTaskModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} handleAddTask={handleAddTask} />
            <EditTaskModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} task={editingTask} handleUpdateTask={handleUpdateTask} />
            <ConfirmDeleteModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setDeleteModalOpen(false)} 
                onConfirm={handleConfirmDelete}
                taskTitle={taskToDelete?.title}
            />
        </div>
    );
}

