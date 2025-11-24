import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {TodoProps, TodoStatus} from "../types/TodoProps.ts";
import axios from "axios";

export default function TodoDetailsPage() {
const [todo, setTodo] = useState<TodoProps>();
const {id} = useParams();
const navigate = useNavigate();

const statusOptions: TodoStatus[] = ["OPEN" , "IN_PROGRESS" ,"DONE"];

    useEffect(() => {
        axios.get(`/api/todo/${id}`)
            .then(res => setTodo(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if(!todo) {
        return <p>Loading..</p>
    }

    function handleDescriptionChange(value: string) {
        setTodo(prev => prev ? {...prev, description: value} : prev)

    }
    function handleStatusChange(value: TodoStatus) {
        setTodo(prev => prev ? {...prev, status: value}: prev);
    }

    function handleCancel() {
        navigate("/");
    }

    function handleSave() {
        axios.put(`/api/todo/${id}/update`, todo)
            .then(() => navigate("/"))
            .catch(err => console.log(err)

        )
    }

    return (
        <>
            <h2>Edit Todo</h2>
            <div>
              <label> Description
              </label>
                  <input name={todo.description} value={todo.description} onChange={(e) => handleDescriptionChange(e.target.value)}/>
            </div>
            <div>

            <select value={todo.status} onChange={(e) => handleStatusChange( e.target.value as TodoStatus)}>
                {statusOptions.map((status ) =>
                <option key={status} value={status}>
                    {status}
                </option>) }
            </select>
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </>
    )
}