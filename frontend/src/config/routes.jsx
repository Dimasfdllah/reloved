import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/template/MainLayout";
import SettingsLayout from "../components/template/SettingsLayout";
import Home from "../pages/user/main/Home";
import Login from "../pages/user/auth/Login";
import Cart from "../pages/user/main/Cart";
import SignUp from "../pages/user/auth/SignUp";
import ForgotPassword from "../pages/user/auth/ForgotPassword";
import ResetPassword from "../pages/user/auth/ResetPassword";
import NotFound from "../pages/user/main/NotFound";
import Products from "../pages/user/main/Products";
import DetailProduct from "../pages/user/main/DetailProduct";
import Checkout from "../pages/user/main/Checkout";
import Shipping from "../pages/user/main/Shipping";
import Profile from "../pages/user/main/profile/Profile";
import EditProfile from "../pages/user/main/profile/EditProfile";
import EditPassword from "../pages/user/main/profile/EditPassword";
import Orders from "../pages/user/main/sell/Orders";
import OrderDetail from "../pages/user/main/sell/OrderDetail";
import Purchases from "../pages/user/main/buy/Purchases";
import PurchaseDetail from "../pages/user/main/buy/PurchaseDetail";
import SearchResults from "../pages/user/main/SearchResults";
import AboutUs from "../pages/user/main/AboutUs";
import AddProduct from "../pages/user/main/sell/AddProduct";
import DetailPayment from "../pages/user/main/DetailPayment";

// ADMIN
import AdminLayout from "../components/template/AdminLayout";
import Dashboard from "../pages/admin/main/Dashboard";
import Users from "../pages/admin/main/user/Users";
import Category from "../pages/admin/main/category/Category";
import Transactions from "../pages/admin/main/transactions/Transactions";
import NotFoundAdmin from "../pages/admin/main/NotFound";
import CategoryForm from "../pages/admin/main/category/CategoryForm";
import TransactionDetail from "../pages/admin/main/transactions/TransactionDetail";

export const routes = createBrowserRouter([
  // AUTH
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  // MAIN CONTENT
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/search-results",
        element: <SearchResults />,
      },
      {
        path: "/detail-product",
        element: <DetailProduct />,
      },
      {
        // path: "/checkout/:id",
        path: "/checkout",
        element: <Checkout />,
      },
      {
        // path: "/shipping/:id",
        path: "/shipping",
        element: <Shipping />,
      },
      {
        // path: "/shipping/detail-payment:id",
        path: "shipping/detail-payment",
        element: <DetailPayment />,
      },
      //USER PROFILE
      {
        // path: "/profile/:username",
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        // path: "/orders/detail/:id",
        path: "/orders/detail",
        element: <OrderDetail />,
      },
      {
        path: "/purchases",
        element: <Purchases />,
      },
      {
        // path: "/purchases/detail/:id",
        path: "/purchases/detail",
        element: <PurchaseDetail />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
    ],
  },
  {
    element: <SettingsLayout />,
    children: [
      {
        path: "/settings/edit",
        element: <EditProfile />,
      },
      {
        path: "/settings/password",
        element: <EditPassword />,
      },
    ],
  },

  // ADMIN PAGE
  {
    path: "/admin/*",
    element: <NotFoundAdmin />,
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/category",
        element: <Category />,
      },
      {
        path: "/admin/category/form/:id?",
        element: <CategoryForm />,
      },
      {
        path: "/admin/transactions",
        element: <Transactions />,
      },
      {
        // path: "/admin/transaction/detail/:id",
        path: "/admin/transaction/detail",
        element: <TransactionDetail />,
      },
    ],
  },
]);
