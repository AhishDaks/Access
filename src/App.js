import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./component/Login";

import Mainpage from "./component/Mainpage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/main/:id",
    element: <Mainpage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
