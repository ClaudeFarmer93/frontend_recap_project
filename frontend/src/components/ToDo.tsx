import type {TodoProps} from "../types/TodoProps.ts";


export default function Todo({ description, status}:TodoProps) {

    return (
        <>
            <div>
                <h2>{description}</h2>
                <h3>{status}</h3>
                <button>Progress</button>
                <button>Edit</button>
            </div>
            </>
    )
}