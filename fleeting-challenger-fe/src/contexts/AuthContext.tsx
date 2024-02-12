import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import api from "@/service/auth";
import { AxiosError } from "axios";
type User = {
  access_token: string;
};

type ContextType = {
  user: User | undefined;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<ContextType>({} as ContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const login = (userData: User) => {
    setUser(userData);
    Cookies.set("access_token", userData.access_token, { expires: 7 });
  };
  const isLogged = user?.access_token;

  const logout = () => {
    setUser(undefined);
    Cookies.remove("access_token");
    router.push("/user/login");
  };

  useEffect(() => {
    if (!Cookies.get("access_token")) {
      logout();
    }
  }, [user]);

  useEffect(() => {
    const interceptor1 = api.interceptors.request.use(function (config: any) {
      const accessToken = Cookies.get("access_token");
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
      return config;
    });

    const interceptor2 = api.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error: AxiosError) {
        if (error.response && error.response.status === 401) {
          Cookies.remove("access_token");
          router.push("../user/login");
        }
        throw error;
      }
    );
    return () => {
      api.interceptors.response.eject(interceptor1);
      api.interceptors.response.eject(interceptor2);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
