import React, { createContext, useReducer, Dispatch, ReactNode, useEffect } from "react";
import IUser from "../types/IUser";
import EnumAuthReducerActionTypes from "../types/EnumAuthReducerActionTypes";
import axios from "../utilities/axios";
interface Props {
    children: ReactNode;
}
interface AuthState {
    user: IUser | null;
}
type AuthAction = { type: EnumAuthReducerActionTypes.LoginOrRegister; payload: IUser } | { type: EnumAuthReducerActionTypes.Logout };

interface AuthContextType extends AuthState {
    dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    dispatch: () => null,
});

export const AuthContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(
        (state: AuthState, action: AuthAction) => {
            switch (action.type) {
                case EnumAuthReducerActionTypes.LoginOrRegister:
                    localStorage.setItem("user", JSON.stringify({ ...action.payload, password: "" }));
                    return { user: action.payload };
                case EnumAuthReducerActionTypes.Logout:
                    localStorage.removeItem("user");
                    return { user: null };
                default:
                    return state;
            }
        },
        { user: null }
    );
    useEffect(() => {
        try {
            axios.get("users/me").then(res => {
                const user: IUser = res.data.data;
                if (user) {
                    dispatch({ type: EnumAuthReducerActionTypes.LoginOrRegister, payload: user });
                } else {
                    dispatch({ type: EnumAuthReducerActionTypes.Logout });
                }
            });
        } catch (e) {
            console.error(e);
            dispatch({ type: EnumAuthReducerActionTypes.Logout });
        }
    }, []);
    return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
