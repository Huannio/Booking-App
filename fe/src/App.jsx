import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import { publicRoutes, privateRoutes, authRoutes } from "./routes";
import { ClientLayout } from "./components/Layout";
import { Fragment } from "react";
import { LoadingProvider } from "./components/Loading/Loading";
import { AuthProvider } from "./context/AuthContext";

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? <Outlet /> : <Navigate to="/login" />;
};

const AuthorizedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

function App() {
  return (
    <Router>
      <LoadingProvider>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) => {
            let Layout = ClientLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {/* Private Routes */}
          <Route
            element={
              <AuthProvider>
                <ProtectedRoute />
              </AuthProvider>
            }
          >
            {privateRoutes.map((route, index) => {
              let Layout = ClientLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Route>

          {/* Authorized Routes */}
          <Route
            element={
              <AuthProvider>
                <AuthorizedRoute />
              </AuthProvider>
            }
          >
            {authRoutes.map((route, index) => {
              let Layout = ClientLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </LoadingProvider>
    </Router>
  );
}

export default App;
