import { useState } from "react";
import Counter from "./components/Counter";

function App() {
  // person
  const [ person, setPerson ] = useState<Person>(new Person('Aung Aung', 23));
  const [ posts, setPosts ] = useState<Posts>(new Posts( [ new Post(1, 'Post 1'), new Post(2, 'Post 2'), new Post(3, 'Post 3') ] ));

  return (
    <div>
      <h1 className="font-bold text-[34px]">{person.greet()}</h1>
      <button className="w-[151px] h-[44px] bg-green-300 mr-3" onClick={() => { person.setName('Kyaw Kyaw', setPerson); }}>Change Name</button>
      <button className="w-[151px] h-[44px] bg-green-300" onClick={() => { person.setAge(25, setPerson); }}>Change Age</button>

      <h1 className="font-bold text-[34px]">Posts</h1>
      <ul>
        {
          !!posts.posts.length && posts.posts.map((item : Post) => {
            return (
              <li className="mb-3" key={item.id}>
                {item.title}
                <button onClick={ () => { posts.deletePost(item.id, setPosts); } } className="ms-3 px-4 py-2 bg-red-500">Delete</button>
              </li>
            )
          })
        } 
        {
          !!!posts.posts.length && <li>No Posts Available...</li>
        }
      </ul>

      <Counter></Counter>
    </div>
  );
}

export default App;

class Person {
  private _name : string;
  private _age : number;
  constructor(name : string, age : number) {
    this._name = name;
    this._age = age;
  }

  get name () : string {
    return this._name;
  }

  setName (newName : string, setState : React.Dispatch<React.SetStateAction<Person>>) {
    const updatedPerson = new Person(newName, this._age);
    setState(updatedPerson);
  }

  get age () : number {
    return this._age;
  }

  setAge (newAge: number, setState : React.Dispatch<React.SetStateAction<Person>>) {
    const updatedPerson = new Person (this._name, newAge);
    setState(updatedPerson);
  }

  greet() : string {
    return `Hello, ${this._name} with the age of ${this._age}`;
  }
}

class Post {
  private _id;
  private _title;
  constructor (id : number, title : string) {
    this._id = id;
    this._title = title;
  }

  get id () : number {
    return this._id;
  }

  get title() : string {
    return this._title;
  }
}

class Posts {
  private _posts : Post[];
  constructor (posts : Post[]) {
    this._posts = posts;
  }

  get posts () : Array<Post> {
    return this._posts;
  }

  deletePost(id : number, setState : React.Dispatch<React.SetStateAction<Posts>>) : void {
    setState((prevPosts: Posts) => new Posts(prevPosts.posts.filter((item : Post) => item.id !== id)));
  }
}
