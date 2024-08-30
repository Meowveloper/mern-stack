import React, { useState, KeyboardEvent } from "react";
import Todo from "../classes/Todo";
interface Props {
    item: Todo;
    deleteTodo: (id: string) => void;
    updateTodo: (todo: Todo) => void;
}
export default function SingleTodo(props: Props) {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.item.title);
    function updateTodo(e: KeyboardEvent) {
        if (e.key === "Enter") {
            props.updateTodo({ id: props.item.id, title, completed: props.item.completed } as Todo);
            setIsEdit(false);
        }
    }
    return (
        <div className="me-1 flex justify-between items-center">
            <div>
                <input type="checkbox" className="me-2" />
                {!isEdit && (
                    <span
                        onDoubleClick={() => {
                            setIsEdit(true);
                        }}
                        className={props.item.completed ? "line-through" : ""}
                    >
                        {title}
                    </span>
                )}
                {isEdit && (
                    <input
                        onInput={e => {
                            setTitle((e.target as HTMLInputElement).value);
                        }}
                        type="text"
                        value={title}
                        className="border border-gray-400 outline-none rounded-[3px] px-1 py-1"
                        onKeyDown={updateTodo}
                    />
                )}
            </div>
            <div
                onClick={() => {
                    props.deleteTodo(props.item.id);
                }}
                className="text-[20px] cursor-pointer"
            >
                x
            </div>
        </div>
    );
}
