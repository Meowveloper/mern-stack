import React , { useState, FormEvent } from 'react';
import Todo from "../classes/Todo";
import Todos from "../classes/Todos";
import apiPrefix from "../utilities/apiPrefix";
interface Props {
	todos : Todos, 
	setTodos : React.Dispatch<React.SetStateAction<Todos>>
}
export default function TodoForm (props : Props) {
	const [ todo, setTodo ] = useState<Todo>(new Todo( `${new Date().getTime()}`, '', false));	

	function handleSubmit (e : FormEvent) {
		e.preventDefault();
		todo.setId(`${new Date().getTime()}`, setTodo);
		props.todos.addTodos(todo, props.setTodos, `${apiPrefix}/todos`);
		todo.setTitle('', setTodo);
	}

	return (
		<>
			<form onSubmit={ handleSubmit }>
				<input onInput={ (e) => { todo.setTitle((e.target as HTMLInputElement).value, setTodo); }} value={ todo.title } type="text" className="w-full border border-grey-200 p-2 rounded-sm outline-none"/>
			</form>
		</>
	);
}
