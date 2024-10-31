import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
/* const navigate = useNavigate(); */

async function login(dispatch, userData) {
  try {
    const response = await api.post("/login", userData);
    if (response.data) {
      const { token, newToken } = response.data;
      const payload = { ...userData, token, newToken };
    
      dispatch({ type: "LOGIN", payload});
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erro ao fazer o login: ", error);
    return false;
  }
}

async function register(dispatch, userData) {
  try {
    const response = await api.post("/register", userData);
    dispatch({ type: "REGISTER", payload: response.data });
  } catch (error) {
    console.error("Erro ao registrar: ", error);
  }
}

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        token: action.payload.token
      };

    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    default:
      return state;
  }
};

export const ContextUser = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if(storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser)
        const payload = { ...parsedUser, token: storedToken };
        login(dispatch, payload)
      } catch (error) {
        localStorage.removeItem("user")
        localStorage.removeItem("token"); // Remove o token também
      }
    }
  }, [])

  return (
    <ContextUser.Provider
      value={{
        state,
        dispatch,
        login,
        register,
      }}
    >
      {children}
    </ContextUser.Provider>
  );
};
