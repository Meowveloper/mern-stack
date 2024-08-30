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
}

export default Todo;
