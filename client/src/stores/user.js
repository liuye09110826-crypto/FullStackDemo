import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: localStorage.getItem("username") || "",
    token: localStorage.getItem("token") || ""
  }),

  getters: {
    isLogin: (state) => !!state.token
  },

  actions: {
    login(username, token) {
      this.username = username;
      this.token = token;

      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
    },

    logout() {
      this.username = "";
      this.token = "";

      localStorage.removeItem("username");
      localStorage.removeItem("token");
    }
  }
});