import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Store/slices/authSlice.js";
import { validateLogin } from "../../Utils/validators.js";
import styles from "./Login.module.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registeredUser, isLoggedIn } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    const payload = { email, password };
    const inputFormErrors = validateLogin(payload);
    console.log("Validation Input Errors:", inputFormErrors);

    setErrors(inputFormErrors);

    if (!inputFormErrors) return;

    if (!registeredUser) {
      setFormError("No registered user found. Please register first.");
      return;
    }
    console.log("Registereduser-", registeredUser);


    const matchEmail = registeredUser.email.toLowerCase() === email.toLowerCase();
    const matchPassword = registeredUser.password === password;

    if (!matchEmail || !matchPassword) {
      setFormError("Invalid credentials. Please check email/password.");
      return;
    }

    dispatch(loginUser({ name: registeredUser.name, email: registeredUser.email }));
    navigate("/");
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.title}>Login</div>
        </div>
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <div className={styles.row}>
            <div className={styles.label}>Email</div>
            <input
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Password</div>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
            />
            {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>

          {formError && <div className={styles.error}>{formError}</div>}

          <div className={styles.actions}>
            <button className={`${styles.btn} ${styles.primary}`} type="submit">
              Login
            </button>
            <div className={styles.small}>
              New here? <Link className={styles.link} to="/register">Register</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
