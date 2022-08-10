import AsyncStorage from '@react-native-async-storage/async-storage';
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
  logOut: Function;
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
  logOut: () => {},
} as Props);

function AuthProvider({children}: AuthProviderProps) {
  const {handlerPost, loading} = usePost<LoginRequest, UserData>('/auth');
  const [token, setToken] = useState('');

  const loginError = () => {
    Alert.alert('Erro', 'Email ou senha incorretos');
  };

  async function logOut() {
    try {
      setToken('');
      await AsyncStorage.clear();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao sair');
    }
  }

  const getUserData = async () => {
    try {
      const userToken = await AsyncStorage.getItem('@userToken');
      if (userToken) {
        setToken(userToken);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar dados');
    }
  };

  async function onSuccess(dataAsyncStorage: UserData) {
    setToken(dataAsyncStorage.token);
    await AsyncStorage.setItem('@userToken', dataAsyncStorage.token);
  }

  async function userLogin(request: LoginRequest) {
    try {
      await handlerPost(request, loginError, onSuccess);
      setToken(token);
      token && (await AsyncStorage.setItem('@userToken', token));
    } catch (error) {}
  }

  useEffect(() => {
    setToken(token);
    getUserData();
  }, [loading, token]);

  return (
    <AuthContext.Provider value={{userLogin, token, loading, logOut}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const Context = useContext(AuthContext);

  return Context;
}

export {useAuth, AuthProvider};
