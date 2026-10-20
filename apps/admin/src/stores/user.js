import { defineStore } from "pinia";
import { ref } from "vue";
import { getUser } from "../apis/user";

const useUserStore = defineStore("user", () => {
  const { VITE_TOKEN_NAME } = import.meta.env;
  const token = ref(localStorage.getItem(VITE_TOKEN_NAME));

  const userInfo = ref(null);
  const setUserInfo = (value) => {
    userInfo.value = value;
  };
  const getUserInfo = async (force) => {
    if (!force && userInfo.value) return userInfo.value;
    try {
      const res = await getUser();
      setUserInfo(res.data);
    } catch (err) {}
  };

  const login = async (value) => {
    token.value = value;
    localStorage.setItem(VITE_TOKEN_NAME, value);
    await getUserInfo(1);
  };

  const logout = () => {
    token.value = "";
    localStorage.removeItem(VITE_TOKEN_NAME);
    setUserInfo(null);
  };

  return {
    token,
    userInfo,
    setUserInfo,
    getUserInfo,
    login,
    logout,
  };
});

export default useUserStore;
