import React, { useState, KeyboardEvent } from 'react';
import Todo from "../classes/Todo";
interface Props {
	item : Todo;
	deleteTodo : Function;
}
export default function SingleTodo (props : Props) {
const [ isEdit, setIsEdit ] = useState<boolean>(false);
const [ todo, setTodo ] = useState<Todo>(new Todo(props.item.id, props.item.title, props.item.completed));
function updateTodo(e : KeyboardEvent) {
	if(e.key === 'Enter') {
		todo.updateTodo(todo, setTodo);
		setIsEdit(false);
}
}
return (
	<div className="me-1 flex justify-between items-center">
		<div>
			<input type="checkbox" className="me-2"/>
			{ !isEdit && <span onDoubleClick={ () => { setIsEdit(true); } } className={todo.completed ? 'line-through' : ''}>{ todo.title }</span> }
			{ isEdit &&
				<input
					onInput={ (e) => { todo.setTitle((e.target as HTMLInputElement).value, setTodo); } }
					type="text"
					value={todo.title}
					className="border border-gray-400 outline-none rounded-[3px] px-1 py-1"
					onKeyDown={ updateTodo }
				/>
			}
		</div>
		<div onClick={ () => { props.deleteTodo(todo.id); } } className="text-[20px] cursor-pointer">x</div>
	</div>

	);
}
