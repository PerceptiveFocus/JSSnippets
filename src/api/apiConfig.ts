// Import necessary libraries and modules
import axios, { AxiosError } from 'axios';   // Axios for making HTTP requests and handling errors
import Config from 'react-native-config';    // To access environment variables
import io from 'socket.io-client';           // For Socket.io client operations
import { Alert } from 'react-native';        // For showing alerts in a React Native app
import { getToken } from '../storages/tokenStorage';  // Utility to get a token from storage

// Define the base API_URL. If it's not available in the environment variables, throw an error.
const API_URL = 
  Config.API_URL ||
  (() => {
    throw new Error('API_URL is missing in environment variables.');
  })();

// Log the API_URL to the console
console.log('API_URL:', API_URL);

// Create a new Axios instance for making HTTP requests.
// Set the baseURL, request timeout, and default headers.
const apiInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Optional: Set a request timeout (10 seconds in this case)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to the Axios instance. This will run before every request.
apiInstance.interceptors.request.use(
  async config => {
    // Get the token from storage
    const token = await getToken();
    // If the token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Return the modified config
    return config;
  },
  // If there's an error in the request interceptor, reject the promise with the error
  error => {
    return Promise.reject(error);
  },
);

// Add a response interceptor for error handling to the Axios instance. 
// This will run after every response, successful or not.
apiInstance.interceptors.response.use(
  // If the response is successful, simply return it
  response => response,
  // If there's an error, handle it accordingly
  (error: AxiosError) => {
    // If the error has a response attached (e.g., a 404 or 500 status code from the server)
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
    } 
    // If the request was made but no response was received (e.g., the server did not respond)
    else if (error.request) {
      Alert.alert('Request Error', 'The request was made, but no response was received.');
    } 
    // For all other errors (e.g., network issues)
    else {
      Alert.alert('Network Error', 'Please check your internet connection.');
    }
    // Reject the promise with the error
    return Promise.reject(error);
  },
);

// Create a Socket.io connection to the API_URL
const socket = io(API_URL);

// Export the Axios instance and the Socket.io connection for use in other parts of the application
export { apiInstance, socket };
