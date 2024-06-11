import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const SecurityRoutes = ({ children }) => {
  const token = useSelector((state) => state.login.userToken);
  console.log("Token dans le state Redux :", token);

  const tokenInSessionStorage = sessionStorage.getItem('token'); // Vérifier la présence du token dans la session storage
  console.log("Token récupéré du session storage :", tokenInSessionStorage);

  const tokenInLocalStorage = localStorage.getItem('token'); // Vérifier la présence du token dans le local storage

  // Vérifier si le token est présent dans la session storage mais pas dans le local storage
  const shouldRedirect = tokenInSessionStorage && !tokenInLocalStorage && !token;

  // Si une redirection est nécessaire, rediriger vers la page de connexion, sinon afficher les enfants
  return shouldRedirect ? <Navigate to="/sign-in" /> : children;
};

SecurityRoutes.propTypes = {
  children: PropTypes.node,
};

export default SecurityRoutes;
