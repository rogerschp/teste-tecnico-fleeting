import Axios from "axios";
import Cookies from "js-cookie";

const url = "http://localhost:3500/";

let token: string | null = null;
if (typeof window !== "undefined") {
  const access_token = Cookies.get("access_token");
  token = access_token ? access_token : null;
}

export const api = Axios.create({
  baseURL: url,
});

export default api;
