import React , { useEffect, useState } from 'react';
import './App.css';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining";
import TodoFilters from "./components/TodoFilters"; 
import ClearCompletedBtn from "./components/ClearCompletedBtn";
import Todos from "./classes/Todos";
import Todo from "./classes/Todo";
import apiPrefix from "./utilities/apiPrefix";
function App() {

const [ todos, setTodos ] = useState<Todos>(new Todos([] as Todo[]));

useEffect(function () {
	console.log("App.tsx check");
	fetch(`${apiPrefix}/todos`).then(res => res.json()).then((res) => {
		todos.setTodos(res as Todo[], setTodos);
	});
	// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (

	<div className="bg-gray-300 pt-5 min-w-[100vw] min-h-[100vh]">

		<div className="w-[50%] mx-auto rounded-sm shadow-sm bg-white p-4">

			<div className="text-[20px] font-bold">My Todo List</div>

			<TodoForm todos={ todos } setTodos={ setTodos }></TodoForm>

			<hr className="mt-3"/>

			<TodoList todos={todos} setTodos={ setTodos }></TodoList>

			<hr className="my-3"/>

			<CheckAllAndRemaining></CheckAllAndRemaining>

			<hr className="my-3"/>

			<div className="flex justify-between items-center">

				<TodoFilters></TodoFilters>
				<ClearCompletedBtn></ClearCompletedBtn>

			</div>

		</div>

	</div>

  );
}

export default App;
