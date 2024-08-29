import apiPrefix from '../../data/apiPrefix';
import React, { useEffect, useState , useCallback , useRef } from 'react';
import Trips from '../../classes/Trips';
import Trip from '../../classes/Trip';
enum Location {
	Myanmar = "Myanmar", 
	Thailand = "Thailand"
}
export default function TripList() {
	const [ trips, setTrips ] = useState<Trips>(new Trips([] as Trip[]));	
	const [ url, setUrl ] = useState<string>(`${apiPrefix}/trips`);
	const fetchTrips = useCallback(function () {

		console.log('useEffect Run');

		fetch(url).then(res => {

			return res.json();

		}).then(res => {

			trips.setTrips(res as Trip[], setTrips);

		});

	}, [url]);

	useEffect(function () {
		fetchTrips();	

	}, [fetchTrips]);

	return (
		<div>
			<div className="font-bold text-[30px]">Ready to Go</div>
			<div>
				<button className="border border-black me-2" onClick={() => { setUrl(`${apiPrefix}/trips`); }}>All</button>
				<button className="border border-black me-2" onClick={() => { setUrl(`${apiPrefix}/trips?location=${Location.Myanmar}`); }}>Trips in Myanmar</button>
				<button className="border border-black me-2" onClick={() => { setUrl(`${apiPrefix}/trips?location=${Location.Thailand}`); }}>Trips in Thailand</button>
			</div>
			{ !!trips.trips.length && trips.trips.map((item : Trip, i : number) => (
				<div key={item.id}>
					<div className="font-bold text-[20px]">
						{i + 1} - {item.name}
					</div>
					<div>
						{item.price}
						- MMK
					</div>
				</div>
			))};
		</div>
	);
}
