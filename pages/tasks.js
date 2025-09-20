import TaskList from '../components/TaskList';

export default function TasksPage() {
    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl font-bold text-gray-800">Team To-Do List</h1>
                    <p className="text-sm text-gray-500">Drag and drop to organize your team's work.</p>
                </div>
            </header>
            <main className="p-4 sm:p-6 lg:p-8">
                <TaskList />
            </main>
        </div>
    );
}