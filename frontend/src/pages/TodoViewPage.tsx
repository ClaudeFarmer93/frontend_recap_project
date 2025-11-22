import {useEffect, useState} from "react";
import type {TodoProps, TodoStatus} from "../types/TodoProps.ts";
import Todo from "../components/ToDo.tsx";
import axios from "axios";
import AddTodoForm from "../components/AddTodoForm.tsx";

export default function TodoViewPage() {
    const [todos, setTodos] = useState<TodoProps[]>([]);



    useEffect(() => {
        axios.get("/api/todo")
            .then((response) => {
                console.log("response", response)
                const result = response.data;
                setTodos(result);
            })
            .catch((error) => console.error(error))
    }, [])


    function addTodo(description:string) {
        const newTodo = {
            description: description,
            status: "OPEN",
        }
        axios.post("/api/todo", newTodo)
            .then((res) => {
        const savedTodo = res.data
            setTodos([...todos, savedTodo])})
            .catch((error) => console.error(error))
    }

    const groupedTodos = todos.reduce((acc: Record<TodoStatus, TodoProps[]>, todo: TodoProps) => {
        if(!acc[todo.status]) {
            acc[todo.status] = [];
        }
        acc[todo.status].push(todo);
        return acc;
    }, {} as Record<string, TodoProps[]>);
    return (
        <>
            <AddTodoForm onAddTodo={addTodo} />
            <div style={{ display: 'flex', gap: '20px' }}>

            <div style={{ flex: 1, padding: '10px', border: '2px solid #FF5733', borderRadius: '5px' }}>
                <h2>Open</h2>
                {groupedTodos.OPEN && groupedTodos.OPEN.map(todo => (
                    <Todo key={todo.id} {...todo}/>
                ))}
            </div>
            <div style={{ flex: 1, padding: '10px', border: '2px solid #337AFF', borderRadius: '5px' }} >
                <h2>In Progess</h2>
                {groupedTodos.IN_PROGRESS && groupedTodos.IN_PROGRESS.map(todo => (
                    <Todo key={todo.id} {...todo}/>
                ))}
            </div>
            <div style={{ flex: 1, padding: '10px', border: '2px solid #33FF57', borderRadius: '5px' }}>
                <h2>Done</h2>
                {groupedTodos.DONE && groupedTodos.DONE.map(todo => (
                    <Todo key={todo.id}  {...todo}/>
                ))}
            </div>
            </div>
        </>
    )
}