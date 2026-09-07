import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import "../../pages/auth/Login.css";

const LoginModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    if (!isOpen) return null;

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        try {
            const response = await loginUser({ email, password });
            login(response);

            if (onClose) onClose();

            const role = response.role;
            if (role === "ADMIN") {
                navigate("/admin/dashboard");
            } else if (role === "TRAINER") {
                navigate("/trainer/dashboard");
            } else if (role === "MEMBER") {
                navigate("/member/dashboard");
            } else {
                setErrorMessage("Invalid Role assigned to this account.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            setErrorMessage(
                error.response?.data?.message || "Invalid Email or Password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-modal-backdrop" onClick={onClose}>
            <div className="auth-popup-card" onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
                {/* Close Button */}
                {onClose && (
                    <button className="auth-modal-close-btn" onClick={onClose} aria-label="Close">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}

                <div className="auth-header-wrapper" style={{ marginBottom: "20px" }}>
                    <div className="auth-brand-badge">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        Gym Automation System
                    </div>
                    <h2 className="auth-main-title" style={{ fontSize: "1.75rem" }}>Sign In</h2>
                    <p className="auth-main-subtitle">Access your gym account</p>
                </div>

                {errorMessage && (
                    <div className="auth-error-banner">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <span>{errorMessage}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="auth-form">
                    <div className="auth-field-group">
                        <div className="auth-field-header">
                            <label className="auth-field-label" htmlFor="modal-email">Work Email</label>
                        </div>
                        <div className="auth-input-wrapper">
                            <input
                                id="modal-email"
                                type="email"
                                className="auth-input-field"
                                placeholder="you@gymautomation.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-field-group">
                        <div className="auth-field-header">
                            <label className="auth-field-label" htmlFor="modal-password">Password</label>
                            <a
                                href="#forgot"
                                className="auth-forgot-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert("Please contact your administrator to reset password.");
                                }}
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <div className="auth-input-wrapper">
                            <input
                                id="modal-password"
                                type={showPassword ? "text" : "password"}
                                className="auth-input-field auth-input-has-icon"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="auth-eye-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                        {loading ? <span className="auth-spinner"></span> : "Sign In"}
                    </button>
                </form>

                <div className="auth-divider"><span>or</span></div>

                <button type="button" className="auth-google-btn" onClick={() => alert("Google Sign-In clicked.")}>
                    <svg viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    Continue with Google
                </button>

                <p className="auth-footer-prompt">
                    Don't have an account?
                    <span className="auth-register-link" onClick={() => { if (onClose) onClose(); navigate("/register"); }}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;
