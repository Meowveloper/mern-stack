import React from 'react';
import Todos from "../classes/Todos";
import Todo from "../classes/Todo";
import apiPrefix from "../utilities/apiPrefix";
import SingleTodo from "./Todo";
interface Props {
	todos : Todos, 
	setTodos : React.Dispatch<React.SetStateAction<Todos>>
}
export default function TodoList (props : Props) {
	function deleteTodo (id : string) {
		props.todos.deleteTodos(id, props.setTodos, `${apiPrefix}/todos/${id}`);
	}
	return (
		<div className="mt-3">
		{ !!props.todos.todos.length && props.todos.todos.map((item : Todo) => (
				<SingleTodo key={item.id} item={ item } deleteTodo={ deleteTodo }></SingleTodo>
			)
		)}
		</div>
	);
}
