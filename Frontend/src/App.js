import Task from "./Task";
import ViewTask from "./ViewTask";
import Tasks from './Tasks'
import Login from "./Login";
import Signup from "./Signup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DltTask from "./DltTask";
import Error from "./Error";
import Update from "./Update";
function App() {

  const router=createBrowserRouter([
    {path:'/',element:<Signup />},
    {path:'/login', element:<Login/>},
    {path:'/tasks',element:<Tasks />},
    {path:'/search',element:<ViewTask />},
    {path:'/delete',element:<DltTask />},
    {path:'/add',element:<Task />},
    {path:'/update/:title',element:<Update/>},
    {path:"*",errorElement:< Error />}
  ])

  return (
    
    <>
    <RouterProvider  router={router}></RouterProvider>
    </>
  );
}

export default App;
