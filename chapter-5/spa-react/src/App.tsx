import { useState } from "react";

function App() {
  // person
  const [ person, setPerson ] = useState<Person>(new Person('Aung Aung', 23));

  return (
    <div>
      <h1 className="font-bold text-[34px]">{person.greet()}</h1>
      <button className="w-[151px] h-[44px] bg-green-300 mr-3" onClick={() => { person.setName('Kyaw Kyaw', setPerson); }}>Change Name</button>
      <button className="w-[151px] h-[44px] bg-green-300" onClick={() => { person.setAge(25, setPerson); }}>Change Age</button>
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
