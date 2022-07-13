/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useContext, useState} from 'react';
import {useEffect} from 'react';
import {useAuth} from '.';
import {usePut} from '../services/put';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface Props {
  favoritePlate: Function;
}

const FavoritesContext = createContext({} as Props);

function FavoritesProvider({children}: AuthProviderProps) {
  const {token} = useAuth();

  const [idPlate, setIdPlate] = useState<number>();

  function favoritePlate(id: number) {
    setIdPlate(id);
  }

  const {
    data: dataPut,
    handlerPut,
    error,
  } = usePut<any>(`/plate/favorite/${idPlate}`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dataPut && console.log('data', dataPut);
  error && console.log('erro', error);

  useEffect(() => {
    handlerPut();
  }, [idPlate]);

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
