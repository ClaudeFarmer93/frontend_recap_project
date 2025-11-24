import {useEffect, useState} from "react";
import type {TodoProps, TodoStatus} from "../types/TodoProps.ts";
import Todo from "../components/ToDo.tsx";
import axios from "axios";
import AddTodoForm from "../components/AddTodoForm.tsx";
import {useNavigate} from "react-router-dom";

export default function TodoViewPage() {
    const [todos, setTodos] = useState<TodoProps[]>([]);
    const navigate = useNavigate();

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

    function handleupdateStatus(id:string) {
        const todo = todos.find((todo) => todo.id === id);
        let newStatus = "DONE";
        if(!todo) {return}

        if(todo.status === "OPEN") {
            newStatus = "IN_PROGRESS";
        }
        else if(todo.status === "IN_PROGRESS") {
            newStatus = "DONE";
        }
        const updatedTodo = {...todo, status: newStatus};

        axios.put(`/api/todo/${todo.id}/update`,updatedTodo)
            .then(res => {
                const saved = res.data;
                setTodos(prev =>
                prev.map(t => t.id === id ? saved : t )
                );
                })
            .catch(err => console.log(err));
    }

    function handleEditClick(id:string) {
        navigate(`/todo/${id}`)
    }

    function handleDeleteClick(id: string) {

        axios.delete(`/api/todo/${id}`)
            .then(() => {
                setTodos(prev =>
                    prev.filter((prev => prev.id !== id)))
            console.log("todo deleted successfully");
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <AddTodoForm onAddTodo={addTodo} />
            <div style={{ display: 'flex', gap: '20px' }}>

            <div style={{ flex: 1, padding: '10px', border: '2px solid #FF5733', borderRadius: '5px' }}>
                <h2 style={{color: '#FF5733'}}>Open</h2>
                {groupedTodos.OPEN && groupedTodos.OPEN.map(todo => (
                    <Todo key={todo.id} {...todo}
                          onProgress={() =>handleupdateStatus(todo.id)}
                          onEdit={() =>handleEditClick(todo.id)}/>
                ))}
            </div>
            <div style={{ flex: 1, padding: '10px', border: '2px solid #337AFF', borderRadius: '5px' }} >
                <h2 style={{color:'#337AFF'}}>In Progess</h2>
                {groupedTodos.IN_PROGRESS && groupedTodos.IN_PROGRESS.map(todo => (
                    <Todo key={todo.id} {...todo}
                          onProgress={() =>handleupdateStatus(todo.id)}
                          onEdit={() =>handleEditClick(todo.id)}/>
                ))}
            </div>
            <div style={{ flex: 1, padding: '10px', border: '2px solid #2ecc71', borderRadius: '5px' }}>
                <h2 style={{color:'#2ecc71'}}>Done</h2>
                {groupedTodos.DONE && groupedTodos.DONE.map(todo => (
                    <Todo key={todo.id}  {...todo}
                          onProgress={() =>handleDeleteClick(todo.id)}
                          onEdit={() =>handleEditClick(todo.id)}/>
                ))}
            </div>
            </div>
        </>
    )
}