import { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import type { Task, NewTask } from "./types/task";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const [search, setSearch] = useState("");

  const [smartSort, setSmartSort] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
        return savedTheme === "true";
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  function handleAddTask(newTask: NewTask) {
    const task: Task = {
      id: Date.now(),
      text: newTask.text,
      priority: newTask.priority,
      completed: false,
      dueDate: newTask.dueDate,
    };
    setTasks([...tasks, task]);
  }

  function handleToggleTask(id: number) {
    setTasks(
      tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDeleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleEditTask(
    id: number,
    updatedText: string,
    updatedPriority: Task["priority"]
  ) {
    setTasks(
      tasks.map((task) => task.id === id ? {
        ...task,
        text: updatedText,
        priority: updatedPriority,
      }
        : task
      )
    );
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" ? true : filter === "active" ? !task.completed : task.completed;

    const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch
  }).sort((a,b) => {
    if (!smartSort) return 0;

    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
  
  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };
  return priorityOrder[a.priority] - priorityOrder[b.priority];
});

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const totalTasks = tasks.length;

  const pendingCount = totalTasks - completedCount;

  const progress = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
    darkMode ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900" : "bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100"}`}
    >
      <div className="pointer-events-none absolute left-10 top-20 h-40 w-40 rounded-full bg-purple-300/20 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-20 right-10 h-48 w-48 rounded-full bg-indigo-300/20 blur-3xl"></div>
      
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="relative mb-10 text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purpke-50 px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm">
            <span className="h-2 w-2 aniamte-pulse rounded-full bg-purple-500"></span>
            Stay focused • Get things done
          </div>
          
        <div className="mb-5 flex justify-end">
          <button onClick={() =>
            setDarkMode(!darkMode)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${
              darkMode ? "border-purpke-700/50 bg-slate-900/80 text-gray-200 shadow-purple-950/30 hover:bg-slate-800" : "border-white/60 bg-white/80 text-gray-700 shadow-purple-200/50 hover:bg-white"
            }`}>
              {darkMode ? "🔆Light" : "🌙 Dark"}
            </button>
        </div>

          <h1 className="bg-gradient-to-r from-purplr-600 via-indigo-600 to-blue-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            Smart Task Manager ✨
          </h1>

          <p className={`mx-auto mt-4 max-w-xl text-base leading-relaxed transition-colors duration-500 sm:text-lg ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            Organize your day, prioritize what matters, and turn your
            <span className="font-semibold text-purple-600"> plans into progress.</span>
          </p>
        </div>
        <div className="mt-8">
          <TaskInput
            title="Add a Task"
            onAddTask={handleAddTask}
            darkMode={darkMode}
          />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className={`group rounded-2xl border p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
            darkMode ? "border-slate-700/50 bg-slate-900/80" : "border-white/40 bg-white/70"}`}
            >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-xl shadow-lg shadow-purple-200">🗒️
              </div>

              <span className={`text-xs font-semibold uppercase tracking-wider ${
                darkMode ? "text-gray-200" : "text-gray-400"
              }`}>Overview</span>
            </div>

            <p className={`mt-5 text-sm font-medium transition-colors duration-500 ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}>Total Tasks</p>

            <div className="mt-1 flex items-end gap-2">
              <p className={`text-4xl font-extrabold tracking-tight transition-colors duration-500 ${
                darkMode ? "text-white" : "text-gray-900"}`}
                >{totalTasks}</p>
              <span className="mb-1 text-sm font-medium text-gray-400">tasks</span>
            </div>

            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-purple-100">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
            </div>
          </div>

          <div className={`group rounded-2xl border p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
            darkMode ? "border-slate-700/50 bg-slate-900/80" : "border-white/40 bg-white/70"}`}>
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-t0-br from-emerald-400 to-green-600 text-xl shadow-lg shadow-green-200">✅</div>

              <span className="text-xs font-semibold uppercase tracking-wider text-green-500">Success</span>
            </div>

            <p className={`mt-5 text-sm font-medium transition-colors duration-500 ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}>Completed</p>

            <div className="mt-1 flex items-end gap-2">
              <p className="text-4xl font-extrabold tracking-tight text-green-400">{completedCount}</p>

              <span className="mb-1 text-sm font-medium text-gray-400">done</span>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-green-100">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-500" style={{
                width: `${progress}%`,
              }}></div>
            </div>
          </div>


          <div className={`group rounded-2xl border p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
            darkMode ? "border-slate-700/50 bg-slate-900/80" : "border-white/40 bg-white/70"}`}>
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-xl shadow-lg shadow-purple-200 ">⌛</div>

              <span className="text-xs font-semibold uppercase tracking-wider text-purple-500">In Progress</span>
            </div>

            <p className={`mt-5 text-sm font-medium transition-colors duration-500 ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}>Pending</p>

            <div className="mt-1 flex items-end gap-2">
              <p className={`text-4xl font-extrabold tracking-tight transition-colors duration-500 ${
                darkMode ? "text-purple-300" : "text-purple-600"
              }`}>{pendingCount}</p>

              <span className="mt-1 text-sm font-medium text-gray-400">remaining</span>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-purple-100">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500" style={{ width: `${totalTasks === 0 ? 0 : (pendingCount / totalTasks) * 100}%`, }}></div>
          </div>
        </div>
</div>

        <div className={`mt-6 rounded-2xl border p-5 shadow-lg backdrop-blur-md transition-all duration-500 ${
          darkMode ? "border-slate-700/50 bg-slate-900/80" : "border-white/90 bg-white/70"
        }`}>
          <div className="mb-2 flex items-center justify-between">
            <p className={`text-lg font-bold transition-colors duration-500 ${
              darkMode ? "text-gray-200" : "text-gray-900"
            }`}> Your Progress</p>

            <span className={`text-sm font-semibold transition-colors duration-500 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>{progress}%</span>
          </div>
        
          <div className="h-3 overflow-hidden rounded-full bg-gray-200">
            <div className="h-3 rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 transition-all duration-500" style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="relative mt-6">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search your tasks.."
              className={`w-full rounded-2xl border px-5 py-4 pr-12 shadow-lg outline-none backdrop-blur-md transition-all duration-300 placeholder:text-gray-400 focus:-translate-y-0.5 focus:ring-4 ${
                darkMode ? "border-slate-700 bg-slate-900/80 text-white focus:border-purple-500 focus:ring-purple-900/40" : "border-white/40 bg-white/70 text-gray-900 focus:border-purple-400 focus:ring-purple-100"
              }`}/>
              
              {search && (
                <button onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg px2 py-1 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-700" 
                title="Clear Search">
                  ×
                </button>
              )}
          </div>

          <div className={`mt-8 flex justify-center gap-2 rounded-2xl border p-2 shadow-lg backdrop-blur-md transition-all duration-500 ${
            darkMode ? "border-slate-700/50 bg-slate-900/80" : "border-white/40 bg-white/60"
          }`}>
            <button onClick={() =>
              setFilter("all")}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${filter === "all" ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md" : darkMode ? "text-gray-300 hover:bg-slate-800" : "text-gray-600 hover:bg-gray-100"}`}
            >All</button>

            <button onClick={() =>
              setFilter("active")}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${filter === "active" ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md" : darkMode ? "text-gray-300 hover:bg-slate-800" : "text-gray-600 hover:bg-gray-100"
                }`}>Active</button>

            <button onClick={() =>
              setFilter("completed")}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${filter === "completed" ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md" : darkMode ? "text-gray-300 hover:bg-slate-800" : "text-gray-600 hover:bg-gray-100"
                }`}>Completed </button>

            <button onClick={() => setSmartSort(!smartSort)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                smartSort ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md" : darkMode ? "text-gray-300 hover:bg-slate-800" : "text-gray-600 hover:bg-gray-100"
              }`}>✨ Smart Sort </button>
          </div>

          <div className="mb-4 mt-8 flex items-center justify-between">
            <div >
            <h2 className={`text-xl font-bold transition-colors duration-500 ${
              darkMode ? "text-gray-500" : "text-gray-900"
            }`}>
               Your Tasks
            </h2>
            <p className={`mt-1 text-sm transition-colors duration-500 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              Stay organized and keep moving forward.
            </p>
            </div>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
              {filteredTasks.length} shown
            </span>
          </div>

          <TaskList
            tasks={filteredTasks}
            hasTasks={tasks.length > 0}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            darkMode={darkMode}
          />

        </div>
      </div>
    </div>
  );
}

export default App;