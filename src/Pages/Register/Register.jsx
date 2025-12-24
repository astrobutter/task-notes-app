import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validateRegister } from "../../Utils/validators";
import { registerUser } from "../../Store/slices/authSlice";
import styles from "./Register.module.css";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registeredUser = useSelector((s) => s.auth.registeredUser);

    const [name, setName] = useState(registeredUser?.name || "");
    const [email, setEmail] = useState(registeredUser?.email || "");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    function onSubmit(e) {
        e.preventDefault();
        const payload = { name, email, password };
        const inputFormErrors = validateRegister(payload);

        setErrors(inputFormErrors);

        if (!inputFormErrors) return;

        dispatch(registerUser({ name: name.trim(), email: email.trim(), password }));
        navigate("/login");
    }

    return (

        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.title}>Register</div>
                </div>
                <form className={styles.form} onSubmit={onSubmit} noValidate>
                    <div className={styles.row}>
                        <div className={styles.label}>Name</div>
                        <input
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                        />
                        {errors.name && <div className={styles.error}>{errors.name}</div>}
                    </div>

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
                            placeholder="Minimum 6 characters"
                        />
                        {errors.password && <div className={styles.error}>{errors.password}</div>}
                    </div>

                    <div className={styles.actions}>
                        <button className={`${styles.btn} ${styles.primary}`} type="submit">
                            Create Account
                        </button>
                        <div className={styles.small}>
                            Already have an account? <Link className={styles.link} to="/login">Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
