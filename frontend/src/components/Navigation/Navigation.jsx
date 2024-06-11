import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from "../../assets/argentBankLogo.webp";
import "./Navigation.scss";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from '../../redux/loginSlice';
import { fetchUserProfile } from '../../redux/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Navigation() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.userToken);
  const userProfil = useSelector((state) => state.user.userProfile)

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // Restaurer l'état de connexion de l'utilisateur lors du chargement initial
      dispatch(loginUser({ token: storedToken, userProfil: null }));
      // Récupérer les informations du profil utilisateur après la connexion
      dispatch(fetchUserProfile(storedToken));
    }
  }, [dispatch]);

  // Au clic sur logout, suppression du token du localStorage
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav__logo" to="/">
        <img className="main-nav__logo--image"
          src={logo}
          alt="Argent bank logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <>
        <div className="login">
          {/* Conditionnellement rendre le lien "Sign In" ou "Sign Out" */}
          {token && userProfil && (
            <Link to="/user" className="userName">
              <i className="fa fa-user-circle"></i>
              <p>{userProfil.userName}</p>
            </Link>
          )}
          {token ? (
            <NavLink className="main-nav-item" to="/" onClick={handleLogout}>

              <FontAwesomeIcon icon={faSignOutAlt} />    Sign Out
            </NavLink>
          ) : (
            <NavLink className="main-nav-item" to="/sign-in">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          )}
        </div>
      </>
    </nav>
  );
}
export default Navigation;
