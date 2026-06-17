import axios from "axios";

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

// فقط در Client Side اجرا بشه
if (typeof window !== 'undefined') {
  app.interceptors.response.use(
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
          return app(originalConfig);
        } catch (refreshError) {
          // می‌توانید به صفحه لاگین هدایت کنید
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

const http = {
  get: app.get,
  post: app.post,
  put: app.put,
  patch: app.patch,
  delete: app.delete,
};

export default http;