/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useContext, useState} from 'react';
import {useEffect} from 'react';
import {State} from 'react-native-gesture-handler';
import {useAuth} from '.';
import api from '../services/api';
import {useDelete} from '../services/delete';
import {usePut} from '../services/put';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface Props {
  favoritePlate: Function;
  deletePlate: Function;
  idPlate: number | undefined;
}

interface Favorites {
  id: number;
  favorite: boolean;
}

const FavoritesContext = createContext({} as Props);

function FavoritesProvider({children}: AuthProviderProps) {
  const {token} = useAuth();

  const [idPlate, setIdPlate] = useState<number>();

  console.log('IDpLATE', idPlate);

  function favoritePlate({id, favorite}: Favorites) {
    api.put<any>(`/plate/favorite/${id}`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function deletePlate({id, favorite}: Favorites) {
    api.delete<any>(`/plate/favorite/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('idDelete', id);
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

  return (
    <FavoritesContext.Provider
      value={{
        favoritePlate,
        deletePlate,
        idPlate,
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
