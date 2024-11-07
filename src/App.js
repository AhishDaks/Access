import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./component/Login";
import Main from "./component/Main";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/main/:id",
    element: <Main />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
