import React, { createContext, useContext, useState } from "react";

const FavoritasContext = createContext();

export const useFavoritas = () => useContext(FavoritasContext);

export const FavoritasProvider = ({ children }) => {
  const [favoritas, setFavoritas] = useState([]);

  const toggleFavorita = (mascota) => {
    setFavoritas((prev) => {
      const existe = prev.some((fav) => fav.id === mascota.id);
      return existe ? prev.filter((fav) => fav.id !== mascota.id) : [...prev, mascota];
    });
  };

  return (
    <FavoritasContext.Provider value={{ favoritas, toggleFavorita }}>
      {children}
    </FavoritasContext.Provider>
  );
};
