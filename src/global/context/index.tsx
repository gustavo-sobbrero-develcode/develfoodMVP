import React, {createContext, useState} from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
import {Alert} from 'react-native';
import {usePost} from '../services/post';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface Props {
  userLogin: Function;
  token: string;
  loading: boolean;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface UserData {
  token: string;
  type: string;
}

const AuthContext = createContext({
  loading: false,
  userLogin: () => {},
  token: '',
} as Props);

function AuthProvider({children}: AuthProviderProps) {
  const {data, handlerPost, loading} = usePost<LoginRequest, UserData>('/auth');
  const [token, setToken] = useState('');

  const loginError = () => {
    Alert.alert('Erro', 'Email ou senha incorretos');
  };

  async function userLogin(request: LoginRequest) {
    await handlerPost(request, loginError);
    setToken(data.token);
  }

  useEffect(() => {
    setToken(data.token);
  }, [data.token, loading]);

  return (
    <AuthContext.Provider value={{userLogin, token, loading}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const Context = useContext(AuthContext);

  return Context;
}

export {useAuth, AuthProvider};
