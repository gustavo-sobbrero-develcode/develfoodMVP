import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
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
  const navigation = useNavigation();

  const loginError = () => {
    Alert.alert('Erro', 'Email ou senha incorretos');
  };

  async function logOut() {
    try {
      setToken('');
      setToken(null);
      setToken(undefined);
      token === undefined ||
        token === null ||
        (token === '' && navigation.navigate('Login' as never));
      await AsyncStorage.removeItem('@userToken');
    } catch (error) {}
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
      setToken(data.token);
      data.token && (await AsyncStorage.setItem('@userToken', token));
    } catch (error) {}
  }

  useEffect(() => {
    setToken(data.token);
    getUserData();
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
