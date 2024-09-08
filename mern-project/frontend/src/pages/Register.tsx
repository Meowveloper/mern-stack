import React, { useState, FormEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import EnumRoutes from "../types/EnumRoutes";
import IUser from "../types/IUser";
import axios from "../utilities/axios";
import IRegisterError from "../types/IRegisterError";
import { AuthContext } from "../contexts/AuthContext";
import EnumAuthReducerActionTypes from "../types/EnumAuthReducerActionTypes";

export default function Register() {
    const [ name , setName ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ errors, setErrors ] = useState<IRegisterError>({} as IRegisterError);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    return (
        <div className="w-full mx-auto max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={ register }>
                <div className="text-h1 text-brand font-bold text-center mb-4">Register</div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input onInput={ (e) => { setName((e.target as HTMLInputElement).value); } } value={name} className={`shadow appearance-none border ${errors.name ? 'border-red-500' : ''}  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="name" type="text" placeholder="Name" />
                    { !!errors.name && <p className="text-red-500 text-xs font-bold italic">{ errors.name.msg }</p> }
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input onInput={ (e) => { setEmail((e.target as HTMLInputElement).value); } } value={email} className={`shadow appearance-none border ${errors.email ? 'border-red-500' : ''}  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="email" type="email" placeholder="Email" />
                    { !!errors.email && <p className="text-red-500 text-xs font-bold italic">{ errors.email.msg }</p> }
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input onInput={ (e) => { setPassword((e.target as HTMLInputElement).value); } } value={password} className={`shadow appearance-none border ${errors.password ? 'border-red-500' : ''}  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="password" type="password" placeholder="******************" />
                    { !!errors.password && <p className="text-red-500 text-xs font-bold italic">{ errors.password.msg }</p> }
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-orange-300 hover:bg-brand text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Register
                    </button>
                    <Link to={EnumRoutes.Login} className="inline-block align-baseline font-bold text-sm text-orange-300 hover:text-brand">
                        Login here
                    </Link>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">&copy;2020 Acme Corp. All rights reserved.</p>
        </div>
    );
    function register(e : FormEvent) {
        e.preventDefault();
        const user : IUser = {
            name, 
            email,
            password
        }        
        axios.post(`/users/register`, user, {
            withCredentials : true
        }).then(response => {
            console.log(response);
            if(response.status === 200) {
                authContext.dispatch({ type : EnumAuthReducerActionTypes.LoginOrRegister, payload : response.data.data });
                navigate(EnumRoutes.Home);
            }
        }).catch(e => {
            setErrors(e.response.data.errors as IRegisterError);
        });
    }
}
