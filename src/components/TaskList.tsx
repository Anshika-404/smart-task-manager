import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

type TaskListProps = {
    tasks: Task[];
    hasTasks: boolean;
    onToggleTask: (id: number) => void;
    onDeleteTask: (id: number) => void;
    onEditTask: (
        id: number,
        updatedText: string,
        updatedPriority: Task["priority"]
    ) => void;
};

function TaskList({ tasks, hasTasks, onToggleTask, onDeleteTask, onEditTask }: TaskListProps) {
    return (
        <div>

            {tasks.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-purple-200 bg-white/60 px-6 py-12 text-center shadow-lg backdrop-blur-md">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 text-3xl shadow-sm">
                        {hasTasks ? "🔍" : "🎯"}
                    </div>

                    {hasTasks ? (
                        <>
                        <h3 className="mt-5 text-xl fobt-bold text-gray-900">No matching tasks 🔍</h3>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
                            We couldn&apos;t find any tasks matching your current search or filter.
                        </p>
                        </>
                    ) : (
                        <>
                        <h3 className="mt-5 text-xl font-bold text-gray-900">No tasks yet!</h3>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-gray-500">Your workspace is waiting. Add your first task and start turning your plans into progress.</p>

                    <div className="mt-5 text-sm font-semibold text-purple-600">
                        ✨ Let&apos;s get started
                    </div>
                        </>
                    )}
                    
                </div>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleTask={onToggleTask}
                        onDeleteTask={onDeleteTask}
                        onEditTask={onEditTask}
                    />
                ))
            )}
        </div>
    );
}

export default TaskList;