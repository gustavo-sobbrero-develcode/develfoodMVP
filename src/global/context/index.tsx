/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
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
  const {data, handlerPost, loading} = usePost<LoginRequest, UserData>('/auth');
  const [token, setToken] = useState('');

  const loginError = () => {
    Alert.alert('Erro', 'Email ou senha incorretos');
  };

  async function logOut() {
    try {
      setToken('');
      await AsyncStorage.clear();
    } catch (error) {}
  }

  const getUserData = async (data: string) => {
    try {
      const userToken = await AsyncStorage.getItem('@userToken');
      if (userToken) {
        setToken(userToken);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar dados');
    }
  };

  async function onSuccess(data: UserData) {
    setToken(data.token);
    await AsyncStorage.setItem('@userToken', data.token);
  }

  async function userLogin(request: LoginRequest) {
    try {
      await handlerPost(request, loginError, onSuccess);
      setToken(data.token);
      data.token && (await AsyncStorage.setItem('@userToken', token));
    } catch (error) {}
  }

  useEffect(() => {
    setToken(data.token);
    getUserData(data.token);
  }, [loading, data.token]);

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
