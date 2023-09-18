# JSSnippets
Grab yourself a snippet or a block. Thought this file would help JS devs make their react native apps more modular for api calls by getToken and storeToken. Helps with authentication. 

###
YourAppName-Whatever-that-is

Introduction

This module provides a pre-configured Axios instance for API interactions and establishes a Socket.io connection to the specified API_URL. It also integrates with a token storage mechanism to handle authentication tokens for API requests.

Setup

Ensure you have the required dependencies installed by checking package.json.
Set up the environment variable API_URL using react-native-config.
Usage

Axios Instance (apiInstance)
The apiInstance is an Axios instance pre-configured to:

Set the baseURL to API_URL.
Set the request timeout to 10 seconds.
Automatically append the token from tokenStorage (if available) to the request headers.
Handle common HTTP response errors and display appropriate alerts.
Use apiInstance as you would use the regular Axios for making HTTP requests:

javascript
Copy code
apiInstance.get('/endpoint').then(response => {
  console.log(response.data);
});
Socket.io (socket)
The socket is a Socket.io client instance connected to the API_URL.

Use the socket to listen or emit events:

javascript
Copy code
socket.on('message', data => {
  console.log(data);
});

socket.emit('send-message', { content: 'Hello, World!' });
Error Handling

The Axios instance (apiInstance) has built-in error handling:

Alerts the user if the session has expired (401).
Notifies the user if a resource is not found (404).
Alerts the user in case of a server error (500).
Handles other unexpected errors.
Development Tips

Always ensure API_URL is correctly set in your environment variables.
Extend the Axios instance or Socket.io client as needed to fit the requirements of your project.
Conclusion

This module simplifies the process of setting up API requests and real-time communications for React Native projects. Ensure you understand the underlying libraries (Axios and Socket.io) to get the most out of this setup.
