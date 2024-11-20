import axios from 'axios';

const setupAxiosInterceptor = (addLog) => {
  // Request Interceptor
  axios.interceptors.request.use(
    (config) => {
      const log = `[REQUEST] ${config.method.toUpperCase()} ${config.url}\nHeaders: ${JSON.stringify(
        config.headers,
        null,
        2
      )}\nData: ${JSON.stringify(config.data, null, 2)}`;
      addLog(log);
      return config;
    },
    (error) => {
      const log = `[REQUEST ERROR] ${error.message}`;
      addLog(log);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axios.interceptors.response.use(
    (response) => {
      const log = `[RESPONSE] ${response.status} ${response.config.url}\nData: ${JSON.stringify(
        response.data,
        null,
        2
      )}`;
      addLog(log);
      return response;
    },
    (error) => {
      const log = `[RESPONSE ERROR] ${error.message}`;
      addLog(log);
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptor;
