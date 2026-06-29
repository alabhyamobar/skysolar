import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminQueries from "./pages/admin/AdminQueries";
import AdminEmployees from "./pages/admin/AdminEmployees";
import AdminClients from "./pages/admin/AdminClients";

import MainLayout from "./components/MainLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <Landing />
            }
        ]
    },
    {
        path: "/admin/login",
        element: <AdminLogin />
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { path: "queries", element: <AdminQueries /> },
            { path: "clients", element: <AdminClients /> },
            { path: "employees", element: <AdminEmployees /> },
            { path: "", element: <AdminQueries /> }
        ]
    }
], {
    basename: import.meta.env.BASE_URL
})