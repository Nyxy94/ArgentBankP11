import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./SignIn.scss";

import { useDispatch, useSelector } from "react-redux";
import { selectStatus, loginUserThunk } from "../../redux/loginSlice";
import { selectUserError, fetchUserProfile  } from "../../redux/userSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const errorRedux = useSelector(selectUserError);

  const validate = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return "Invalid email or password";
    }
    if (!password || password.length < 8) {
      return "Invalid email or password";
    }
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setValidationError(validationError);
      return;
    }

    try {
      const loginResult = await dispatch(loginUserThunk({ email, password }));

      if (loginResult.payload && loginResult.payload.body) {
        const token = loginResult.payload.body.token;

        if (rememberMe) {
          localStorage.setItem("token", token); // Stocker le token dans localStorage si Remember me est coché
        } else {
          sessionStorage.setItem("token", token); // Stocker le token dans sessionStorage sinon
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
        {validationError && <p className="errorConexion">{validationError}</p>}
        {error && <p className="errorConexion">{error}</p>}
        {errorRedux && <p className="errorConexion">{errorRedux}</p>}
      </section>
    </main>
  );
};

export default SignIn;
