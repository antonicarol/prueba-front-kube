import axios from "axios";

const api = axios.create({ baseURL: "https://randomuser.me/" });

export const useApi = () => {
  const getUserData = async () => {
    try {
      const res = await api.get("/api");
      if (res.status === 200) {
        return res.data.results[0];
      } else {
        console.log("Error requesting Api!");
      }
    } catch (e) {
      console.log("Error requesting Api!, Error= ", e);
    }
  };

  return { getUserData };
};
