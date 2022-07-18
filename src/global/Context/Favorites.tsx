/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useContext, useState} from 'react';
import {useEffect} from 'react';
import {State} from 'react-native-gesture-handler';
import {useAuth} from '.';
import {FavoritesResponse} from '../../screens/Favorites';
import {Plate} from '../../screens/RestaurantProfile';
import {useDelete} from '../services/delete';
import {useFetch} from '../services/get';
import {usePut} from '../services/put';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface Props {
  favoritePlate: Function;
  idPlate: number | undefined;
  favoritesState: number;
  favoritePlates: Plate[];
}

const FavoritesContext = createContext({} as Props);

function FavoritesProvider({children}: AuthProviderProps) {
  const {token} = useAuth();

  const [idPlate, setIdPlate] = useState<number>();

  function favoritePlate(id: number) {
    setIdPlate(id);
    setFavoritesState(favoritesState + 1);
    console.log('favoritesState no contexto', favoritesState);
  }

  const [favoritePlates, setFavoritePlates] = useState<Plate[]>([]);

  function onSuccess(dataFavorites: FavoritesResponse) {
    setFavoritePlates([]), setFavoritePlates(dataFavorites.content);
  }

  const {
    data: dataFavorites,
    fetchData: fetchFavorites,
    loading: loadingFavorite,
  } = useFetch<FavoritesResponse>(
    `/plate/favoritePlates/search?page=0&quantity=100`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const [favoritesState, setFavoritesState] = useState<number>(0);

  useEffect(() => {
    const itemFavorite = favoritePlates?.find(
      (item: Plate) => item?.id === idPlate,
    );

    itemFavorite && handlerDelete();
  }, [favoritePlates]);

  useEffect(() => {
    idPlate && fetchFavorites(onSuccess);
  }, [idPlate]);

  const {
    data: dataDelete,
    handlerDelete,
    error: errorDelete,
  } = useDelete<any>(`/plate/favorite/${idPlate}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // const {
  //   data: dataPut,
  //   handlerPut,
  //   error,
  // } = usePut<any>(`/plate/favorite/${idPlate}`, undefined, {
  //   headers: {favoritePlate
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  return (
    <FavoritesContext.Provider
      value={{
        favoritePlate,
        idPlate,
        favoritesState,
        favoritePlates,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
}

function useFavorites() {
  const Context = useContext(FavoritesContext);

  return Context;
}

export {useFavorites, FavoritesProvider};
