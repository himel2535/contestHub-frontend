import Home from "../pages/Home/Home";

import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddContest from "../pages/Dashboard/Seller/AddContest";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyInventory from "../pages/Dashboard/Seller/MyInventory";
import { createBrowserRouter } from "react-router";
import AllContests from "../components/Home/AllContests";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import ErrorPage from "../components/Shared/ErrorPage/ErrorPage";
import MyCreatedContests from "../pages/Dashboard/Seller/MyCreatedContests";
import ContestSubmissions from "../components/Modal/ContestSubmissions";
import LeaderboardPage from "../pages/LeaderBoard/LeaderBoardPage";
import CreatorRequests from "../pages/Dashboard/Admin/CreatorRequests";
import ContestCreatorRoute from "./ContestCreatorRoute";
import AdminRoute from "./AdminRoute";
import ParticipantRoute from "./ParticipantRoute";
import ManageContests from "../pages/Dashboard/Admin/ManageContests";
import ManageOrders from "../pages/Dashboard/Seller/ManageSubmissions";
import MyParticipatedContests from "../pages/Dashboard/Customer/MyParticipatedContests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-contests",
        element: <AllContests />,
      },
      {
        path: "/leaderboard",
        element: <LeaderboardPage />,
      },
      {
        path: "/contest/:id",
        element: <ContestDetails />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-contest",
        element: (
          <PrivateRoute>
            <ContestCreatorRoute>
              <AddContest />
            </ContestCreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <ContestCreatorRoute>
              <MyInventory />
            </ContestCreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-contests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageContests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "creator-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <CreatorRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-participated-contests",
        element: (
          <PrivateRoute>
            <ParticipantRoute>
              <MyParticipatedContests />
            </ParticipantRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "contest-submissions/:contestId",
        element: (
          <PrivateRoute>
            <ContestSubmissions />
          </PrivateRoute>
        ),
      },
      {
        path: "my-created-contests",
        element: (
          <PrivateRoute>
            <ContestCreatorRoute>
              <MyCreatedContests />
            </ContestCreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-submissions",
        element: (
          <PrivateRoute>
            <ContestCreatorRoute>
              <ManageOrders></ManageOrders>
            </ContestCreatorRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
