import { useJwt } from "react-jwt";
import API from "../_api";
import { data } from "react-router-dom";

export const login = async ({ email, password }) => {
  try {
    const { data } = await API.post("/login", { email, password });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const { data } = await API.post("/register", { name, email, password });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useDecodeToken = (token) => {
  const { decodedToken, isExpired } = useJwt(token);

  try {
    if (isExpired) {
      return {
        success: false,
        message: "Token expired",
        data: null,
      };
    }
    return {
      success: true,
      message: "Success",
      data: decodedToken,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const logout = async ({ token }) => {
  try {
    const { data } = await API.post(
      "/logout",
      { token },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    localStorage.removeItem("accessToken");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
