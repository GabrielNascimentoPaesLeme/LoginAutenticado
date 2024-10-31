import { createContext, useReducer } from "react";
import api from "../services/api";

async function login(dispatch, userData) {
  try {
    const response = await api.post("/login", userData);
    if (response.data) {
      dispatch({ type: "LOGIN", payload: userData });
      localStorage.setItem("user", JSON.stringify(userData));
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
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
      };

    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export const ContextUser = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

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
