import { dev } from "./environment_constant";

const baseUrl = dev;

const url = {
  auth: {
    register: baseUrl + "register",
    login: baseUrl + "login",
  },
  product: {
    add_product: baseUrl + "add-product"
  }
};
export { url };
