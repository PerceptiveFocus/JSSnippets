import * as Keychain from 'react-native-keychain';

export const storeToken = async (token: string) => {
  try {
    await Keychain.setGenericPassword('token', token);
  } catch (error) {
    console.error('Error storing token:', error);
    throw new Error('Failed to save authentication data.');
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving token:', error);
    throw new Error('Failed to retrieve authentication data.');
  }
};

export const removeToken = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.error('Error removing token:', error);
    throw new Error('Failed to remove authentication data.');
  }
};
