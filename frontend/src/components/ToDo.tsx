import type {TodoProps} from "../types/TodoProps.ts";


export default function Todo({id, description, status, onProgress, onEdit}: TodoProps) {


    return (
        <>
            <div style={{border:"solid", borderRadius:"5px"}}>
                <h3>{description}</h3>
                <p>{status}</p>
                <button
                    style={{ padding: "6px 12px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer"}}
                    onClick={() => onEdit(id)}>Edit</button>

                <button style={{ padding: "6px 12px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    color: status === "DONE" ? '#FF5733' : '#2ecc71'}}
                        onClick={() => onProgress(id)}>
                    {status === "DONE" ? "Delete" : "Progress"}
                </button>

            </div>
        </>
    )
}