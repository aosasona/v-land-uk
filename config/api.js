export const API =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:1337/api"
    : "https://v-land.herokuapp.com/api";
export const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:1337"
    : "https://v-land.herokuapp.com";
