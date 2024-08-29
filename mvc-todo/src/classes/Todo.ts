import React from "react";
import apiPrefix from "../utilities/apiPrefix";
class Todo {
	private _id : string;
	private _title : string;
	private _completed : boolean;
	 
	constructor (id : string, title : string, completed : boolean) {
		this._id = id;
		this._title = title;
		this._completed = completed;
	}

	get id () : string {
		return this._id;
	}

	get title () : string {
		return this._title;
	}

	get completed () : boolean {
		return this._completed;
	}
	
	setId(id : string, setState : React.Dispatch<React.SetStateAction<Todo>>) : void {
		setState((prev : Todo) => new Todo(id, prev.title, prev.completed));
	}

	setTitle(title : string, setState : React.Dispatch<React.SetStateAction<Todo>>) : void {
		setState((prev : Todo) => new Todo(prev.id, title, prev.completed));
	}

	setCompleted(completed : boolean , setState : React.Dispatch<React.SetStateAction<Todo>>) : void {
		setState((prev : Todo) => new Todo(prev.id, prev.title, completed));
	}

	updateTodo(todo : Todo , setState : React.Dispatch<React.SetStateAction<Todo>>) : void {
		fetch(`${apiPrefix}/todos/${todo.id}`, {
			method : "PATCH", 
			headers : {
				'Content-Type' : 'application/json'
			}, 
			body : JSON.stringify({ id : todo.id, title : todo.title, completed : todo.completed })
		}).then(() => {
			setState(todo);
		}).catch(error => {
			console.error(error);
			alert("Error Updating Todo");
		});
	}
}

export default Todo;
