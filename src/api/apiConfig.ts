import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import io from 'socket.io-client';
import {Alert} from 'react-native';
import {getToken} from '../storages/tokenStorage';

const API_URL =
  Config.API_URL ||
  (() => {
    throw new Error('API_URL is missing in environment variables.');
  })();

console.log('API_URL:', API_URL);

// Create Axios instance
const apiInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Optional: Set a request timeout (10 seconds in this case)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
apiInstance.interceptors.request.use(
  async config => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add response interceptor for error handling
apiInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Alert.alert('Session expired', 'Please login again.');
          // TODO: Navigate the user to the login page if you have navigation set up
          break;
        case 404:
          Alert.alert('Error', 'Resource not found.');
          break;
        case 500:
          Alert.alert('Error', 'Server error. Please try again later.');
          break;
        default:
          Alert.alert('Error', 'An unexpected error occurred.');
          break;
      }
    } else if (error.request) {
      Alert.alert('Request Error', 'The request was made, but no response was received.');
    } else {
      Alert.alert('Network Error', 'Please check your internet connection.');
    }
    return Promise.reject(error);
  },
);

const socket = io(API_URL);

export {apiInstance, socket};