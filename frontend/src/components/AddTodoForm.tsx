import {type FormEvent, useState} from "react";

export type AddToDoProps = {
    onAddTodo: (description:string) => void,

}
export default function AddTodoForm({onAddTodo}: AddToDoProps) {
const [description, setDescription] = useState<string>("");

function handleAddTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("addSuccess");
    onAddTodo(description.trim());
    setDescription("");


}
    return (
        <>
            <form onSubmit={(e) => {
                handleAddTodo(e)
            }}>
                <input value={description} onChange={(e)=> {
                    setDescription(e.target.value)
                }}/>
                <button disabled={!description.trim()} type={"submit"}>Add</button>
            </form>
        </>
    )
}