import { useState } from "react";
import type { NewTask } from "../types/task";

type TaskInputProps = {
    title: string;
    onAddTask: (task: NewTask) => void;
    darkMode: boolean;
};
function TaskInput({title, onAddTask, darkMode}: TaskInputProps) {
    const [taskText, setTaskText] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");

    return (
        <div className={`relative overflow-hidden rounded-3xl border p-7 shadow-2xl transition-all duration-500 ${
            darkMode ? "border-purple-800/50 bg-slate-900 shadow-purple-950/40" : "border-purple-200 bg-white shadow-purple-200/60"}`}
            >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-100 blur-3xl"></div>
            <div className="mb-6 flex items-center gap">
            <div className="mb-6" >
                <h2 className={`text-xl font-extrabold tracking-tight transition-colors duration-500 ${
                    darkMode ? "text-white" : "text-gray-900"}`}
                    >{title}</h2>

                <div className="mt-2 h-1 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                <p className={`mt-2 text-sm font-medium transition-colors duration-500 ${
                    darkMode ? "text-gray-400" : "text-gray-400" }`}
                    >What do you want to accomplish?</p>
            </div>
            </div>

            <input
            type="text"
            value={taskText}
            placeholder="Enter your task"
            onChange={(event) => setTaskText(event.target.value)}
            onKeyDown={(event) => {
                if (event.key === "Enter" && taskText.trim()) {
                    const newTask: NewTask = {
                        text: taskText,
                        priority: priority,
                        dueDate: dueDate,
                    };
                    onAddTask(newTask);
                    setTaskText("");
                    setPriority("medium");
                    setDueDate("");
                }
            }}
            className={`w-full rounded-2xl border px-5 py-4 text-gray-900 shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:-translate-y-0.5 focus:ring-4 ${
                darkMode ? "border-slate-700 bg-slate-800 text-white focus:border-purple-500 focus:ring-purple-900/40" : "border-gray-200 bg-gray-50/80 focus:border-purple-400 focus:bg-white focus:ring-purple-100"
             }`}/>
            
            <label className={`mt-4 mb-2 block text-sm font-semibold transition-colors duration-500 ${
                darkMode ? "text-gray-300" : "text-gray-700"}`}
                >Priority</label>
            <select 
                value={priority} 
                onChange={(event) => setPriority(event.target.value)}
                className={`mt-4 w-full cursor-pointer appearance-none rounded-2xl border px-5 py-4 shadow-sm outline-none transition-all duration-300 focus:-translate-y-0.5 focus:ring-4 ${
                    darkMode ? "border-slate-700 bg-slate-800 text-white focus:border-purple-500 focus:ring-purple-900/40" : "border-gray-200 bg-gray-50/80 text-gray-700 hover:border-purple-300 focus:border-purple-400 focus:bg-white focus:ring-purple-100"}`}
                >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <label className={`mt-4 mb-2 block text-sm font-semibold ${
                darkMode ? "text-gray-300" : "text-gry-700"
            }`}>Due Date</label>

            <input 
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className={`w-full rounded-2xl border px-5 py-4 shadow-sm outline-none transition-all duration-300 focus:-translate-y-0.5 focus:ring-4 ${
                darkMode ? "border-slate-700 bg-slate-800 text-white focus:border-purple-500 focus:ring-purple-900/40" : "border-gray-200 bg-gray-50/80 text-gray-700 focus:border-purple-400 focus:bg-white focus:ring-purple-100"
            }`}/>

            <button onClick={() => {
                if (!taskText.trim()) {
                    return;
                }

                const newTask: NewTask = {
                    text: taskText,
                    priority: priority,
                    dueDate: dueDate,
                };
                onAddTask(newTask);
                setTaskText("");
                setPriority("medium");
                setDueDate("");
            }} className="mt-4 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3.5 font-semibold text-white
               shadow-lg shadow-purple-200 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl active:translate-y-0 active:scale-[0.99]">
                Add Task
            </button>

        </div>
    );
}

export default TaskInput;