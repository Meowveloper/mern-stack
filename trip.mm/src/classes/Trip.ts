class Trip {
	private _id : number;
	private _name : string;
	private _price : number;
	private _location : string;

	constructor (id : number, name : string, price : number , location : string) {
		this._id = id;
		this._name = name;
		this._price = price;
		this._location = location;
	}

	get name () : string {
		return this._name;
	}
	get price () : number {
		return this._price;
	}

	get id () : number {
		return this._id;
	}
	
	get location () : string {
		return this._location;
	}

	setId (id : number , setState : React.Dispatch<React.SetStateAction<Trip>>) : void {
		setState((prev : Trip) => new Trip(id, prev.name, prev.price, prev.location));
	}

	setName (name : string, setState : React.Dispatch<React.SetStateAction<Trip>>) : void {
		setState((prev : Trip) => new Trip(prev.id, name, prev.price, prev.location));
	}

	setPrice (price : number, setState : React.Dispatch<React.SetStateAction<Trip>>) :void {
		setState((prev : Trip) => new Trip(prev.id, prev.name, price, prev.location));
	}

	setLocation (location : string, setState : React.Dispatch<React.SetStateAction<Trip>>) : void {
		setState((prev : Trip) => new Trip(prev.id, prev.name, prev.price, location));
	}

	setTrip (trip : Trip, setState : React.Dispatch<React.SetStateAction<Trip>>) : void {
		setState(trip);
	}
}

export default Trip;
