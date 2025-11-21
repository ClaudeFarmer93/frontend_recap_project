import {useEffect, useState} from "react";
import type {TodoProps} from "../types/TodoProps.ts";
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
    return (
        <>
            <AddTodoForm onAddTodo={addTodo} />
            {todos.length > 0 ? todos.map((todo) =>

                <Todo key={`${todo.id}`} id={todo.id} status={todo.status} description={todo.description}/>): <p>
                no todos found
            </p>}
        </>
    )
}