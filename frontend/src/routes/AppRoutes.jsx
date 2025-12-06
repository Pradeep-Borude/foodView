import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import HomePage from "../pages/general/home";
import Cart from "../pages/general/Cart";
import Orders from "../pages/general/Orders";
import UserProfile from "../pages/general/UserProfile";
import CreateFood from "../pages/food-partner/addItem";
import FoodPartnerDashboard from "../pages/food-partner/FoodPartnerDashboard";
import PartnerProtectedRoute from "../middleware/PartnerProtectedRoute";
import AuthRedirectRoute from "../middleware/AuthRedirectRoute";
import EditFood from "../pages/food-partner/editItem";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* User Auth Routes */}
        <Route path="/user/register" element={
          <AuthRedirectRoute>
            <UserRegister />
          </AuthRedirectRoute>
        } />

        <Route path="/user/login" element={
          <AuthRedirectRoute>
            <UserLogin />
          </AuthRedirectRoute>

        } />

        {/* Food Partner Auth Routes */}
        <Route path="/food-partner/register" element={
          <AuthRedirectRoute>
            <FoodPartnerRegister />
          </AuthRedirectRoute>

        } />

        <Route path="/food-partner/login" element={
          <AuthRedirectRoute>
            <FoodPartnerLogin />
          </AuthRedirectRoute>

        } />

        {/* User Pages */}
        <Route path="/" element={<HomePage />} />

        <Route path="/cart" element={<Cart /> }/>

        <Route path="/orders" element={<Orders />} />

        <Route path="/user" element={<UserProfile />} />

        {/* Food Partner Pages */}
        <Route
          path="/food-partner/dashboard"
          element={<FoodPartnerDashboard /> } />

        <Route
          path="/food-partner/add-item"
          element={
            <PartnerProtectedRoute>
              <CreateFood />
            </PartnerProtectedRoute>
          }
        />
        <Route
          path="/food-partner/edit-item/:foodId"
          element={
            <PartnerProtectedRoute>
              <EditFood />
            </PartnerProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
