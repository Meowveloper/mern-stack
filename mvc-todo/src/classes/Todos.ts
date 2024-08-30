import Todo from "./Todo";
import apiPrefix from "../utilities/apiPrefix";
class Todos {
    private _todos: Todo[];

    constructor(todos: Todo[]) {
        this._todos = todos;
    }

    get todos(): Todo[] {
        return this._todos;
    }

    setTodos(todos: Todo[], setState: React.Dispatch<React.SetStateAction<Todos>>): void {
        setState(new Todos(todos));
    }

    async addTodos(todo: Todo, setState: React.Dispatch<React.SetStateAction<Todos>>, url: string | null = null): Promise<void> {
        if (!!url) {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: todo.id, title: todo.title, completed: todo.completed }),
                });

                if (!response.ok) {
                    throw new Error("Failed to add todo");
                }

                setState((prev: Todos) => new Todos([...prev.todos, new Todo(todo.id, todo.title, todo.completed)]));
                console.log("added", this._todos, todo);
            } catch {
                alert("error adding todo");
            }
        } else {
            alert("Error Adding Todos, missing url");
            return;
        }
    }

    deleteTodos(id: string, setState: React.Dispatch<React.SetStateAction<Todos>>, url: string | null = null): void {
        if (!!url) {
            fetch(url, { method: "DELETE" })
                .then(res => {
                    setState((prev: Todos) => {
                        const todos = [...prev.todos.filter((item: Todo) => item.id !== id)];
                        return new Todos(todos);
                    });
                })
                .catch(error => {
                    console.error(error);
                    alert("Error Deleting Todo");
                });
        } else {
            alert("Error deleting todo, missing url");
        }
    }

    updateTodos(todo: Todo, setState: React.Dispatch<React.SetStateAction<Todos>>): void {
        fetch(`${apiPrefix}/todos/${todo.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        }).then(() => {
            setState((prev: Todos) => {
                const todos = prev.todos.map((item: Todo) => {
                    if (item.id === todo.id) return todo;
                    else return item;
                });
                return new Todos(todos);
            });
        });
    }

    countRemaining(): number {
        return [...this._todos].filter((item: Todo) => !item.completed).length;
    }

    checkAll(setState: React.Dispatch<React.SetStateAction<Todos>>): void {
        const newTodos: Todo[] = this._todos.map((item: Todo) => ({ ...item, completed: true } as Todo));
        newTodos.forEach((item: Todo) => {
            fetch(`${apiPrefix}/todos/${item.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
            });
        });
        setState((prev: Todos) => {
            const todos = prev.todos.map((item: Todo) => ({ ...item, completed: true }));
            return new Todos(todos as Todo[]);
        });
    }
    clearCompleted(setState: React.Dispatch<React.SetStateAction<Todos>>): void {
        let todos = this._todos.filter((item: Todo) => item.completed);
        try {
            todos.forEach((item: Todo) => {
                fetch(`${apiPrefix}/todos/${item.id}`, { method: "DELETE" });
            });
            todos = this._todos.filter((item: Todo) => !item.completed);
        } catch {
            console.error("Error clearing TODOS");
            alert("Error clearing TODOS");
            todos = this._todos;
        } finally {
            console.log("here");
            setState(() => new Todos(todos));
        }
    }
}

export default Todos;
