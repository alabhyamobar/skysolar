import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/landing/Landing";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    }
])