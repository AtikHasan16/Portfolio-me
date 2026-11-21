import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Community from "../pages/Community";
import Education from "../pages/Education";
import References from "../pages/References";
import Contacts from "../pages/Contacts";
import Admin from "../pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "works",
        element: <Projects />, // Seamless fallback for previous /works links
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "education",
        element: <Education />,
      },
      {
        path: "about",
        element: <Education />, // Seamless fallback for previous /about links
      },
      {
        path: "references",
        element: <References />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
]);

export default router;
