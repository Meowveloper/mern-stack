import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import BlogDetail from "../pages/BlogDetail";
import NotFound from "../pages/NotFound";
enum Routes {
    Home = '', 
    About = '/about', 
    BlogDetail = '/blogs/:id',
    NotFound = '*'
}
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children : [
            {
                path : Routes.Home,
                element : <Home/> 
            }, 
            {
                path : Routes.About, 
                element : <About/>
            }, 
            {
                path: Routes.BlogDetail, 
                element : <BlogDetail/>
            }, 
            {
                path : Routes.NotFound, 
                element : <NotFound/>
            }
        ]
    },
]);
export default router;
