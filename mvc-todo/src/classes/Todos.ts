import Todo from './Todo';
class Todos {
	private _todos : Todo[];

	constructor (todos : Todo[]) {
		this._todos = todos;
	}

	get todos () : Todo[] {
		return this._todos;
	}

	setTodos (todos : Todo[] , setState : React.Dispatch<React.SetStateAction<Todos>>) : void {
		setState(new Todos(todos));
	}

	addTodos (todo : Todo, setState : React.Dispatch<React.SetStateAction<Todos>> , url : string | null = null) : void {
		if(!!url) {
			fetch(url, {
				method : "POST", 
				headers : {
					'Content-Type' : 'application/json'
				}, 
				body : JSON.stringify({ id : todo.id, title : todo.title, completed : todo.completed })
			}).then(res => {
				setState((prev : Todos) => new Todos([...prev.todos, todo]));
			}).catch(err => {
				console.error(err);
				alert("Error adding todo");
				}
			);
		} else {
			alert("Error Adding Todos, missing url");
			return;
		}
	}

	deleteTodos (id : string, setState : React.Dispatch<React.SetStateAction<Todos>> , url : string | null = null) : void {
		if(!!url) {
			fetch(url, { method : "DELETE" }).then(res => {
				setState((prev : Todos) => {
					const todos = [...prev.todos.filter((item : Todo) => item.id !== id)];
					return new Todos(todos);
				});
			}).catch(error => { console.error(error); alert("Error Deleting Todo"); })
		} else {
			alert("Error deleting todo, missing url");
		}
		
	}
}

export default Todos;
