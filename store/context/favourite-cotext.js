import { createContext, useState } from "react";

export const FavouriteContext = createContext({
  ids: [],
  addFavourite: (id) => {},
  removeFavourite: (id) => {},
});

function FavouriteContextProvider({ children }) {
  const [favouriteCategoryIds, setFaouriteCategoryIds] = useState();

  function addFavourite(id) {
    setFaouriteCategoryIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavourite(id) {
    setFaouriteCategoryIds((currentFavIds) =>
      currentFavIds.filter((catId) => catId !== id)
    );
  }

  const value = {
    ids: favouriteCategoryIds,
    addFavourite,
    removeFavourite,
  };

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
}

export default FavouriteContextProvider;
