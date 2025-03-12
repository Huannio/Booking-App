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
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "~/redux/user/userSlice";
import RbacRoute from "./components/Core/RbacRoute";
import PropTypes from "prop-types";

const ProtectedRoute = ({ currentUser }) => {
  return currentUser ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

const AuthorizedRoute = ({ currentUser }) => {
  return currentUser ? <Navigate to="/dashboard" replace={true} /> : <Outlet />;
};

function App() {
  const currentUser = useSelector(selectCurrentUser);

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
          <Route element={<ProtectedRoute currentUser={currentUser} />}>
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
                    <RbacRoute requiredPermission={route.requiredPermission}>
                    <Layout>
                      <Page />
                    </Layout>
                    </RbacRoute>
                  }
                />
              );
            })}
          </Route>

          {/* Authorized Routes */}
          <Route element={<AuthorizedRoute currentUser={currentUser} />}>
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

          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LoadingProvider>
    </Router>
  );
}

ProtectedRoute.propTypes = {
  currentUser: PropTypes.object,
};

AuthorizedRoute.propTypes = {
  currentUser: PropTypes.object,
};

export default App;
