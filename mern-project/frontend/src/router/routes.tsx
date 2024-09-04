import App from "../App";
import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import RecipeCreate from "../pages/RecipeCreate";
import EnumRoutes from "../types/EnumRoutes";
import RecipeEdit from "../pages/RecipeEdit";
const routes = createBrowserRouter([
  {
    path: "/",
    element : <App/>, 
    children : [
        {
            path : EnumRoutes.Home, 
            element : <Home/>
        }, 
        {
          path : EnumRoutes.About, 
          element : <About/>
        }, 
        {
          path : EnumRoutes.Contact, 
          element : <Contact/>
        }, 
        {
          path : EnumRoutes.RecipeCreate, 
          element : <RecipeCreate/>
        }, 
        {
          path : EnumRoutes.RecipeEdit + '/:id', 
          element : <RecipeEdit/>
        }
    ]
  },
]);

export default routes;