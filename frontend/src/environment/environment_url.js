import { dev } from "./environment_constant";

const baseUrl = dev;

const url = {
  auth: {
    register: baseUrl + "register",
    login: baseUrl + "login",
  },
};
export { url };
