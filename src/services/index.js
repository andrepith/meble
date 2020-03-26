import axios from "axios";

export const mebleService = () => {
  return axios
    .get("http://www.mocky.io/v2/5c9105cb330000112b649af8")
    .then(res => res.data);
};
