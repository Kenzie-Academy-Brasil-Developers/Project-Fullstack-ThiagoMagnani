import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactList, setContactList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (token) {
        try {
          const response = await api.get(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setContactList(response.data.contacts);
          setLoading(false);
          navigate("/dashboard");
        } catch (error) {
          console.error("Erro ao obter os dados do usuário:", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    autoLogin();
  }, []);

  const userRegister = async (formData) => {
    try {
      const { data } = await api.post("/users", formData);
      setUser(data);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Email já cadastrado");
      } else {
        console.error("Erro ao realizar o registro:", error);
      }
    }
  };

  const userLogin = async (formData) => {
    try {
      const { data } = await api.post("/login", formData);
      api.defaults.headers.common.authorization = `Bearer ${data.token}`
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      const response = await api.get(`/users/${data.userId}`)
      setUser(response.data);
      setContactList(response.data.contacts);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao realizar o login:", error);
    }
  };

  const userLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        contactList,
        userRegister,
        setContactList,
        userLogin,
        userLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
