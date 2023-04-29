import useAuth from "./useAuth";
import axios from "../Api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/token/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        user: response.data.user,
        accessToken: response.data.accessToken,
        name: response.data.name,
      };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
