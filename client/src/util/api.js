// src/utils/api.js
import axios from "axios";

export const fetchProtectedData = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      "http://localhost:8081/api/v1/protected-route",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching protected data:", error);
    throw error;
  }
};
