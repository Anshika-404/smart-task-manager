export type Task ={
    id: number;
    text: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
};

export type NewTask = {
    text: string;
    priority: "low" | "medium" | "high";
};