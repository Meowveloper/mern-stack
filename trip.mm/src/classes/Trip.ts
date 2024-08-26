class Trip {
	private _id : number;
	private _name : string;
	private _price : number;

	constructor (id : number, name : string, price : number ) {
		this._id = id;
		this._name = name;
		this._price = price;
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
	
	setId (id : number , setState : React.Dispatch<React.SetStateAction<Trip>>) : void {
		setState((prev : Trip) => new Trip(id, prev.name, prev.price));
	}

	setName (name : string, setState : React.Dispatch<React.SetStateAction<Trip>>) : void {
		setState((prev : Trip) => new Trip(prev.id, name, prev.price));
	}

	setPrice (price : number, setState : React.Dispatch<React.SetStateAction<Trip>>) :void {
		setState((prev : Trip) => new Trip(prev.id, prev.name, price));
	}

	setTrip (trip : Trip, setState : React.Dispatch<React.SetStateAction<Trip>>) : void {
		setState(trip);
	}
}

export default Trip;
