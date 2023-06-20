import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useRoutes,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/action/auth";

// CUSTOMR ROUTES
import Protected from "./components/Route/ProtectedRoute";
import Public from "./components/Route/PublicRoute";

// PAGES
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PasswordReset from "./pages/PasswordReset";
import Connections from "./pages/Connections";
import Devices from "./pages/Devices";
import Insights from "./pages/Insights";
import Integrations from "./pages/Integrations";
import Content from "./pages/profile/ContentP";
import Settings from "./pages/Settings";
import About from "./pages/profile/About";
import PopCode from "./pages/profile/PopCode";
import EmailSignature from "./pages/profile/EmailSignature";
import VirtualBackground from "./pages/profile/VirtualBackground";

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Public>
              <Login />
            </Public>
          }
        />
        <Route
          path="/signup"
          element={
            <Public>
              <Signup />
            </Public>
          }
        />
        <Route
          path="/password/reset/:token"
          element={
            <Public>
              <PasswordReset />
            </Public>
          }
        />
        {/* PROTECTED */}
        <Route
          path="/"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/devices"
          element={
            <Protected>
              <Devices />
            </Protected>
          }
        />
        <Route
          path="/insight"
          element={
            <Protected>
              <Insights />
            </Protected>
          }
        />
        <Route
          path="/integration"
          element={
            <Protected>
              <Integrations />
            </Protected>
          }
        />
        <Route
          path="/connections"
          element={
            <Protected>
              <Connections />
            </Protected>
          }
        />
        <Route
          path="/settings"
          element={
            <Protected>
              <Settings />
            </Protected>
          }
        />
        <Route
          path="/profile/:id/content"
          element={
            <Protected>
              <Content />
            </Protected>
          }
        />
        <Route
          path="/profile/:id/about"
          element={
            <Protected>
              <About />
            </Protected>
          }
        />
        <Route
          path="/profile/:id/pop-code"
          element={
            <Protected>
              <PopCode />
            </Protected>
          }
        />
        <Route
          path="/profile/:id/email-signature"
          element={
            <Protected>
              <EmailSignature />
            </Protected>
          }
        />
        <Route
          path="/profile/:id/virtual-background"
          element={
            <Protected>
              <VirtualBackground />
            </Protected>
          }
        />
        {/* PROTECTED */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
