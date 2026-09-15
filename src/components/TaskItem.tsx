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
};

function TaskItem({
    task,
    onToggleTask,
    onDeleteTask,
    onEditTask
}: TaskItemProps) {

    const [isEditing, setIsEditing] = useState(false);

    const [editText, setEditText] = useState(task.text);

    const [editPriority, setEditPriority] =
        useState<Task["priority"]>(task.priority);

    const handleSave = () => {
        onEditTask(task.id, editText, editPriority);
        setIsEditing(false);
    };

    return (
        <div className={`group relative mb-4 overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-5 shadow-lg backdrop-blur-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl ${
            task.priority === "high" ? "before:bg-red-500" : task.priority === "medium" ? "before:bg-yellow-500" : "before:bg-green-500"
        } before:absolute before:left-0 before:top-0 before:h-full before:w-1
        `}>
            {isEditing ? (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                        value={editText}
                        onChange={(event) =>
                            setEditText(event.target.value)
                        } 
                        className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
                    />

                    <select
                        value={editPriority}
                        onChange={(event) =>
                            setEditPriority(
                                event.target.value as Task["priority"]
                            )
                        }
                        className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm outline-none transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <button onClick={handleSave}
                    className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 tetx-sm font-semibold text-white shadow-md shadow-purple-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">
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
                        } className="mt-1 h-5 w-5 cursor-pointer accent-purple-600"
                    />

                    <div className="flex-1">
                        <p className={`text-lg font-semibold transition-all duration-300 ${task.completed ? "text-gray-400 line-through opacity-60" : "text-gray-900"
                            }`}>{task.text}</p>

                        <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${task.priority === "high" ? "bg-red-100 text-red-700" : task.priority === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                            }`}
                        > {task.priority} priority </span>

                    </div>

                    <div className="flex shrink-0 gap-2">
                        <button
                            onClick={() =>
                                onDeleteTask(task.id)} 
                            title="Delete task"
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-red-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:scale-110" 
                        >
                            🗑️
                        </button>

                        <button
                            onClick={() =>
                                setIsEditing(true)} 
                            title="Edit task"
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-indigo-500 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 hover:scale-110"
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