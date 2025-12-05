import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Contacts from "../pages/Contacts";
import Works from "../pages/Works";
import About from "../pages/About";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },

      {
        path: "/works",
        element: <Works></Works>,
      },
      {
        path: "/contacts",
        element: <Contacts></Contacts>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
    ],
  },
]);

export default router;
