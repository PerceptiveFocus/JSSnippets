// In simple terms, this code provides three functions:

// 1. storeToken: Securely stores a token.
// 2. getToken: Retrieves the stored token.
// 3. removeToken: Removes the stored token.
// NOTE: These functions interact with react-native-keychain, which is a way to securely store and retrieve small pieces of data on mobile devices.

//BEGIN HERE 

// Import the necessary library for handling secure storage.
// 'react-native-keychain' provides a way to securely store small pieces of data (like passwords or tokens).
import * as Keychain from 'react-native-keychain';

// A function to securely store a token.
// This function takes a token (a string) as its argument.
export const storeToken = async (token: string) => {
  try {
    // This line attempts to securely save the token. 
    // The 'setGenericPassword' function is a way to store data securely.
    // Here, 'token' is used as a label (kind of like a name) and the actual token is the data being stored.
    await Keychain.setGenericPassword('token', token);
  } catch (error) {
    // If something goes wrong while saving, we'll print the error to the console.
    console.error('Error storing token:', error);
    // And then we'll throw a new error to let the caller know something went wrong.
    throw new Error('Failed to save authentication data.');
  }
};

// A function to get the stored token.
// This function doesn't take any arguments.
export const getToken = async (): Promise<string | null> => {
  try {
    // Attempt to retrieve the stored data with the label 'token'.
    const credentials = await Keychain.getGenericPassword();
    // If we successfully get the stored data (credentials), we return the token.
    // Remember, we stored the token as 'password' in the 'storeToken' function.
    if (credentials) {
      return credentials.password;
    }
    // If we don't find any stored data, we return null.
    return null;
  } catch (error) {
    // If something goes wrong while retrieving the token, we'll print the error to the console.
    console.error('Error retrieving token:', error);
    // And then we'll throw a new error to let the caller know something went wrong.
    throw new Error('Failed to retrieve authentication data.');
  }
};

// A function to remove the stored token.
// This function doesn't take any arguments.
export const removeToken = async () => {
  try {
    // This line attempts to remove the stored data with the label 'token'.
    await Keychain.resetGenericPassword();
  } catch (error) {
    // If something goes wrong while removing the token, we'll print the error to the console.
    console.error('Error removing token:', error);
    // And then we'll throw a new error to let the caller know something went wrong.
    throw new Error('Failed to remove authentication data.');
  }
};
