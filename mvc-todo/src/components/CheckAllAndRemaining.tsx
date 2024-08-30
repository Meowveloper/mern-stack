import React from 'react';
import Todos from "../classes/Todos";
import Todo from "../classes/Todo";
interface Props {
	todos : Todos;
	setTodos : React.Dispatch<React.SetStateAction<Todos>>;
}
export default function CheckAllAndRemaining (props : Props) {
	return (
		<div className="flex justify-between items-center">
			<button onClick={ () => { props.todos.checkAll(props.setTodos); } } className="text-[12px] text-gray-400 border border-gray-400 rounded-[5px] cursor-pointer px-4 py-1">Check All</button>
			<div>{ props.todos.countRemaining() } remaining</div>
		</div>
	);
}
