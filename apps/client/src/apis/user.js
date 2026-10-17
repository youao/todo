import http from "../libs/http";

export const postLogin = (phone, pwd) => {
  return http.post("user/login", {
    phone,
    pwd,
  });
};

export const postRegister = (phone, pwd) => {
  return http.post("user/register", {
    phone,
    pwd,
  });
};

export const getUser = () => {
  return http.get("user/info");
};
