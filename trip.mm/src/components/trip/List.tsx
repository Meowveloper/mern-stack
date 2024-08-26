import apiPrefix from '../../data/apiPrefix';
import React, { useEffect, useState } from 'react';
import Trips from '../../classes/Trips';
import Trip from '../../classes/Trip';
export default function TripList() {
	const [ trips, setTrips ] = useState(new Trips({} as Trip[]));	

	useEffect(function () {

		fetch(`${apiPrefix}/trips`).then(res => {

			return res.json();

		}).then(res => {

			trips.setTrips(res as Trip[], setTrips);

		});

	}, []);

	return (
		<div>
			<div className="font-bold text-[30px]">Ready to Go</div>

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
