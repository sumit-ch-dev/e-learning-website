import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from "../components/Dashboard/Dashboard";

const Routes = () => {
    const { token } = useAuth();



    const routesForAllUsers = [
        {
            path: '/',
            element: <div>
                <h1>Home Page</h1>
            </div>
        },
    ]

    const routesForAuthenticatedOnly = [
        {
            path: '/dashboard',
            element: <ProtectedRoute />,
            children: [
                {
                    path: 'dashboard/',
                    element: <div>
                        <h1>Dashboard</h1>
                    </div>
                },
                {
                    path: 'dashboard/courses',
                    element: <div>
                        <h1>Private Courses</h1>
                    </div>
                },
                {
                    path: 'dashboard/profile',
                    element: <div>
                        <h1>Profile</h1>
                    </div>
                }
            ]
        }
    ]

    const routesForNotUnauthenticatedOnly = [
        {
            path: '/',
            element: <div>
                <h1>Home Page</h1>
            </div>
        },
        {
            path: '/login',
            element: <div>
                <h1>Login Page</h1>
            </div>
        }
    ]

    const router = createBrowserRouter([
        ...routesForAllUsers,
        ...(!token ? routesForNotUnauthenticatedOnly : []),
        ...routesForAuthenticatedOnly
    ]);

    return <RouterProvider router={router} />;

}

export default Routes;