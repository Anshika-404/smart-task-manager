export type Task ={
    id: number;
    text: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
    dueDate: string;
};

export type NewTask = {
    text: string;
    priority: "low" | "medium" | "high";
    dueDate: string;
};