import React from "react";

interface Props {
    ingredients : string[];
}
export default function Ingredients({ ingredients } : Props) {
    return (
        <div>
            <span className="me-3">Ingredients -</span>
            {!!ingredients.length &&
                ingredients.map((item: string, i: number) => (
                    <span key={i} className="bg-brand text-small px-2 py-1 me-3 text-white rounded-button">
                        {item}
                    </span>
                )
            )}
        </div>
    );
}
