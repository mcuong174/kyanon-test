import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./loginFormStyle.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);

  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.message) {
          setLoginStatus(res.data.message);
        } else {
          setLoginStatus("Logged in successfully");
          navigate("/");
        }
      });
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="login-form">
      <h3 className="heading">Login</h3>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          id="email"
          name="email"
          rules="required|email"
          type="email"
          placeholder="example@kyanon.digital"
          className="form-control"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          id="password"
          name="password"
          rules="required|min:8"
          type={passwordShown ? "text" : "password"}
          className="form-control"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <span className="form-message"></span>
      </div>

      <div className="footer-form">
        <div className="show-password">
          <input
            type="checkbox"
            name="show-password"
            className="show-password-btn"
            onClick={togglePassword}
          />
          <p>Show password</p>
        </div>

        <button className="form-submit" type="submit" onClick={handleLogin}>
          Sign in
        </button>
      </div>
      <h3>{loginStatus}</h3>
    </div>
  );
};

export default LoginForm;
