import axios from "axios";
import { createContext, useState } from "react";
import { API } from "../config/api";
const GlobalContext = createContext(null);
const { Provider } = GlobalContext;

const GlobalProvider = ({ children }) => {
  const [Authors, setAuthors] = useState([]);
  const [Articles, setArticles] = useState([]);
  const [Status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    text: "",
  });

  //Get all authors
  if (Authors.length == 0) {
    axios
      .get(`${API}/authors?populate=*`)
      .then((response) => {
        setAuthors(response.data.data);
      })
      .catch((err) => {
        setStatus((prev) => {
          return { ...prev, error: true };
        });
      });
  }

  //Find a user by ID
  const findUserByID = (id) => {
    const author = Authors.filter(
      (user) => parseInt(user.attributes.author.data.id) === parseInt(id)
    );
    return author[0];
  };

  return (
    <Provider
      value={{
        Authors,
        Status,
        Articles,
        setArticles,
        setStatus,
        setAuthors,
        findUserByID,
      }}
    >
      {children}
    </Provider>
  );
};

export { GlobalProvider, GlobalContext };
