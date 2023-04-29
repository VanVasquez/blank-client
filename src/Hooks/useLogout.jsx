import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
  const { setAuth } = useAuth();
  const instance = useAxiosPrivate();
  const logout = async () => {
    setAuth({});
    try {
      await instance("/user/logout", {
        withCredentials: true,
      });
    } catch (err) {}
  };
  return logout;
};

export default useLogout;
