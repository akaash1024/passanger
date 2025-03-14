import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API = `http://localhost:3000`;
  const [passangerList, setPassangerList] = useState([]);

  const api = axios.create({
    baseURL: API,
    headers: { "Content-Type": "application/json" },
  });

  // Fetch passengers
  const getPassangers = async () => {
    try {
      const { data } = await api.get("/api/passanger");
      setPassangerList(data.passangerList);
    } catch (error) {
      console.error("Error fetching passengers:", error);
    }
  };

  // Delete passenger
  const deletePassenger = async (id) => {
    try {
      await api.delete(`/api/passanger/${id}`);
      getPassangers();
    } catch (error) {
      console.error("Error deleting passenger:", error);
    }
  };

  useEffect(() => {
    getPassangers();
  }, []);

  // Log when state updates
  useEffect(() => {
    console.log("Updated Passenger List:", passangerList);
  }, [passangerList]);

  return (
    <AuthContext.Provider value={{ passangerList, api, deletePassenger }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
