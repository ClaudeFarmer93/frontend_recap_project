import {type FormEvent, useState} from "react";

export type AddToDoProps = {
    onAddTodo: (description:string) => void,

}
export default function AddTodoForm({onAddTodo}: AddToDoProps) {
const [description, setDescription] = useState<string>("");

function handleAddTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("addSuccess");
    onAddTodo(description);
    setDescription("");


}
    return (
        <>
            <form onSubmit={(e) => {
                handleAddTodo(e)
            }}>
                <input onChange={(e)=> {
                    setDescription(e.target.value)
                }}/>
                <button type={"submit"}>Add</button>
            </form>
        </>
    )
}