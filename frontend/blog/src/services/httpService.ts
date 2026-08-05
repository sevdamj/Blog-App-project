import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
})

if (typeof window !== 'undefined') {
  http.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalConfig = err.config;
      
      if (err.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        
        try {
          await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh-token`,
            { withCredentials: true }
          );
          return http(originalConfig);
        } catch (refreshError) {
          if (typeof window !== 'undefined') {
            window.location.href = '/signin';
          }
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(err);
    }
  );
}

<<<<<<< Updated upstream
export default http;
=======
export default http;
>>>>>>> Stashed changes
