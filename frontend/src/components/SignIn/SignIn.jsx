import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./SignIn.scss";

// Variables importées pour l'utilisation redux
import { useDispatch, useSelector } from "react-redux"; // Importez également useSelector
import { loginUserThunk } from "../../redux/loginSlice"; // Importez loginUserThunk à partir du loginSlice
import { fetchUserProfile } from "../../redux/userSlice"; // Importez fetchUserProfile à partir du userSlice
import { selectStatus } from "../../redux/loginSlice"; // Importez le sélecteur pour le statut
import { selectUserError } from "../../redux/userSlice"; // Importez le sélecteur pour l'erreur

const SignIn = () => {
  // Initialisation de variables pour le formulaire de connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(""); // État local pour stocker l'erreur
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Utilise useDispatch
  const status = useSelector(selectStatus); // Sélecteur pour le statut
  const errorRedux = useSelector(selectUserError); // Sélecteur pour l'erreur

  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const loginResult = await dispatch(loginUserThunk({ email, password }));

        if (loginResult.payload && loginResult.payload.body) {
            const token = loginResult.payload.body.token;

            if (rememberMe) {
                localStorage.setItem('token', token); // Stockez dans localStorage
            } else {
                sessionStorage.setItem('token', token); // Stockez dans sessionStorage
            }

            await dispatch(fetchUserProfile(token));
            navigate("/user");
        } else {
            setError("Identifiants incorrects");
        }
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        setError("Identifiants incorrects");
    }
};

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in__content">
        <i className="fa fa-user-circle sign-in__icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="userEmail">User Email</label>
            <input
              type="email"
              id="userEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@gmail.com"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <Button
            btnText={"Sign In"}
            className={"sign-in__button"}
            disabled={status === "loading"}
          />
        </form>
        {errorRedux && <p className="errorConexion">{errorRedux}</p>}
      </section>
    </main>
  );
};

export default SignIn;
