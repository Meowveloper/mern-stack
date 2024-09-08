import App from "../App";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import RecipeCreate from "../pages/RecipeCreate";
import EnumRoutes from "../types/EnumRoutes";
import RecipeEdit from "../pages/RecipeEdit";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Routes() {
    const authContext = useContext(AuthContext);
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: EnumRoutes.Home,
                    element: authContext.user ?  <Home /> : <Navigate to={EnumRoutes.Login} />,
                },
                {
                    path: EnumRoutes.About,
                    element: <About />,
                },
                {
                    path: EnumRoutes.Contact,
                    element: <Contact />,
                },
                {
                    path: EnumRoutes.RecipeCreate,
                    element: authContext.user ?  <RecipeCreate /> : <Navigate to={EnumRoutes.Login}/>,
                },
                {
                    path: EnumRoutes.RecipeEdit + "/:id",
                    element: authContext.user ?  <RecipeEdit /> : <Navigate to={EnumRoutes.Login}/>,
                },
                {
                    path: EnumRoutes.Register,
                    element: !authContext.user ?  <Register /> : <Navigate to={EnumRoutes.Home}/>,
                },
                {
                    path: EnumRoutes.Login,
                    element: !authContext.user ?  <Login /> : <Navigate to={EnumRoutes.Home} />,
                },
            ],
        },
    ]);

    return (<RouterProvider router={routes}></RouterProvider>)
}
