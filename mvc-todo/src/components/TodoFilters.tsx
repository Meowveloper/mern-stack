import React from "react";

export default function TodoFilters () {
	return (
		<div>
			<button className="text-[10px] text-gray-400 border-gray-400 me-2 border border-gray-400 px-1 rounded-[4px]">All</button>
			<button className="text-[10px] text-gray-400 border-gray-400 me-2 border border-gray-400 px-1 rounded-[4px]">Active</button>
			<button className="text-[10px] text-gray-400 border-gray-400 me-2 border border-gray-400 px-1 rounded-[4px]">Completed</button>
		</div>
	);
}
