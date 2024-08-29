import React from 'react';

export default function CheckAllAndRemaining () {
	return (
		<div className="flex justify-between items-center">
			<button className="text-[12px] text-gray-400 border border-gray-400 rounded-[5px] cursor-pointer px-4 py-1">Check All</button>
			<div>2 remaining</div>
		</div>
	);
}
