/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const useGetAllUsersHook = () => {
  const [loader, setLoader] = useState(true);
  const [userData, setUserData] = useState([]);
  const apiUrl = `/user/all`;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJfaWQiOiI2NTA1MWIzMTk4NzYxY2RlZDRkZWMxYTIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1cGVyQWRtaW4iOnRydWV9LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTcwMDkwMzMsImV4cCI6MTY5NzI2ODIzM30.MJ2jUdz9Y_OJcCse7ScZzfH-uCa6mZEpeqWJVJahTKk";

  useEffect(() => {
    const timeOutFunc = setTimeout(() => {
      getAllUsers();
    }, 800);

    return () => clearTimeout(timeOutFunc);
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.data);
      setLoader(false);
      return response.data;
    } catch (error) {
      setLoader(false);
      console.error("Error fetching data:", error);
    }
  };

  return { userData, loader };
};

export default useGetAllUsersHook;
