import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const userToken = localStorage.getItem("token");
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(token);
  };
  return {
    setToken: saveToken,
    token,
  };
}
