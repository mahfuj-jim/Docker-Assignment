/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const useAuthHook = () => {
  const userData = useSelector((state) => state.user.userData);

  const signup = async (name, email, password) => {
    const signupData = {
      role: 2,
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axiosInstance.post("/auth/signup", signupData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const adminSignup = async (name, email, password, secretId, superAdmin) => {
    const signupData = {
      role: 1,
      email: email,
      password: password,
      name: name,
      secretId: secretId,
      superAdmin: superAdmin,
    };

    console.log(signupData);

    try {
      const response = await axiosInstance.post("/auth/signup", signupData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axiosInstance.post("/auth/login", loginData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { signup, adminSignup, login };
};

export default useAuthHook;
