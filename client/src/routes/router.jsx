import {
    createBrowserRouter, Navigate,
} from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoute from "../components/PrivateRoute";
import useRole from "../hooks/useRole";

// Worker
import WorkerHome from "../pages/Dashboard/Worker/WorkerHome";
import TaskList from "../pages/Dashboard/Worker/TaskList";
import TaskDetails from "../pages/Dashboard/Worker/TaskDetails";
import MySubmissions from "../pages/Dashboard/Worker/MySubmissions";
import Withdrawals from "../pages/Dashboard/Worker/Withdrawals";
// Buyer
import BuyerHome from "../pages/Dashboard/Buyer/BuyerHome";
import AddTask from "../pages/Dashboard/Buyer/AddTask";
import MyTasks from "../pages/Dashboard/Buyer/MyTasks";
import PurchaseCoin from "../pages/Dashboard/Buyer/PurchaseCoin";
import PaymentHistory from "../pages/Dashboard/Buyer/PaymentHistory";
import TaskToReview from "../pages/Dashboard/Buyer/TaskToReview";
// Admin
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageTasks from "../pages/Dashboard/Admin/ManageTasks";
import WithdrawRequests from "../pages/Dashboard/Admin/WithdrawRequests";

const DashboardIndex = () => {
    const [role, isLoading] = useRole();
    if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold text-accent">Loading...</div>;

    if (role === 'Worker') return <Navigate to="/dashboard/worker-home" replace />;
    if (role === 'Buyer') return <Navigate to="/dashboard/buyer-home" replace />;
    if (role === 'Admin') return <Navigate to="/dashboard/admin-home" replace />;

    return <Navigate to="/login" replace />;
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                element: <DashboardIndex />
            },
            // Worker Routes
            {
                path: 'worker-home',
                element: <WorkerHome></WorkerHome>
            },
            {
                path: 'task-list',
                element: <TaskList></TaskList>
            },
            {
                path: 'task-details/:id',
                element: <TaskDetails></TaskDetails>
            },
            {
                path: 'my-submissions',
                element: <MySubmissions></MySubmissions>
            },
            {
                path: 'withdrawals',
                element: <Withdrawals></Withdrawals>
            },
            // Buyer Routes
            {
                path: 'buyer-home',
                element: <BuyerHome></BuyerHome>
            },
            {
                path: 'add-task',
                element: <AddTask></AddTask>
            },
            {
                path: 'my-tasks',
                element: <MyTasks></MyTasks>
            },
            {
                path: 'purchase-coin',
                element: <PurchaseCoin></PurchaseCoin>
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'task-to-review',
                element: <TaskToReview></TaskToReview>
            },
            // Admin Routes
            {
                path: 'admin-home',
                element: <AdminHome></AdminHome>
            },
            {
                path: 'manage-users',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: 'manage-tasks',
                element: <ManageTasks></ManageTasks>
            },
            {
                path: 'withdraw-requests',
                element: <WithdrawRequests></WithdrawRequests>
            }
        ]
    }
]);
