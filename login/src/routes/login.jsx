import React, { useContext, useState, useEffect } from "react";
import { ContextUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const login = () => {
  const { login, dispatch, state } = useContext(ContextUser);

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  /* Função que captura o submit do login e dispara um preventDefault para não recarregar */
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* loginSucces é a constante que vai receber true ou false. O retorno da função login depende da autenticação do usuário pelos dados setados em "userData" */
    const loginSuccess = await login(dispatch, userData);

    /* Se a autenticação for bem sucedida, retorna um true e redireciona para  página principal de exibição de receitas */
    if (loginSuccess) {
      navigate("/home");
    } else {
      /* Manda para registro */
      navigate("/register");
    }
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate("/home"); // ou qualquer rota desejada
    }
  }, [state.isAuthenticated, navigate]);
  return (
    <div className="container-login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            required
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <div className="buttons">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <p>
            Não tem uma conta?!{" "}
            <span onClick={handleRegister}>Resgistre-se</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default login;
