import axios from "axios";
import { BASE_URL } from "../config/apiConfig";
import { Alert } from "react-native";
import { encryptPayloadsUsingAES256, decryptAPIResponseUsingAES256 } from "../utlis/cryptoHelper";
import {store} from "../redux/store"
import { logout } from "../redux/slices/authSlices";
const apiClient = axios.create({
    baseURL: BASE_URL,

    headers: {
        'Content-Type': 'text/plain',
    },
    timeout: 10000
})



// Encrypt request payloads
apiClient.interceptors.request.use(
    (config) => {
      const { auth } = store.getState(); // ✅ access persisted redux state
      const currentUser = auth?.user;
  
      // Exclude login API from setting these headers
      const isLoginRequest = config.url?.includes('/login'); // adjust this path based on your actual login endpoint
  
      if (!isLoginRequest && currentUser) {
        config.headers.Authorization = `Bearer ${currentUser.access_token}`;
        config.headers.DomainName = currentUser.domainName;
        config.headers.AccessCode = currentUser.accessCode;
        config.headers['Cache-Control'] = 'no-cache';
        config.headers.Pragma = 'no-cache';
      }
  
      if (config.data) {
        config.data = encryptPayloadsUsingAES256(config.data);
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Decrypt response
  apiClient.interceptors.response.use(
    (response) => {
      if (typeof response.data === "string") {
        response.data = decryptAPIResponseUsingAES256(response.data);
      }
      return response;
    },
    (error) => {
      const { response, request, message } = error;
  
      if (response) {
        const { status, data } = response;
        switch (status) {
          case 400:
          case 401:
          case 403:
            Alert.alert("Error", data?.message || "Unauthorized Access", [
              {
                text:"OK",
                onPress: () => {
                  store.dispatch(logout())
                }
              }
            ]);
            
            break;
          case 404:
            Alert.alert("Error", "Resource not found");
            break;
          case 500:
            Alert.alert("Server Error", "Something went wrong on the server", [
              {
                text:"OK",
                onPress: () => {
                  store.dispatch(logout())
                }
              }
            ]);
            break;
          default:
            Alert.alert("Error", data?.message || "Unexpected error occurred");
        }
        return Promise.reject(data?.message || "Request failed");
      } else if (request) {
        Alert.alert("Network Error", "No response from server. Please try again.");
        return Promise.reject("No response from server");
      } else {
        Alert.alert("Error", message || "Unknown error");
        return Promise.reject(message);
      }
    }
  );
  
  export default apiClient;