import { useState } from "react";
import type { NewTask } from "../types/task";

type TaskInputProps = {
    title: string;
    onAddTask: (task: NewTask) => void;
};
function TaskInput({title, onAddTask}: TaskInputProps) {
    const [taskText, setTaskText] = useState("");
    const [priority, setPriority] = useState("medium");

    return (
        <div className="relative overflow-hidden rounded-3xl border border-purple-200 bg-white p-7 shadow-2xl shadow-purple-200/60">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-100 blur-3xl"></div>
            <div className="mb-6 flex items-center gap">
            <div className="mb-6" >
                <h2 className="text-xl font-extrabold tracking-tight text-gray-900">{title}</h2>

                <div className="mt-2 h-1 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                <p className="mt-0.5 text-xs font-medium text-gray-400">What do you want to accomplish?</p>
            </div>
            </div>


            <input
            type="text"
            placeholder="Enter your task"
            onChange={(event) => setTaskText(event.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50/80 px-5 py-4 text-gray-900 shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400
             focus:-translate-y-0.5 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100 focus:shadow-lg"
            />
            

            <label className="mt-4 mb-2 block text-sm font-semibold text-gray-700">Priority</label>
            <select 
                value={priority} 
                onChange={(event) => setPriority(event.target.value)}
                className="mt-4 w-full cursor-pointer appearance-none rounded-2xl border border-gray-200 bg-gray-50/80 px-5 py-4 text-gray-700 shadow-sm outline-none transition-all duration-300 hover:border-purple-300 focus:-translate-y-0.5 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100 focus:shadow-lg"
                >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <button onClick={() => {
                const newTask: NewTask = {
                    text: taskText,
                    priority: priority,
                };

                onAddTask(newTask);
            }} className="mt-4 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3.5 font-semibold text-white
               shadow-lg shadow-purple-200 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl active:translate-y-0 active:scale-[0.99]">
                Add Task
            </button>
        </div>
    );
}

export default TaskInput;