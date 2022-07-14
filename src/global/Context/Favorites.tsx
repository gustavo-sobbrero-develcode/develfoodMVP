/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useContext, useState} from 'react';
import {useEffect} from 'react';
import {useAuth} from '.';
import {useDelete} from '../services/delete';
import {usePut} from '../services/put';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface Props {
  favoritePlate: Function;
}

interface Favorites {
  id: number;
  favorite: boolean;
}

const FavoritesContext = createContext({} as Props);

function FavoritesProvider({children}: AuthProviderProps) {
  const {token} = useAuth();

  const [idPlate, setIdPlate] = useState<number>();

  function favoritePlate({id, favorite}: Favorites) {
    setIdPlate(id);

    if (favorite) {
      handlerDelete();
      console.log('deletado');
    } else {
      handlerPut();
      console.log('adicionado');
    }
  }

  const {
    data: dataDelete,
    handlerDelete,
    error: errorDelete,
  } = useDelete<any>(`/plate/favorite/${idPlate}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {
    data: dataPut,
    handlerPut,
    error,
  } = usePut<any>(`/plate/favorite/${idPlate}`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {}, [idPlate]);

  return (
    <FavoritesContext.Provider
      value={{
        favoritePlate,
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
