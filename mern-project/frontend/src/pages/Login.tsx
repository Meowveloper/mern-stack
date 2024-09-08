import React, { useState, FormEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utilities/axios";
import ILoginError from "../types/ILoginError";
import EnumRoutes from "../types/EnumRoutes";
import { AuthContext } from "../contexts/AuthContext";
import EnumAuthReducerActionTypes from "../types/EnumAuthReducerActionTypes";

export default function Login() {
    const [ email, setEmail ] = useState<string>('');
    const [ password , setPassword ] = useState<string>('');
    const [ errors, setErrors ] = useState<ILoginError | null>(null);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    return (
        <div className="w-full mx-auto max-w-xs">
            <form onSubmit={login} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="text-h1 text-brand font-bold text-center mb-4">Login</div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input onInput={ (e) => { setEmail((e.target as HTMLInputElement).value); } } value={email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input onInput={(e) => { setPassword((e.target as HTMLInputElement).value); }} value={password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    { !!errors && <p className="text-red-500 text-xs italic">{ errors.error }</p> } 
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-orange-300 hover:bg-brand text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                    </button>
                    <Link to="" className="inline-block align-baseline font-bold text-sm text-orange-300 hover:text-brand">
                        Forgot Password?
                    </Link>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">&copy;2020 Acme Corp. All rights reserved.</p>
        </div>
    );
    
    function login (e : FormEvent) {
        e.preventDefault();
        
        axios.post(`/users/login`, {
            email, 
            password
        }).then(response => {
            if(response.status === 200) {
                authContext.dispatch({ type : EnumAuthReducerActionTypes.LoginOrRegister, payload : response.data.data });
                navigate(EnumRoutes.Home);
            }
        }).catch(e => {
            setErrors(e.response.data);
        });
    }
}
