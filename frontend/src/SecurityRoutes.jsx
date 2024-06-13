import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const SecurityRoutes = ({ children }) => {
  const isAuthenticated = () => {
    const tokenInLocalStorage = localStorage.getItem("token");
    const tokenInSessionStorage = sessionStorage.getItem("token");

    return !!tokenInLocalStorage || !!tokenInSessionStorage; // Retourne true si le token existe dans localStorage ou sessionStorage, sinon false
  };

  const isUserAuthenticated = isAuthenticated();

  return isUserAuthenticated ? children : <Navigate to="/sign-in" />;
};

SecurityRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SecurityRoutes;
