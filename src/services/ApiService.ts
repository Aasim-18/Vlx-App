import axois, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import { useAuth } from "@clerk/expo";


const { getToken } = useAuth();


const ApiClient: AxiosInstance = axois.create({

   baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


ApiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        const token = await getToken();
        try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Failed to get Clerk token:', error);
    }
    return config;
  },
  (error: any) => Promise.reject(error)
    
)


export default ApiClient;