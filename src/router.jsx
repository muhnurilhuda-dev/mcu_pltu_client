import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./components/GuestLayout";
import Signup from "./views/auth/Signup";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./views/Dashboard";
import Admin from "./views/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./views/auth/Login";
import RoleBasedRedirect from "./views/auth/RoleBasedRedirect";
import HomePage from "./views/pages/HomePage";
import Monitoring from "./views/pages/Monitoring";
import WorkPermit from "./views/pages/WorkPermit";
import MakePermit from "./views/pages/MakePermit";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <RoleBasedRedirect />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />
          },
          {
            path: '/admin',
            element: <Admin />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/homepage',
        element: <HomePage />
      },
      {
        path: '/monitoring',
        element: <Monitoring />
      },
      {
        path: '/workpermit',
        element: <WorkPermit />
      },
      {
        path: '/workpermit/make',
        element: <MakePermit />
      },
      
    ]
  },
  {
    path: '/signup/:role',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  },
])

export default router