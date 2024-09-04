import React from "react";
import { NavLink } from "react-router-dom";
import EnumRoutes from "../../types/EnumRoutes";

export default function Nav() {
    return (
        <nav className="flex justify-between p-5 items-center">
            <div className="text-logo text-brand font-bold">Recipicity</div>
            <ul className="flex space-x-7">
                <li>
                    <NavLink to={EnumRoutes.Home} className="hover:text-brand">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={EnumRoutes.About} className="hover:text-brand">
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink to={EnumRoutes.Contact} className="hover:text-brand">
                        Contact
                    </NavLink>
                </li>
                <li>
                    <NavLink to={EnumRoutes.RecipeCreate} className="hover:text-brand">
                        Recipe Create
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
