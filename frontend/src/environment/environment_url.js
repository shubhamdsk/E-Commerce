import { dev } from "./environment_constant";

const baseUrl = dev;

const url = {
  auth: {
    register: baseUrl + "register",
    login: baseUrl + "login",
  },
  product: {
    add_product: baseUrl + "add-product",
    get_product: baseUrl + "get-products",
    delete_product: baseUrl + 'product/'
  }
};
export { url };
