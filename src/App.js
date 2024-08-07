import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./layout/login";
import Register from "./layout/register";
import ProtectedRoute from "./protectedRoute";
import Dashboard from "./layout/dashboard";
import ForgotPassword from "./layout/forgot-password";
import ResetPassword from "./layout/reset-password";
import NotFound from "./layout/not-found";
import Users from "./layout/users";
import AddProduct from "./layout/add-product";
import ProductList from "./layout/product-list";
import { createContext, useEffect, useState } from "react";
import { AUTH_TOKEN, USER } from "./constants";
import UpdateProduct from "./layout/update-product";
import FavoriteList from "./layout/favorite-list";
import CartList from "./component/cart-list";
import Checkout from "./component/checkout/checkout";
import SuccessPayment from "./component/checkout/success-payment";
export const AuthenticateContext = createContext();

function App() {
  const t = localStorage.getItem(AUTH_TOKEN);
  const token = t ? JSON.parse(t) : null;
  const userData = JSON.parse(localStorage.getItem(USER));
  const [contextData, setContextData] = useState({
    token: "",
    user: "",
    config: null,
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/users",
      element: (
        <ProtectedRoute>
          <Users />
        </ProtectedRoute>
      ),
    },
    {
      path: "/product-list",
      element: (
        <ProtectedRoute>
          <ProductList />
        </ProtectedRoute>
      ),
    },
    {
      path: "/add-product",
      element: (
        <ProtectedRoute>
          <AddProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: "/update-product/:productId",
      element: (
        <ProtectedRoute>
          <UpdateProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: "/favorite-list",
      element: (
        <ProtectedRoute>
          <FavoriteList />
        </ProtectedRoute>
      ),
    },
    {
      path: "/cart-list",
      element: (
        <ProtectedRoute>
          <CartList />
        </ProtectedRoute>
      ),
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      ),
    },
    {
      path: "/checkout/success",
      element: (
        <ProtectedRoute>
          <SuccessPayment />
        </ProtectedRoute>
      ),
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "reset-password/:userId/:token",
      element: <ResetPassword />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  useEffect(() => {
    if (token) {
      setContextData({
        token: token,
        user: userData,
        config: {
          headers: { Authorization: `Bearer ${token}` },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="h-screen">
      <AuthenticateContext.Provider value={{ contextData, setContextData }}>
        <RouterProvider router={router} />
      </AuthenticateContext.Provider>
    </div>
  );
}

export default App;
