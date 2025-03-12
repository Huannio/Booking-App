import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentPermission } from "~/redux/user/userSlice";
import PropTypes from "prop-types";
function RbacRoute({
  requiredPermission,
  redirectTo = "/access-denied",
  children,
}) {
  const permissions = useSelector(selectCurrentPermission);
  if (!permissions.includes(requiredPermission)) {
    return <Navigate to={redirectTo} replace="true" />;
  }
  return children;
}

RbacRoute.propTypes = {
  requiredPermission: PropTypes.string.isRequired,
  redirectTo: PropTypes.string,
  children: PropTypes.node,
};

export default RbacRoute;
