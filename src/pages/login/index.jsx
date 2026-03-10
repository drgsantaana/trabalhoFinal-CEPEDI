import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Lock, Mail, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./login.css";

const errorMessages = {
  "Invalid login credentials": "Email ou senha incorretos.",
  "Email not confirmed": "Email ainda não confirmado. Verifique sua caixa de entrada.",
  "User already registered": "Este email já está cadastrado.",
  "Password should be at least 6 characters": "A senha deve ter no mínimo 6 caracteres.",
  "Unable to validate email address: invalid format": "Formato de email inválido.",
  "Email rate limit exceeded": "Muitas tentativas. Aguarde um momento e tente novamente.",
  "For security purposes, you can only request this after": "Muitas tentativas. Aguarde um momento e tente novamente.",
  "Signup is not allowed for this instance": "O registro está desativado no momento.",
  "Network request failed": "Erro de conexão. Verifique sua internet.",
};

const translateError = (message) => {
  if (!message) return "Ocorreu um erro. Tente novamente.";
  for (const [key, value] of Object.entries(errorMessages)) {
    if (message.includes(key)) return value;
  }
  return "Ocorreu um erro. Tente novamente.";
};

const Login = () => {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [switching, setSwitching] = useState(false);
  const navigate = useNavigate();
  const { login, register: registerUser, user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Redirect to calculator if vault was not unlocked
    const unlocked = sessionStorage.getItem("vault_unlocked");
    if (!unlocked) {
      navigate("/", { replace: true });
      return;
    }

  }, [navigate]);

  useEffect(() => {
    if (user) {
      sessionStorage.removeItem("vault_unlocked");
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const switchMode = () => {
    setSwitching(true);
    setTimeout(() => {
      setMode(mode === "login" ? "register" : "login");
      setError(null);
      setShowPassword(false);
      reset();
      setSwitching(false);
    }, 200);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      if (mode === "login") {
        await login(data.email, data.password);
      } else {
        await registerUser(data.name, data.email, data.password);
      }
    } catch (err) {
      setError(translateError(err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Scan-line overlay */}
      <div className="scanlines" />

      {/* Ambient glow */}
      <div className="ambient-glow" />

      <div className="login-container">
        {/* Access granted header */}
        <div className="login-header">
          <div className="access-indicator">
            <span className="access-dot" />
            <span className="access-label">ACESSO LIBERADO</span>
          </div>
          <h1 className="login-title">
            {mode === "login" ? "Entrar" : "Criar Conta"}
          </h1>
          <p className="login-subtitle">
            {mode === "login"
              ? "Insira suas credenciais para continuar"
              : "Preencha os dados para se registrar"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className={`login-form ${switching ? "login-form--switching" : ""}`}>
          {mode === "register" && (
            <div className="input-group">
              <div className="input-wrapper">
                <User className="input-icon" size={16} strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Nome"
                  className={`login-input ${errors.name ? "login-input--error" : ""}`}
                  {...register("name", {
                    required: "Nome é obrigatório",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  })}
                />
              </div>
              {errors.name && (
                <span className="input-error">{errors.name.message}</span>
              )}
            </div>
          )}

          <div className="input-group">
            <div className="input-wrapper">
              <Mail className="input-icon" size={16} strokeWidth={1.5} />
              <input
                type="email"
                placeholder="Email"
                className={`login-input ${errors.email ? "login-input--error" : ""}`}
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email inválido",
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className="input-error">{errors.email.message}</span>
            )}
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <Lock className="input-icon" size={16} strokeWidth={1.5} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                className={`login-input ${errors.password ? "login-input--error" : ""}`}
                {...register("password", {
                  required: "Senha é obrigatória",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff size={16} strokeWidth={1.5} />
                ) : (
                  <Eye size={16} strokeWidth={1.5} />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="input-error">{errors.password.message}</span>
            )}
          </div>

          {error && <div className="form-error">{error}</div>}

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            <span>{isLoading ? "Processando..." : mode === "login" ? "Entrar" : "Registrar"}</span>
            {!isLoading && <ArrowRight size={16} strokeWidth={2} />}
            {isLoading && <span className="spinner" />}
          </button>
        </form>

        {/* Toggle mode */}
        <div className="login-footer">
          <span className="footer-text">
            {mode === "login" ? "Não tem conta?" : "Já tem conta?"}
          </span>
          <button type="button" className="toggle-btn" onClick={switchMode}>
            {mode === "login" ? "Criar conta" : "Entrar"}
          </button>
        </div>

        {/* Bottom decorative line */}
        <div className="bottom-line" />
      </div>
    </div>
  );
};

export default Login;
