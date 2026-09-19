import type { Task } from "../types/task";
import { useState } from "react";

type TaskItemProps = {
    task: Task;
    onToggleTask: (id: number) => void;
    onDeleteTask: (id: number) => void;
    onEditTask: (
        id: number,
        updatedText: string,
        updatedPriority: Task["priority"]
    ) => void;
    darkMode: boolean;
};

function TaskItem({
    task,
    onToggleTask,
    onDeleteTask,
    onEditTask, darkMode
}: TaskItemProps) {

    const [isEditing, setIsEditing] = useState(false);

    const [editText, setEditText] = useState(task.text);

    const [editPriority, setEditPriority] =
        useState<Task["priority"]>(task.priority);

    const handleSave = () => {
        onEditTask(task.id, editText, editPriority);
        setIsEditing(false);
    };

    const getDueDateStatus = () => {
        if (!task.dueDate) return "";

        const today = new Date();
        const dueDate = new Date(task.dueDate);

        today.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);

        const difference = dueDate.getTime() - today.getTime();
        const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

        if (daysLeft < 0) return "🔴 Overdue";
        if (daysLeft === 0) return "🟠 Due Today";
        if (daysLeft === 1) return "🟡 Due Tomorrow";
        return "";
    }

    return (
        <div className={`group relative mb-4 overflow-hidden rounded-2xl border p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
            darkMode ? "border-slate-700/50 bg-slate-900/80" : "border-white/40 bg-white/70" } ${ task.priority === "high" ? "before:bg-red-500" : task.priority === "medium" ? "before:bg-yellow-500" : "before:bg-green-500"}
         before:absolute before:left-0 before:top-0 before:h-full before:w-1
        `}>
            {isEditing ? (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                        value={editText}
                        onChange={(event) =>
                            setEditText(event.target.value)
                        } 
                        className={`flex-1 rounded-xl border px-4 py-3 shadow-sm outline-none transition-all placeholder:text-gray-400 ${
                            darkMode ? "border-slate-700 bg-slate-800 text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-900/40" : "border-gray-200 bg-white text-gray-900 focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
                        }`}
                    />

                    <select
                        value={editPriority}
                        onChange={(event) =>
                            setEditPriority(
                                event.target.value as Task["priority"]
                            )
                        }
                        className={`rounded-xl border px-4 py-3 shadow-sm outline-none transition-all ${
                            darkMode ? "border-slate-700 bg-slate-800 text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-900/40" : "border-gray-200 bg-white text-gray-700 focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
                        }`}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <button onClick={handleSave}
                    className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 tetx-sm font-semibold text-white shadow-md shadow-purple-300/40 transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-purple-400/30 active:translate-y-0 active:scale-95">
                        Save
                    </button>
                </div>
            ) : (
                <div className="flex items-start gap-4">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                            onToggleTask(task.id)
                        } className="mt-1 h-5 w-5 cursor-pointer accent-purple-600 transition-transform duration-200 hover:scale-110"
                    />

                    <div className="flex-1">
                        <p className={`text-lg font-semibold transition-all duration-300 ${task.completed ? "text-gray-400 line-through opacity-60" : darkMode ? "text-gray-200" : "text-gray-900"
                            }`}>{task.text}</p>

                        <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${task.priority === "high" ? darkMode ? "bg-red-950/60 text-red-400" : "bg-red-100 rwxt-red-700" : task.priority === "medium" ? darkMode ? "bg-yellow-950/60 text-yellow-400" :"bg-yellow-100 text-yellow-700" : darkMode ?  "bg-green-950/60 text-green-400" : "bg-green-100 text-green-700"
                            }`}
                        > {task.priority} priority </span>

                        {task.dueDate && ( 
                            <div className="mt-2">
                            <p className={`mt-2 text-sm font-medium ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                            📆 Due: {" "} {new Date(task.dueDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                        { !task.completed && getDueDateStatus() && ( <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${
                            getDueDateStatus().includes("Overdue") ? darkMode ? "bg-red-950/60 text-red-400" : "bg-red-100 text-red-700" 
                            : getDueDateStatus().includes("Today") ? darkMode ? "bg-orange-950/60 text-orange-400" : "bg-orange-100 text-orange-700" : darkMode ? "bg-yellow-950/60 text-yellow-400"
                            : "bg-yellow-100 text-yellow-700"
                                                   }`}>
                            {getDueDateStatus()}
                        </span>
                        )}
                        </div>
            )}

                    </div>

                    <div className="flex shrink-0 gap-2">
                        <button
                            onClick={() =>
                                onDeleteTask(task.id)} 
                            title="Delete task"
                            className={`flex h-9 w-9 items-center justify-center rounded-xl text-red-500 transition-all duration-200 hover:scale-110 ${
                                darkMode ? "hover:bg-red-950/50" : "hover:bg-red-50 hover:text-red-600"
                            }`} 
                        >
                            🗑️
                        </button>

                        <button
                            onClick={() =>
                                setIsEditing(true)} 
                            title="Edit task"
                            className={`flex h-9 w-9 items-center justify-center rounded-xl text-indigo-500 transition-all duration-200 hover:scale-110 ${
                                darkMode ? "hover:bg-indigo-950/50 hover:text-indigo-400" : "hover:bg-indigo-50 hover:text-indigo-600"
                            }`}
                        >
                            ✏️
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskItem;