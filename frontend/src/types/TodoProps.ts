export type TodoProps = {
    id: string,
    description: string,
    status: TodoStatus
    onProgress:(id: string) =>void,
    onEdit:(id: string) => void
}

export type TodoStatus = "OPEN" | "IN_PROGRESS" | "DONE";