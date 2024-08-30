import React from "react";
import Todos from "../classes/Todos";
interface Props {
	todos : Todos;
	setTodos : React.Dispatch<React.SetStateAction<Todos>>
}
export default function ClearCompletedBtn (props : Props) {
	return (
		<div>
			<button onClick={() => { props.todos.clearCompleted(props.setTodos) }} className="text-black border border-black rounded-[4px] cursor-pointer px-2 py-1">
				Clear Completed
			</button>
		</div>
	);
}
