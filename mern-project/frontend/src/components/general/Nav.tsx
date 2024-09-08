import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import EnumRoutes from "../../types/EnumRoutes";
import axios from "../../utilities/axios";
import { AuthContext } from "../../contexts/AuthContext";
import EnumAuthReducerActionTypes from "../../types/EnumAuthReducerActionTypes";

export default function Nav() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
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
                {!authContext.user && (
                    <>
                        <li>
                            <NavLink to={EnumRoutes.Register} className="hover:text-brand">
                                Register
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={EnumRoutes.Login} className="hover:text-brand">
                                Login
                            </NavLink>
                        </li>
                    </>
                )}
                {!!authContext.user && (
                    <li>
                        <button onClick={logout} className="hover:text-brand">
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );

    function logout() {
        axios
            .post("/users/logout")
            .then(res => {
                authContext.dispatch({ type: EnumAuthReducerActionTypes.Logout });
                if (res.status === 200) navigate(EnumRoutes.Login);
            })
            .catch(e => {
                console.error(e);
            });
    }
}
