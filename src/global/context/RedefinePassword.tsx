import React, {createContext, useState} from 'react';
import {useContext} from 'react';

interface RedefinePasswordProviderProps {
  children: React.ReactNode;
}
interface Props {
  token: string;
  setToken: (token: string) => void;
  email: string;
  setEmail: (email: string) => void;
}

const createUser = createContext({
  loading: false,
  email: '',
  token: '',
  setToken: () => {},
  setEmail: () => {},
} as Props);

function RedefinePasswordProvider({children}: RedefinePasswordProviderProps) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  return (
    <createUser.Provider value={{email, setEmail, setToken, token}}>
      {children}
    </createUser.Provider>
  );
}

function useRedefinePassword() {
  const Context = useContext(createUser);

  return Context;
}

export {useRedefinePassword, RedefinePasswordProvider};
