import Trip from './Trip';

class Trips {
	private _trips : Trip[];
	
	constructor (trips : Trip[]) {
		this._trips = trips;
	}

	get trips () : Trip [] {
		return this._trips;
	}

	setTrips (trips : Trip[], setState : React.Dispatch<React.SetStateAction<Trips>>) : void {
		setState(new Trips(trips));
	}
}

export default Trips;
