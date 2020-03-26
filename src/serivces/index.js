import axios from "axios";

export const mebleService = async () => {
  const response = await axios.get(
    "http://www.mocky.io/v2/5c9105cb330000112b649af8"
  );

  return response;
};
